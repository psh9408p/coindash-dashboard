"use client";

import { ArrowDown, Settings2 } from "lucide-react";
import { useSwap } from "../model/use-swap";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";

export function SwapWidget() {
    const { fromAmount, setFromAmount, toAmount, isSwapping, handleSwap, rate } =
        useSwap();

    return (
        <Card className="w-full max-w-[400px] mx-auto shadow-xl border-none bg-white dark:bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-xl font-bold">Swap</CardTitle>
                <Button variant="ghost" size="icon-sm">
                    <Settings2 className="h-5 w-5 text-muted-foreground" />
                </Button>
            </CardHeader>
            <CardContent className="space-y-1">
                {/* From Section */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
                    <Label className="text-xs text-muted-foreground ml-1">Sell</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            placeholder="0"
                            value={fromAmount}
                            onChange={(e) => setFromAmount(e.target.value)}
                            className="border-none bg-transparent text-2xl font-semibold focus-visible:ring-0 p-0 h-auto"
                            disabled={isSwapping}
                        />
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-700 shadow-sm border font-bold">
                            <span className="text-sm">ETH</span>
                        </div>
                    </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex justify-center -my-3 relative z-10">
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border shadow-sm">
                        <ArrowDown className="h-4 w-4 text-primary" />
                    </div>
                </div>

                {/* To Section */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
                    <Label className="text-xs text-muted-foreground ml-1">Buy</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            type="text"
                            placeholder="0"
                            value={toAmount}
                            readOnly
                            className="border-none bg-transparent text-2xl font-semibold focus-visible:ring-0 p-0 h-auto"
                        />
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-700 shadow-sm border font-bold">
                            <span className="text-sm">USDC</span>
                        </div>
                    </div>
                </div>

                {/* Exchange Rate info */}
                {fromAmount && (
                    <div className="px-2 py-3">
                        <p className="text-xs text-muted-foreground text-right">
                            1 ETH = {rate.toLocaleString()} USDC
                        </p>
                    </div>
                )}

                {/* Action Button */}
                <Button
                    onClick={handleSwap}
                    disabled={isSwapping || !fromAmount}
                    className="w-full h-14 rounded-2xl text-lg font-bold transition-all"
                    size="lg"
                >
                    {isSwapping ? "Swapping..." : "Swap"}
                </Button>
            </CardContent>
        </Card>
    );
}
