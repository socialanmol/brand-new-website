import { createServer } from "node:http";
import { migrate } from "./server/db.mjs";
import { HttpError, json } from "./server/http.mjs";
import { loadEnv } from "./server/load-env.mjs";
import { handleRequest } from "./server/router.mjs";

loadEnv();

const port = Number(process.env.API_PORT || 8787);

try {
  await migrate();
  console.log("MySQL schema is ready");
} catch (error) {
  console.error("MySQL schema setup failed:", error.message);
}

const server = createServer(async (request, response) => {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "no-referrer");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  try {
    await handleRequest(request, response);
  } catch (error) {
    if (response.headersSent) return;
    const status = error instanceof HttpError ? error.status : 500;
    if (status === 500) console.error("Request failed:", error instanceof Error ? error.message : "unknown");
    json(response, status, { error: status === 500 ? "Request failed" : error.message });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`API listening on 127.0.0.1:${port}`);
});
