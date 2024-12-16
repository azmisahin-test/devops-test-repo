# Alert system

## Install dependency Helm

```
curl -fsSL https://get.helm.sh/helm-v3.12.0-linux-amd64.tar.gz -o helm.tar.gz

```

```
tar -zxvf helm.tar.gz
sudo mv linux-amd64/helm /usr/local/bin/helm
```

```
helm version
```

## prometheus

```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack
```

```
kubectl get pods -n default
```

```
kubectl port-forward svc/prometheus-grafana 3001:80
```

Kullanıcı adı: admin
Parola: admin (ilk girişte değiştirmeniz istenecektir)

```
kubectl port-forward svc/prometheus-kube-prometheus-prometheus 9090:9090
```

Horizontal Pod Autoscaler (HPA)

```
kubectl apply -f app-hpa.yaml
```
