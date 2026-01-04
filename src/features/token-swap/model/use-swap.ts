"use client";
import { useState, useEffect } from "react";

const ETH_PRICE = 2500; // 1 ETH = 2500 USDC

export function useSwap() {
    const [fromAmount, setFromAmount] = useState<string>("");
    const [toAmount, setToAmount] = useState<string>("");
    const [isSwapping, setIsSwapping] = useState(false);

    // fromAmount가 바뀔 때마다 toAmount 자동 계산
    useEffect(() => {
        if (!fromAmount || isNaN(Number(fromAmount))) {
            setToAmount("");
            return;
        }
        const calculated = Number(fromAmount) * ETH_PRICE;
        setToAmount(calculated.toString());
    }, [fromAmount]);

    const handleSwap = async () => {
        if (!fromAmount || Number(fromAmount) <= 0) return;

        setIsSwapping(true);

        // 1초 지연 후 Mock 완료 처리
        await new Promise((resolve) => setTimeout(resolve, 1000));

        alert(`Successfully swapped ${fromAmount} ETH to ${toAmount} USDC!`);

        // 초기화
        setFromAmount("");
        setToAmount("");
        setIsSwapping(false);
    };

    return {
        fromAmount,
        setFromAmount,
        toAmount,
        isSwapping,
        handleSwap,
        rate: ETH_PRICE,
    };
}
