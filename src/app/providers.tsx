"use client"; // 클라이언트 컴포넌트 필수!

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";

import { config } from "@/shared/config/wagmi"; // 아까 만든 설정
import { useAutoDisconnect } from "@/features/wallet";

function WalletInactivityHandler({ children }: { children: ReactNode }) {
    useAutoDisconnect();
    return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
    // 1. React Query 클라이언트 생성 (컴포넌트 생명주기 내에서 유지)
    const [queryClient] = useState(() => new QueryClient());

    return (
        // 2. Wagmi -> QueryClient 순서로 감싸줍니다.
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <WalletInactivityHandler>
                    {children}
                </WalletInactivityHandler>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
