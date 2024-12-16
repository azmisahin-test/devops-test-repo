# **Kubernetes Kullanım Kılavuzu**

## **1. Kurulum**

1. **Minikube İndir ve Kur**:

   ```bash
   curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
   ```

2. **Minikube'yi Sisteme Taşı**:

   ```bash
   sudo mv minikube-linux-amd64 /usr/local/bin/minikube
   ```

3. **Minikube'ye Çalıştırma İzni Ver**:
   ```bash
   sudo chmod +x /usr/local/bin/minikube
   ```

---

## **2. Kubernetes Cluster Başlat**

1. **Minikube'yi Başlat**:

   ```bash
   minikube start
   ```

   > Bu komut, Minikube ile bir Kubernetes cluster başlatır. Sanal makine (VM) veya Docker container'ı kullanarak küme oluşturur.

2. **Docker Çevre Değişkenlerini Ayarla (Eğer Docker ile Çalışacaksan)**:

   ```bash
   eval $(minikube docker-env)
   ```

   > Bu komut, Minikube'nin Docker ortamını kullanmanı sağlar. Artık yerel olarak oluşturduğun Docker imajlarını doğrudan Kubernetes içinde kullanabilirsin.

---

## **3. Docker İmajı Oluştur ve Kullan**

1. **Docker İmajı Oluştur**:

   ```bash
   docker build -t devops-app:1.0.0 .
   ```

   > Bu, projenizin kök dizininde `Dockerfile` kullanarak `devops-app:1.0.0` adlı bir Docker imajı oluşturur.

---

## **4. Kubernetes Konfigürasyonunu Uygula**

1. **Deployment ve Servis Dosyalarını Yükle**:

   ```bash
   kubectl apply -f app-deployment.yaml
   ```

   ```bash
   kubectl apply -f app-service.yaml
   ```

   > Bu komutlar, `app-deployment.yaml` ve `app-service.yaml` dosyalarını yükleyerek pod'ları ve servisleri oluşturur.

2. **Pod'ları ve Servisleri Kontrol Et**:

   ```bash
   kubectl get pods  # Çalışan pod'ları listeler
   kubectl get svc   # Servisleri ve LoadBalancer IP'sini gösterir
   ```

   > Pod'lar ve servisler doğru çalışıyor mu diye kontrol etmek için kullanılır.

---

## **5. Minikube Tunnel ile Erişim Sağlama**

1. **Minikube Tunnel'ı Başlat**:

   ```bash
   minikube tunnel
   ```

   > Bu komut, Kubernetes servislerinin dışarıdan erişilebilir olmasını sağlar. Terminalde açık tutmanız gerektiğini unutmayın.

2. **Servise Erişim Sağla**:

   ```bash
   curl http://<minikube-ip>:<node-port>
   ```

   > Minikube IP'sini öğrenmek için şu komutu kullanabilirsiniz:

   ```bash
   minikube ip
   ```

   > `node-port` numarasını ise `kubectl get svc` komutuyla bulabilirsiniz.

---

## **6. Kubernetes Port Forwarding ile Erişim Sağlama**

1. **Port Forwarding Başlat**:

   ```bash
   kubectl port-forward svc/app-service 8080:80
   ```

   > Bu komut, Kubernetes servisini yerel makinenizdeki 8080 portuna yönlendirir. Artık `localhost:8080` üzerinden servisinize erişebilirsiniz.

Port Forwarding Komutunun Otomatik Yeniden Başlatılması

```
while true; do
    kubectl port-forward deployment/app-deployment 8080:52000
    sleep 2  # 2 saniye bekle ve yeniden başlat
done
```

2. **Servise Erişim Sağla**:

   ```bash
   curl http://localhost:8080
   ```

   > Eğer Minikube Tunnel kapalıysa ve Port Forwarding ile bağlantı sağladıysanız, burada erişim sağlanabilir.

---

## **7. Hata Giderme**

1. **Pod Bilgilerini Görüntüle**:

   ```bash
   kubectl describe pod <pod-name>
   ```

   > Pod çalışmıyorsa, `ImagePullBackOff` gibi bir hata alabilirsin. Bunun sebebi genellikle Kubernetes'in Docker imajını bulamamasıdır.

2. **Log'ları İncele**:

   ```bash
   kubectl logs <pod-name>
   ```

   > Pod'larda hata olup olmadığını görmek için kullanılır.

---

## **8. Kubernetes Kaynaklarını Silme**

1. **Pod, Deployment ve Servis Silme**:
   ```bash
   kubectl delete pod <pod-name>
   kubectl delete deployment <deployment-name>
   kubectl delete service <service-name>
   ```

---

## **9. Minikube ile Kubernetes’i Sıfırlamak**

1. **Kubernetes'i Sıfırlamak İçin Şu Adımları Uygula**:

   ```bash
   minikube stop
   minikube delete
   rm -rf ~/.kube
   docker system prune -a
   ```

   > Bu komutlar, Minikube cluster'ını durdurur, siler ve ilgili Docker sistemini temizler.
