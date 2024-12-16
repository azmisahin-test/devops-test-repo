const redis = require("redis");
const client = redis.createClient({
  host: "redis", // Redis servisi Kubernetes'te "redis" adıyla erişilebilir
  port: 6379,
});

// Ürün arama işlemi
const getProductFromCache = (productId) => {
  return new Promise((resolve, reject) => {
    client.get(`product:${productId}`, (err, data) => {
      if (err) reject(err);
      if (data) {
        resolve(JSON.parse(data)); // Cache'den ürün verisini al
      } else {
        // Veritabanına sorgu atılır
        const product = getProductFromDB(productId); 
        client.setex(`product:${productId}`, 3600, JSON.stringify(product)); // Cache'e ekler
        resolve(product);
      }
    });
  });
};
