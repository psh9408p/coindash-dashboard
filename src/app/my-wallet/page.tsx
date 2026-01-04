"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
    Download,
    ArrowUpRight,
    ArrowDownLeft,
    RefreshCcw,
} from "lucide-react";

type TransactionType = "Send" | "Receive" | "Swap";
type TransactionStatus = "Completed" | "Pending";

interface Transaction {
    id: string;
    type: TransactionType;
    status: TransactionStatus;
    amount: string;
    date: string;
    hash: string;
}

const transactions: Transaction[] = [
    {
        id: "1",
        type: "Send",
        status: "Completed",
        amount: "-0.5 ETH",
        date: "2024-03-20",
        hash: "0x123...456",
    },
    {
        id: "2",
        type: "Receive",
        status: "Completed",
        amount: "+2.0 ETH",
        date: "2024-03-18",
        hash: "0x789...abc",
    },
    {
        id: "3",
        type: "Swap",
        status: "Completed",
        amount: "1.0 ETH → 2500 USDC",
        date: "2024-03-15",
        hash: "0xdef...012",
    },
    {
        id: "4",
        type: "Send",
        status: "Pending",
        amount: "-100 USDC",
        date: "2024-03-14",
        hash: "0x345...678",
    },
    {
        id: "5",
        type: "Receive",
        status: "Completed",
        amount: "+500 USDC",
        date: "2024-03-12",
        hash: "0x901...234",
    },
    {
        id: "6",
        type: "Swap",
        status: "Completed",
        amount: "0.2 ETH → 500 USDC",
        date: "2024-03-10",
        hash: "0x567...890",
    },
    {
        id: "7",
        type: "Send",
        status: "Completed",
        amount: "-0.1 ETH",
        date: "2024-03-08",
        hash: "0xabc...def",
    },
    {
        id: "8",
        type: "Receive",
        status: "Pending",
        amount: "+1.5 ETH",
        date: "2024-03-05",
        hash: "0x123...789",
    },
    {
        id: "9",
        type: "Send",
        status: "Completed",
        amount: "-250 USDC",
        date: "2024-03-03",
        hash: "0x456...012",
    },
    {
        id: "10",
        type: "Swap",
        status: "Completed",
        amount: "0.5 ETH → 1250 USDC",
        date: "2024-03-01",
        hash: "0x789...345",
    },
];

export default function MyWalletPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">
                        My Wallet History
                    </h1>
                    <p className="text-muted-foreground">
                        Track and manage your recent blockchain transactions.
                    </p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export CSV
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">
                                    Hash
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((tx) => (
                                <TableRow key={tx.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {tx.type === "Send" && (
                                                <ArrowUpRight className="h-4 w-4 text-red-500" />
                                            )}
                                            {tx.type === "Receive" && (
                                                <ArrowDownLeft className="h-4 w-4 text-green-500" />
                                            )}
                                            {tx.type === "Swap" && (
                                                <RefreshCcw className="h-4 w-4 text-blue-500" />
                                            )}
                                            <span className="font-medium">
                                                {tx.type}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                tx.status === "Completed"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            className={
                                                tx.status === "Completed"
                                                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                                            }
                                        >
                                            {tx.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono">
                                        {tx.amount}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {tx.date}
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-xs text-muted-foreground">
                                        {tx.hash}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
