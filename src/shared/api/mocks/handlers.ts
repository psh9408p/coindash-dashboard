import { http, HttpResponse } from "msw";

export const handlers = [
    // GET /api/user 요청을 가로챕니다.
    http.get("/api/user", () => {
        return HttpResponse.json({
            id: 1,
            name: "CoinDash User",
            email: "user@coindash.com",
            role: "admin",
            balance: 15000.5, // 더미 잔고
        });
    }),
];
