const promClient = require('prom-client');
const http = require('http');

const register = new promClient.Registry();
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Histogram of HTTP request durations',
  buckets: [0.1, 0.2, 0.3, 0.4, 0.5]
});

register.registerMetric(httpRequestDurationMicroseconds);

http.createServer((req, res) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, status: res.statusCode });
  });
  res.end('Hello World');
}).listen(8080);

// Endpoint for Prometheus to scrape
http.createServer((req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.end(register.metrics());
}).listen(9090);
