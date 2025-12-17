"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAvailablePlans } from "../services/SubscriptionService";
import {
  Building2,
  Check,
  Crown,
  Sparkles,
  Zap,
  Loader2,
} from "lucide-react";
import { Plan } from "@/types/types";

/* -------------------- helpers -------------------- */

const getPlanIcon = (planName: string, index: number) => {
  const name = planName?.toLowerCase() || "";
  if (name.includes("starter") || name.includes("basic")) return Sparkles;
  if (name.includes("professional") || name.includes("pro")) return Zap;
  if (name.includes("business")) return Crown;
  if (name.includes("enterprise")) return Building2;

  const icons = [Sparkles, Zap, Crown, Building2];
  return icons[index % icons.length];
};

const getPlanGradient = (planName: string, index: number) => {
  const name = planName?.toLowerCase() || "";
  if (name.includes("starter") || name.includes("basic"))
    return "from-blue-500 to-cyan-500";
  if (name.includes("professional") || name.includes("pro"))
    return "from-purple-500 to-pink-500";
  if (name.includes("business")) return "from-orange-500 to-red-500";
  if (name.includes("enterprise"))
    return "from-emerald-500 to-teal-500";

  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-emerald-500 to-teal-500",
  ];
  return gradients[index % gradients.length];
};

const getPriceByInterval = (plan: Plan, interval: "month" | "year") => {
  return plan.prices?.find(
    (p) => p.active && p.billingPeriod === interval
  );
};

/* -------------------- Plan Card -------------------- */

const PlanCard = ({
  plan,
  price,
  index,
  selectedPlan,
  setSelectedPlan,
}: any) => {
  const Icon = getPlanIcon(plan.name, index);
  const gradient = getPlanGradient(plan.name, index);

  return (
    <div className="relative group">
      <div
        className={`relative h-full rounded-2xl border-2  ${
          price ? 'hover:shadow-2xl transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800' : 'bg-gray-100'
        }`}
      >
        <div className={`h-2 bg-gradient-to-r ${gradient}`} />

        <div className="p-6 sm:p-8">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-4`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>

          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            {plan.description}
          </p>

          <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold">
                  {price ? '₹' + price.amount / 100 : '0'} 
                </span>
                <span className="text-slate-600 dark:text-slate-400">
                  {price ? '/' + price.billingPeriod : ''}
                </span>
              </div>
          </div>

          <button
            onClick={price ? () => setSelectedPlan(plan.id) : undefined}
            disabled={!price}
            className={`w-full py-3 rounded-xl font-semibold ${
              price
                ? "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            Purchase Plan
          </button>

          {plan.features?.length > 0 && (
            <div className="mt-6 space-y-3">
              {plan.features.map((f: string, i: number) => (
                <div key={i} className="flex gap-3">
                  <Check className="w-4 h-4 text-green-500 mt-1" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* -------------------- Page -------------------- */

export default function Page() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"month" | "year">("month");

  useEffect(() => {
    (async () => {
      try {
        const data = await getAvailablePlans();
        setPlans(data.filter((p) => p.active));
      } catch {
        toast.error("Failed to load plans");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Upgrade</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
              {["month", "year"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${
                    activeTab === tab
                      ? "bg-white dark:bg-slate-900 shadow"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {tab === "month" ? "Monthly" : "Yearly"}
                </button>
              ))}
            </div>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => {
              const price = getPriceByInterval(plan, activeTab);
              return (
                <PlanCard
                  key={`${plan.id}-${activeTab}`}
                  plan={plan}
                  price={price}
                  index={i}
                  selectedPlan={selectedPlan}
                  setSelectedPlan={setSelectedPlan}
                />
              );
            })}
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
