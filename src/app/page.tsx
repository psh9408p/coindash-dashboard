"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/shared/ui/skeleton";

// Code Splitting: Lazy load heavy components
const WalletOverview = dynamic(
    () =>
        import("@/widgets/wallet-overview").then((mod) => ({
            default: mod.WalletOverview,
        })),
    {
        ssr: false,
        loading: () => <Skeleton className="h-[180px] w-full rounded-xl" />,
    }
);

const SwapWidget = dynamic(
    () =>
        import("@/features/token-swap").then((mod) => ({
            default: mod.SwapWidget,
        })),
    {
        ssr: false,
        loading: () => (
            <Skeleton className="h-[400px] w-full max-w-[480px] rounded-xl" />
        ),
    }
);

const SendTransactionForm = dynamic(
    () =>
        import("@/features/send-transaction").then((mod) => ({
            default: mod.SendTransactionForm,
        })),
    {
        loading: () => <Skeleton className="h-[400px] w-full rounded-xl" />,
    }
);

export default function Home() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">
                Dashboard Overview
            </h1>

            {/* Wallet Balance Cards */}
            <WalletOverview />

            {/* Main Actions Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Token Swap Widget */}
                <SwapWidget />

                {/* Send Transaction Form */}
                <SendTransactionForm />
            </div>
        </div>
    );
}
