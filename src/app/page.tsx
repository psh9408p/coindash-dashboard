import { Button } from "@/shared/ui/button"; // 경로 주의

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
            <h1 className="text-4xl font-bold">CoinDash Setup Complete</h1>
            <p className="text-gray-500">Enterprise Hybrid Architecture</p>
            <Button>System Ready</Button>
        </main>
    );
}
