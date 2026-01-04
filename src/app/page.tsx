import { WalletOverview } from "@/widgets/wallet-overview";
import { SendTransactionForm } from "@/features/send-transaction";
import { SwapWidget } from "@/features/token-swap";

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
