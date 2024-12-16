# mesh
```
istioctl install --set profile=demo
```

```
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: order-to-payment
spec:
  hosts:
  - payment-service
  http:
  - route:
    - destination:
        host: payment-service
        port:
          number: 8080
```


```
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: payment-service
spec:
  host: payment-service
  trafficPolicy:
    connectionPool:
      http:
        maxRequestsPerConnection: 1
    outlierDetection:
      consecutiveErrors: 5
      interval: 1s
      baseEjectionTime: 30s
```
