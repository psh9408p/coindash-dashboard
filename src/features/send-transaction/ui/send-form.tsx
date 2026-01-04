"use client";

import { Loader2, Send } from "lucide-react";
import { useSendTx } from "../model/use-send-tx";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";

export function SendTransactionForm() {
    const {
        to,
        setTo,
        amount,
        setAmount,
        handleSend,
        isSending,
        isConfirming,
        isConfirmed,
        hash,
    } = useSendTx();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Send ETH</CardTitle>
                <CardDescription>
                    Transfer funds securely to another address.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* 받는 주소 입력 */}
                <div className="space-y-2">
                    <Label htmlFor="to">Recipient Address</Label>
                    <Input
                        id="to"
                        placeholder="0x..."
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        disabled={isSending || isConfirming}
                    />
                </div>

                {/* 수량 입력 */}
                <div className="space-y-2">
                    <Label htmlFor="amount">Amount (ETH)</Label>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="0.01"
                        step="0.0001"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        disabled={isSending || isConfirming}
                    />
                </div>

                {/* 상태 메시지 및 성공 피드백 */}
                {hash && (
                    <div className="p-3 bg-slate-100 rounded-md text-xs break-all text-muted-foreground">
                        <span className="font-bold">Tx Hash:</span> {hash}
                    </div>
                )}

                {isConfirmed && (
                    <div className="text-green-600 text-sm font-medium text-center">
                        🎉 Transaction Confirmed!
                    </div>
                )}

                {/* 전송 버튼 */}
                <Button
                    className="w-full"
                    onClick={handleSend}
                    disabled={!to || !amount || isSending || isConfirming}
                >
                    {isSending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                            Check Wallet...
                        </>
                    ) : isConfirming ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                            Confirming...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" /> Send Transaction
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}
