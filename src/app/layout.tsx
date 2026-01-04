import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/widgets/header/ui/header"; // Import
import { Sidebar } from "@/widgets/sidebar/ui/sidebar"; // Import
import { MSWProvider } from "@/app/_providers/msw-provider"; // Import
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CoinDash",
    description: "Enterprise Hybrid Dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning={true}>
                {/* <MSWProvider> */}
                <Providers>
                    <div className="min-h-screen flex flex-col md:flex-row">
                        {/* Desktop Sidebar (모바일 숨김: hidden md:block) */}
                        <aside className="hidden md:block w-64 border-r shrink-0">
                            <Sidebar className="h-full" />
                        </aside>

                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col min-h-screen">
                            <Header />
                            <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-slate-50/50">
                                {children}
                            </main>
                        </div>
                    </div>
                </Providers>
                {/* </MSWProvider> */}
            </body>
        </html>
    );
}
