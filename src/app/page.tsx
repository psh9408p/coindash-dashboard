import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { WalletOverview } from "@/widgets/wallet-overview";
import { SendTransactionForm } from "@/features/send-transaction";
export default function Home() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight">
                Dashboard Overview
            </h1>
            <WalletOverview />
            {/* 3 Grid Example */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    {/* 나중에 차트 들어갈 자리 */}
                    <div className="h-[300px] rounded-xl border bg-card text-card-foreground shadow flex items-center justify-center text-muted-foreground">
                        Chart Placeholder
                    </div>
                </div>
                <div className="col-span-3">
                    <SendTransactionForm />
                </div>
            </div>
        </div>
    );
}
