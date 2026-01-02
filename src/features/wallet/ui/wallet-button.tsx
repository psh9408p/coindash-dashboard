"use client";

import { Loader2, Wallet } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useWallet } from "../model/use-wallet";

export function WalletButton() {
    const {
        isConnected,
        formattedAddress,
        connect,
        connectors,
        disconnect,
        isPending,
        isMounted,
    } = useWallet();

    // 1. 마운트 전에는 스켈레톤이나 빈 공간 렌더링 (깜빡임 방지)
    if (!isMounted) {
        return (
            <Button variant="outline" className="w-[140px] opacity-50">
                Loading...
            </Button>
        );
    }

    // 2. 연결된 상태 (Connected)
    if (isConnected) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="font-mono">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                        {formattedAddress}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() =>
                            navigator.clipboard.writeText(formattedAddress)
                        }
                    >
                        Copy Address
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => disconnect()}
                        className="text-red-600 focus:text-red-600"
                    >
                        Disconnect
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    // 3. 연결 안 된 상태 (Disconnected)
    return (
        <Button
            onClick={() => connect({ connector: connectors[0] })} // 첫 번째 커넥터(보통 Injected/Metamask) 사용
            disabled={isPending}
        >
            {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Wallet className="mr-2 h-4 w-4" />
            )}
            Connect Wallet
        </Button>
    );
}
