import Link from "next/link";
import {
    LayoutDashboard,
    Wallet,
    PieChart,
    Settings,
    LogOut,
} from "lucide-react";
import { cn } from "@/shared/lib/utils"; // Shadcn 유틸
import { Button } from "@/shared/ui/button";

export function Sidebar({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "pb-12 min-h-screen border-r bg-background",
                className
            )}
        >
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        CoinDash
                    </h2>
                    <div className="space-y-1">
                        <Button
                            variant="secondary"
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href="/">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Dashboard
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href="/my-wallet">
                                <Wallet className="mr-2 h-4 w-4" />
                                My Wallet
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href="/analytics">
                                <PieChart className="mr-2 h-4 w-4" />
                                Analytics
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* 하단 설정 영역 */}
                <div className="px-3 py-2 mt-auto">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
