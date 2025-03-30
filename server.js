const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

const API_PROXY_PATH = "/api"; // Proxy'nin başlama noktası
const TARGET_SERVER = "http://37.148.210.172:5006"; // API'nin yönlendirileceği adres

// **Genel Proxy Middleware'i Tanımlıyoruz**
const apiProxy = createProxyMiddleware({
  target: TARGET_SERVER, // Hedef sunucu
  changeOrigin: true,
  timeout: 300000, // 5 dakika timeout
  proxyTimeout: 300000,
  pathRewrite: { "^/api/": "/" }, // `/api/` kısmını kaldır
  onError: (err, req, res) => {
    console.error("Proxy error:", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Proxy error occurred");
  },
});

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    // **Tüm `/api/...` isteklerini proxy'ye yönlendir**
    if (pathname.startsWith(API_PROXY_PATH)) {
      return apiProxy(req, res);
    }

    // **Her bir istek için timeout süresi belirle**
    req.setTimeout(300000);

    // Next.js sayfa yönlendirmeleri
    if (pathname === "/a") {
      app.render(req, res, "/a", query);
    } else if (pathname === "/b") {
      app.render(req, res, "/b", query);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  // **Genel sunucu timeout süresi (5 dakika)**
  server.setTimeout(300000, (socket) => {
    console.log("Client request timeout after 5 minutes!");
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
