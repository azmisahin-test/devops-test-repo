// dotenv paketini yükleyelim
require('dotenv').config();

const http = require("http");

// Çevresel değişkenlerden HOSTNAME ve PORT bilgilerini alıyoruz
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0"; // .env dosyasından alır, yoksa varsayılan olarak "0.0.0.0"
const PORT = process.env.PORT || 52000; // .env dosyasından alır, yoksa varsayılan olarak 52000
const ENV = process.env.NODE_ENV || "development";
const VERSION = process.env.VERSION || "1.0.0";

// Sunucu oluşturma fonksiyonu
const createServer = () => {
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(`Hello, DevOps World! ${ENV} ${VERSION}\n`);
  });

  return server;
};

// Sunucuyu başlatma
if (require.main === module) {
  const server = createServer();
  server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
  });

  // Güvenli kapanma için sinyalleri dinleme
  process.on('SIGINT', () => {
    console.log("SIGINT sinyali alındı. Sunucu kapatılıyor...");
    server.close(() => {
      console.log("Sunucu başarıyla kapatıldı.");
      process.exit(0); // Uygulama normal bir şekilde sonlanıyor
    });
  });

  process.on('SIGTERM', () => {
    console.log("SIGTERM sinyali alındı. Sunucu kapatılıyor...");
    server.close(() => {
      console.log("Sunucu başarıyla kapatıldı.");
      process.exit(0); // Uygulama normal bir şekilde sonlanıyor
    });
  });
}

module.exports = createServer;
