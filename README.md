# devops-test-repo

DevOps test project


## **Quick Start**

Bu kılavuz, uygulamanızı hızlıca çalıştırmak için gereken adımları içerir. Docker, Docker Compose veya Kubernetes kullanarak başlatabilirsiniz.

---

### **1. Docker ile Başlatma**

Docker ile uygulamanızı başlatmak için aşağıdaki komutu çalıştırabilirsiniz:

```bash
docker build -t devops-app .
docker run -p 8080:80 devops-app
```

Bu komut, Docker imajını oluşturur ve ardından uygulamayı 8080 portunda çalıştırır.

---

### **2. Docker Compose ile Başlatma**

Docker Compose kullanarak uygulamanızı başlatmak için, projenizdeki `docker-compose.yaml` dosyasını kullanabilirsiniz.

```bash
docker-compose -f "docker-compose.yaml" up -d --build
```

Bu komut, Docker Compose dosyasını kullanarak uygulamanızı başlatır ve arka planda çalıştırır.

---

### **3. Kubernetes ile Başlatma**

Kubernetes üzerinde uygulamanızı başlatmak için önce `deployment` ve `service` kaynaklarını uygulamanız gerekir.

#### **Deployment için:**

Aşağıdaki komutla `deployment` kaynak dosyasını uygulayın:

```bash
kubectl apply -f app-deployment.yaml
```

Bu komut, `app-deployment.yaml` dosyasını kullanarak Kubernetes üzerinde uygulamanızı başlatır.

#### **Port Forwarding ile Bağlantı Kurma:**

Aşağıdaki komutla, `deployment` üzerinden 8080 portunu 52000 portuna yönlendirebilirsiniz:

```bash
kubectl port-forward deployment/app-deployment 8080:52000
```

Bu komut, 8080 portunu alır ve 52000 portuna yönlendirir.

#### **Service ile Bağlantı Kurma:**

Alternatif olarak, bir servis oluşturup ona yönlendirme yapabilirsiniz. Bunun için aşağıdaki komutları izleyebilirsiniz:

1. **Servisi Uygulama:**

   ```bash
   kubectl apply -f app-service.yaml
   ```

2. **Servis üzerinden Port Forwarding:**

   ```bash
   kubectl port-forward svc/app-service 8080:80
   ```

Bu komut, servis üzerinden 8080 portunu 80 portuna yönlendirecek ve yerel makinelerden uygulamaya erişimi sağlayacaktır.

---

### **Hızlı Başlangıç İçin Öneriler:**

- **Docker:** Eğer Docker ve Docker Compose kullanıyorsanız, hızlıca çalıştırmak için `docker-compose.yaml` dosyasını kullanmak en verimli yöntemdir.
- **Kubernetes:** Kubernetes ortamında çalışıyorsanız, önce `deployment` ve ardından `service` yapılarını kullanarak uygulamanızı yönetebilirsiniz. `kubectl port-forward` komutları ile yerel makineniz üzerinden kolayca erişebilirsiniz.

---

## **Özet**

1. **Docker ile:** `docker run dockerfile`
2. **Docker Compose ile:** `docker-compose up -d --build`
3. **Kubernetes ile:**
   - `kubectl apply -f app-deployment.yaml`
   - `kubectl port-forward deployment/app-deployment 8080:52000`
4. **Servis ile Kubernetes:**
   - `kubectl apply -f app-service.yaml`
   - `kubectl port-forward svc/app-service 8080:80`

---

Bu hızlı başlangıç kılavuzu, Docker, Docker Compose ve Kubernetes kullanarak uygulamanızı hızlıca çalıştırmanızı sağlar. Her bir ortam için adımları takip ederek uygulamanızı başlatabilirsiniz.
