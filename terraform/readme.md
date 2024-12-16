
# Kubernetes Deployment ve Terraform Yapılandırma

Bu döküman, Kubernetes üzerinde `app-deployment-stable` adlı bir uygulamanın deployment ve service kaynağını Terraform ile yönetmek için gerekli dosyaları içermektedir. Ayrıca dosya yapılandırması ve uygulama adımlarını detaylandırmaktadır.

## Dosya Yapısı

Aşağıdaki dosya yapısını takip edebilirsiniz:

```
.
├── main.tf           # Terraform ana yapılandırma dosyanız
├── variables.tf      # Değişkenler için dosya (isteğe bağlı)
├── outputs.tf        # Çıktılar için dosya (isteğe bağlı)
└── terraform.tfvars  # Değişken değerlerini tanımlayabileceğiniz dosya (isteğe bağlı)
```

## `main.tf` - Terraform Yapılandırması

Kubernetes provider'ını, deployment ve service kaynaklarını tanımladığınız dosya.

```hcl
provider "kubernetes" {
  host                   = "https://your-cluster-api-server"
  client_certificate     = file("~/.kube/client-cert.pem")
  client_key             = file("~/.kube/client-key.pem")
  cluster_ca_certificate = file("~/.kube/ca-cert.pem")
}

resource "kubernetes_deployment" "stable" {
  metadata {
    name = "app-deployment-stable"
    labels = {
      app     = "devops-app"
      version = "stable"
    }
  }

  spec {
    replicas = 3

    selector {
      match_labels = {
        app     = "devops-app"
        version = "stable"
      }
    }

    template {
      metadata {
        labels = {
          app     = "devops-app"
          version = "stable"
        }
      }

      spec {
        container {
          name  = "devops-app"
          image = "devops-app:1.0.0"  # stable sürümü
          ports {
            container_port = 52000
          }

          env {
            name  = "NODE_ENV"
            value = "production"
          }
          env {
            name  = "HOSTNAME"
            value = "0.0.0.0"
          }
          env {
            name  = "PORT"
            value = "52000"
          }
          env {
            name  = "VERSION"
            value = "1.0.0"
          }

          volume_mount {
            name      = "app-volume"
            mount_path = "/app"
          }

          resources {
            requests {
              memory = "128Mi"
              cpu    = "250m"
            }
            limits {
              memory = "256Mi"
              cpu    = "500m"
            }
          }

          command = ["npm", "start"]
        }
      }
    }
  }
}

resource "kubernetes_persistent_volume" "app-volume" {
  metadata {
    name = "app-volume"
  }
  spec {
    capacity = {
      storage = "1Gi"
    }
    volume_mode = "Filesystem"
    access_modes = ["ReadWriteOnce"]
    persistent_volume_reclaim_policy = "Retain"

    host_path {
      path = "/mnt/data"
    }
  }
}

resource "kubernetes_persistent_volume_claim" "app-volume-claim" {
  metadata {
    name = "app-volume-claim"
  }
  spec {
    access_modes = ["ReadWriteOnce"]
    resources {
      requests = {
        storage = "1Gi"
      }
    }
    volume_name = kubernetes_persistent_volume.app-volume.metadata[0].name
  }
}

resource "kubernetes_service" "app-service" {
  metadata {
    name = "app-service"
    labels = {
      app     = "devops-app"
      version = "stable"
    }
  }

  spec {
    selector = {
      app     = "devops-app"
      version = "stable"
    }

    port {
      port        = 80
      target_port = 52000
    }

    type = "LoadBalancer"
  }
}
```

## `variables.tf` - Terraform Değişken Dosyası (İsteğe Bağlı)

Bu dosya, Terraform yapılandırmasında kullanılan parametrelerin tanımlandığı dosyadır. Bu dosya isteğe bağlıdır.

```hcl
variable "kubernetes_cluster_host" {
  description = "Kubernetes cluster API server URL"
  type        = string
}

variable "kubernetes_cluster_ca_certificate" {
  description = "Kubernetes cluster CA certificate"
  type        = string
}
```

## `outputs.tf` - Terraform Çıktılar Dosyası (İsteğe Bağlı)

Terraform'un çıktılarının tanımlandığı dosyadır.

```hcl
output "service_ip" {
  value = kubernetes_service.app-service.status[0].load_balancer[0].ingress[0].ip
}
```

## `terraform.tfvars` - Değişken Değerleri Dosyası (İsteğe Bağlı)

Terraform yapılandırmasında kullanılan değişken değerlerinin belirtildiği dosyadır. Bu dosya isteğe bağlıdır.

```hcl
kubernetes_cluster_host             = "https://your-cluster-api-server"
kubernetes_cluster_ca_certificate   = "~/.kube/ca-cert.pem"
```

## Uygulama Adımları

1. **Başlangıç (Terraform Init)**: Terraform'un başlatılmasını sağlar. Provider'lar ve modüller indirilir.

   ```bash
   terraform init
   ```

2. **Planlama (Terraform Plan)**: Yapılacak değişiklikleri gösterir, bu sayede yapılacak değişiklikleri önceden görüp doğrulama yapabilirsiniz.

   ```bash
   terraform plan
   ```

3. **Uygulama (Terraform Apply)**: Değişiklikleri uygulayarak Kubernetes üzerinde belirtilen kaynakları oluşturur.

   ```bash
   terraform apply
   ```

4. **Temizleme (Terraform Destroy)**: Kaynakları kaldırmak için kullanılır.

   ```bash
   terraform destroy
   ```

## Sonuç

Bu Terraform dosyaları, Kubernetes üzerinde bir `stable` sürümünün deployment'ını ve service'ini yönetmek için yapılandırılmıştır. Altyapıyı otomatikleştirmenize ve sürdürülebilir bir şekilde yönetmenize olanak tanır.
