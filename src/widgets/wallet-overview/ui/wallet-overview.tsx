"use client";

import { useAccount, useBalance } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton"; // 로딩 UI용 (없으면 npx shadcn@latest add skeleton)
import { Wallet, CreditCard } from "lucide-react";
import { formatBalance } from "@/shared/lib/format";

export function WalletOverview() {
    const { address, isConnected } = useAccount();

    // 1. 잔고 조회 Hook
    const { data, isLoading, isError } = useBalance({
        address: address,
    });

    // 2. 연결되지 않았을 때의 화면
    if (!isConnected) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Wallet Status
                    </CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-muted-foreground">
                        Not Connected
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Please connect your wallet first
                    </p>
                </CardContent>
            </Card>
        );
    }

    // 3. 로딩 중일 때 (Skeleton UI)
    if (isLoading) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Balance
                    </CardTitle>
                    <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-32 mb-2" />
                    <Skeleton className="h-3 w-20" />
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Native Token (ETH) Balance */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Native Balance
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {/* data?.formatted: 18자리 숫자를 알아서 "1.234" 형태로 바꿔줌 */}
                    <div className="text-2xl font-bold">
                        {formatBalance(data?.value.toString())} {data?.symbol}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
