Letsee Sticker Web App
----

# Build
```
yarn install
yarn run build
```

# Run
```
NODE_ENV=production PORT=[someport] yarn start
```

## Docker

### build
```
$ docker build -t yjang/letsee-sticker .
```

### run
```
$ docker run -p 3000:3000 --name letsee-sticker -d yjang/letsee-sticker
```
