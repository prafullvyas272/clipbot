import { PrismaClient, Prisma } from "@prisma/client";
import Stripe from "stripe";
import { stripe } from "../lib/stripe.ts";

const prisma = new PrismaClient();

// Use Stripe's official type with expanded default_price
type StripeProductWithPrice = Stripe.Product & {
  default_price: Stripe.Price | null;
};

const fetchStripeProducts = async (): Promise<StripeProductWithPrice[]> => {
  try {
    const response = await stripe.products.list({
      limit: 10,
      expand: ["data.default_price"],
    });

    return response.data as StripeProductWithPrice[];
  } catch (error) {
    console.error("Stripe fetch error:", error);
    return [];
  }
};

const storeStripeProductsInDB = async (
  productsData: StripeProductWithPrice[]
): Promise<void> => {
  try {
    for (const data of productsData) {
      const stripeProduct = await prisma.stripeProduct.findFirst({
        where: {
          productId: data.id,
        },
      });

      const payload = {
        name: data.name,
        description: data.description,
        image: data.images?.[0] ?? null,
        active: data.active,
        metadata: data.metadata as Prisma.InputJsonValue,
        updatedAt: new Date(),
      };

      if (stripeProduct) {
        await prisma.stripeProduct.update({
          where: { id: stripeProduct.id },
          data: payload,
        });
      } else {
        await prisma.stripeProduct.create({
          data: {
            productId: data.id,
            ...payload,
          },
        });
      }
    }

    const stripeProducts = await prisma.stripeProduct.findMany();
    await processStripePrices(stripeProducts);
  } catch (error) {
    console.error("DB sync error:", error);
  }
};


const processStripePrices = async (stripeProducts) => {
  try {
    // Fetch ALL prices once
    const pricesResponse = await stripe.prices.list({
      limit: 100, // increase if needed
    });

    for (const product of stripeProducts) {
      const productDbId = product.id; // Mongo ObjectId
      const stripeProductId = product.productId; // prod_xxx

      // Filter prices belonging to THIS Stripe product
      const filteredPricesData = pricesResponse.data.filter(
        (pr) => pr.product === stripeProductId
      );

      for (const price of filteredPricesData) {
        const priceExist = await prisma.stripePrice.findFirst({
          where: {
            priceId: price.id,
          },
        });

        const payload = {
          priceId: price.id,
          productId: productDbId, // ✅ correct Mongo relation
          amount:
            typeof price.unit_amount === "number"
              ? price.unit_amount
              : 0.0,
          currency: price.currency.toUpperCase(),
          recurring: price.recurring
            ? (price.recurring as unknown as Prisma.InputJsonValue)
            : null,
          type: price.type === "recurring" ? "RECURRING" : "ONE_OFF",
          billingPeriod: price.recurring?.interval ?? null,
          active: price.active,
        };

        if (priceExist) {
          await prisma.stripePrice.update({
            where: {
              id: priceExist.id,
            },
            data: payload,
          });
        } else {
          await prisma.stripePrice.create({
            data: payload,
          });
        }
      }
    }

    console.log("Stripe prices synced successfully");
  } catch (error) {
    console.error("Stripe price sync failed:", error);
  }
};


const syncStripeProductsToDB = async (): Promise<void> => {
  console.log("Stripe Products Syncing Started ..............");

  const productsData = await fetchStripeProducts();
  await storeStripeProductsInDB(productsData);

  console.log("Stripe Products Syncing Finished.");
};

syncStripeProductsToDB();
