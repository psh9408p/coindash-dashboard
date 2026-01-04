"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { TrendingUp, ArrowUpRight, DollarSign, Percent } from "lucide-react";
import { ChartContainer, ChartConfig } from "@/shared/ui/chart";

const chartData = [
    { month: "Jan", value: 12500 },
    { month: "Feb", value: 14200 },
    { month: "Mar", value: 13800 },
    { month: "Apr", value: 16500 },
    { month: "May", value: 18900 },
    { month: "Jun", value: 21400 },
];

const chartConfig = {
    value: {
        label: "Value",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground">
                    Detailed insights into your portfolio performance.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Profit
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+$8,900.00</div>
                        <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                            <TrendingUp className="h-3 w-3" />
                            +12.5% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            ROI (All Time)
                        </CardTitle>
                        <Percent className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+42.8%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Outperforming market avg
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Net Worth
                        </CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$21,400.00</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Highest point this year
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Portfolio Growth Chart */}
            <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-lg">Portfolio Growth</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0 h-[400px]">
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            data={chartData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient
                                    id="colorValue"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="var(--primary)"
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--primary)"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="3 3"
                                className="stroke-muted"
                            />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border bg-background p-3 shadow-md">
                                                <p className="text-sm font-bold mb-1">
                                                    {label}
                                                </p>
                                                <p className="text-sm text-primary">
                                                    Value: $
                                                    {payload[0].value?.toLocaleString()}
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="var(--primary)"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
