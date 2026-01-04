import { WalletOverview } from "@/widgets/wallet-overview";
import { SendTransactionForm } from "@/features/send-transaction";
import { SwapWidget } from "@/features/token-swap";

export default function Home() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight">
                Dashboard Overview
            </h1>

            <WalletOverview />

            {/* Main Content Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Token Swap Widget */}
                <div className="col-span-4 flex justify-center items-start">
                    <SwapWidget />
                </div>

                {/* Send Transaction Form */}
                <div className="col-span-3">
                    <SendTransactionForm />
                </div>
            </div>
        </div>
    );
}
