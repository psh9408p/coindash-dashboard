import { useState } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, isAddress } from "viem";

export function useSendTx() {
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");

    // 1. 트랜잭션 전송 Hook
    // sendTransaction: 실제 전송 함수
    // hash: 전송 후 생성된 트랜잭션 해시값 (영수증 ID)
    // isPending: 지갑에서 서명 기다리는 중
    const {
        data: hash,
        sendTransaction,
        isPending: isSending,
        error: sendError,
    } = useSendTransaction();

    // 2. 트랜잭션 확정 대기 Hook
    // 블록체인 네트워크에서 컨펌이 날 때까지 기다림
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash, // 해시가 생기면 자동으로 감지해서 대기 시작
        });

    // 3. 전송 실행 함수
    const handleSend = () => {
        if (!to || !amount) return;
        if (!isAddress(to)) {
            alert("유효하지 않은 주소입니다.");
            return;
        }

        sendTransaction({
            to: to,
            value: parseEther(amount), // "0.1" (ETH) -> 100000000000000000n (Wei)
        });
    };

    return {
        to,
        setTo,
        amount,
        setAmount,
        handleSend,
        isSending, // 지갑 팝업 떠있는 상태
        isConfirming, // 블록 채굴 기다리는 상태
        isConfirmed, // 완료 상태
        hash,
        sendError,
    };
}
