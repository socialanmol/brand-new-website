import { createServer } from "node:http";

const port = Number(process.env.API_PORT || 8787);
const { GET } = await import("./src/app/api/google-reviews/route.ts");

const server = createServer(async (request, response) => {
  const { pathname } = new URL(request.url || "/", "http://localhost");

  if (request.method !== "GET" || pathname !== "/api/google-reviews") {
    response.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  try {
    const result = await GET();
    response.writeHead(result.status, Object.fromEntries(result.headers));
    response.end(await result.text());
  } catch (error) {
    console.error("Google Reviews request failed:", error);
    response.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ error: "Google Reviews request failed" }));
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Google Reviews API listening on port ${port}`);
});