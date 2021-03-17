# koa-kube

### Build image

```
docker build -t antonybudianto/koa-kube-app:1.0 .
```

### Push image

```
docker push antonybudianto/koa-kube-app:1.0
```

### Apply kube

```
kubectl apply -f kube/hello.yaml
```

### Check pods

```
kubectl get pods -l app=koa-kube-app
```

### Check deployment

```
kubectl get deployment
```

### Check service

```
kubectl get service
```

### License

MIT
