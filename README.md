# koa-nginx

### Get started

```
docker-compose up
```

To disable auto-restart on local

```
docker update --restart=no $(docker container ls -a -q)
```

To run prod

```
docker-compose -f docker-compose-prod.yml up --build
```

### License

MIT
