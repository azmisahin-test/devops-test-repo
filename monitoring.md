# Monitoring

```
kubectl get pods
```

```
kubectl logs <pod_name>
```

```
kubectl get svc
```

```
kubectl scale deployment app-deployment --replicas=3
```

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
kubectl get pods -n kube-system | grep metrics-server

```

```
kubectl -n kubernetes-dashboard create serviceaccount admin-user
kubectl -n kubernetes-dashboard create clusterrolebinding admin-user-binding \
  --clusterrole=cluster-admin \
  --serviceaccount=kubernetes-dashboard:admin-user
kubectl -n kubernetes-dashboard create token admin-user

```

```
eyJhbGciOiJSUzI1NiIsImtpZCI6InB3cktLT2ZnSkhqcWRhZ3NTc0hHY0dyd3pvWU9qZEszakR3aFEwSFp1THMifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiXSwiZXhwIjoxNzM0MzEyMzIwLCJpYXQiOjE3MzQzMDg3MjAsImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwianRpIjoiNjI4NWVjMTEtNTgyYy00YTNjLTgwMWQtZjA2MGM0ZmZhMGEwIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsInNlcnZpY2VhY2NvdW50Ijp7Im5hbWUiOiJhZG1pbi11c2VyIiwidWlkIjoiYjIxNDIxMGYtMjBiMi00YTBiLWE0NTktMjk2Y2I2MTkyMTQ5In19LCJuYmYiOjE3MzQzMDg3MjAsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlcm5ldGVzLWRhc2hib2FyZDphZG1pbi11c2VyIn0.nvQawSoE-veiM4hv8NmA5YdXgpGlYmgo1Hjh2foNDUDmDMJ__2JSZ8k4tFxwBIS2TSRhEuHqpDAGs3lor52cdV-rn6a6qGnuDDG-YQdaEFrgP_fjkq4FTGftqmcjXQ35u3sHnlYdHOsT2BFrJSH8R5eS4VLS8RqGiB1MmLzlXpj6YcNDDYKJboCiGpzQ05z1QT1C7v_JebkZhx8F8NRzXfTZNMgXlP3N7EkEWzFlUJxdC9ZyUBuHyHTdLLD-1J0G3npa8oX-db-QvfSsvEmXmgFmbSDExJKtu90az-WZJx2lGs-mp6K29zwd0keeWid2BEUKzTS0Lj2jxXPiL7_KuA
```

```
kubectl proxy --address='0.0.0.0' --port=8081 --accept-hosts='^*$'
http://localhost:8081
http://localhost:8081/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/
https://localhost:57592/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

```
eval $(minikube docker-env)
docker build -t devops-app:2.0.0 .
kubectl set image deployment/app-deployment devops-app=devops-app:2.0.0
kubectl rollout status deployment/app-deployment
```

```
kubectl rollout restart deployment/app-deployment
```

NOTE:
Port Forwarding Komutunun Otomatik Yeniden Başlatılması için

```
while true; do
    kubectl port-forward deployment/app-deployment 8080:52000
    sleep 2  # 2 saniye bekle ve yeniden başlat
done
```
