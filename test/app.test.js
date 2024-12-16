const request = require('supertest');
const createServer = require('../app');  // Sunucu fonksiyonunu import ettik

describe('GET /', () => {
  let server;

  // Testlerden önce server'ı başlatıyoruz
  before(function (done) {
    server = createServer().listen(52000, done);  // Test için özel bir port
  });

  // Testlerden sonra server'ı kapatıyoruz
  after(function (done) {
    server.close(done);  // Sunucuyu kapatıyoruz
  });

  it('should return a 200 status and a message', function (done) {
    request(server)  // Sunucuyu burada kullanıyoruz
      .get('/')
      .expect('Content-Type', /text\/plain/)
      .expect(200)
      .expect('Hello, DevOps World! development 1.0.0\n', done);  // ENV ve VERSION doğru olmalı
  });
});
