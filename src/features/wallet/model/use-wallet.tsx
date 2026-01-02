import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState, useEffect } from "react";

export function useWallet() {
    // 1. Wagmi Hooks
    const { address, isConnected, chain } = useAccount();
    const { connect, connectors, isPending } = useConnect();
    const { disconnect } = useDisconnect();

    // 2. Hydration Mismatch 방지 (중요!)
    // 서버에서는 지갑 상태를 모르므로, 클라이언트 마운트 후 렌더링하도록 함
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // 3. 지갑 주소 포맷팅 (0x1234...abcd)
    const formattedAddress = address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : "";

    return {
        address,
        formattedAddress,
        isConnected: isMounted && isConnected, // 마운트 전엔 false 취급
        isMounted,
        chain,
        connect,
        connectors,
        isPending,
        disconnect,
    };
}
