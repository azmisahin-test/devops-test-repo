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