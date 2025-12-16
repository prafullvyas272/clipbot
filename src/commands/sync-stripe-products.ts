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
    await processStripePrices(productsData);
  } catch (error) {
    console.error("DB sync error:", error);
  }
};

const processStripePrices = async (productsData: StripeProductWithPrice[]) => {
  try {
    for (let index = 0; index < productsData.length; index++) {
      const productId = productsData[index].id;

      // fetch prices by productId from stripe
      const prices = await stripe.prices.list({limit: 10})

      for (const price of prices.data) {
        const priceExist = await prisma.stripePrice.findFirst({
          where: {
            priceId: price.id
          }
        })

        const payload = {
          priceId: price.id,
          productId: productId,
          amount: typeof price.unit_amount === 'number' ? price.unit_amount : 0.00,
          currency: price.currency,
          recurring: price.recurring ? (price.recurring as unknown as Prisma.InputJsonValue) : null,
          type: price.type === 'recurring' ? 'RECURRING' : 'ONE_OFF',
          billingPeriod: price?.recurring?.interval ?? null,
          active: price.active,
        };

        if (priceExist) {
          // code to update price
          await prisma.stripePrice.update({
            where: {
              id: priceExist.id,
            },
            data: payload,
          });
        } else {
          // code to create price
          await prisma.stripePrice.create({
            data: payload
          });
        }       
      }
      return;
    }

  } catch (error) {
    console.error(error)
  }
}

const syncStripeProductsToDB = async (): Promise<void> => {
  console.log("Stripe Products Syncing Started ..............");

  const productsData = await fetchStripeProducts();
  await storeStripeProductsInDB(productsData);

  console.log("Stripe Products Syncing Finished.");
};

syncStripeProductsToDB();
