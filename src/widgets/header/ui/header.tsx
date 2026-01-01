import { Menu } from "lucide-react";
import { Button } from "@/shared/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet"; // Mobile Menu
// import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Sidebar } from "@/widgets/sidebar/ui/sidebar"; // 재사용

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4 md:px-6">
                {/* Mobile Trigger (데스크탑에선 숨김: md:hidden) */}
                {/* <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden mr-2"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0">
                        <Sidebar className="border-none" />
                    </SheetContent>
                </Sheet> */}

                {/* Logo (모바일용) */}
                <div className="mr-4 md:hidden font-bold">CoinDash</div>

                {/* Right Side Actions */}
                <div className="ml-auto flex items-center space-x-4">
                    <Button size="sm" variant="outline">
                        Connect Wallet
                    </Button>{" "}
                    {/* 나중에 Wagmi 연결 */}
                    {/* <Avatar className="h-8 w-8 cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar> */}
                </div>
            </div>
        </header>
    );
}
