# Letsee Sticker
## 환경 변수 설정
프로젝트 폴더에 `.env` 파일을 생성. 다음과 같은 변수들을 설정.

### 파이어베이스 관련
* `FIREBASE_API_KEY`
* `FIREBASE_AUTH_DOMAIN`
* `FIREBASE_DATABASE_URL`
* `FIREBASE_PROJECT_ID`
* `FIREBASE_MESSAGING_SENDER_ID`

### 카카오 관련
* `KAKAO_APP_KEY`
* `KAKAO_IMAGE_URL`

### 기타
* `NODE_ENV` - 노드 환경
* `PUBLIC_PATH` - 배포할 subpath

## Install
Clone this repository and run:

```bash
# yarn
yarn install

# npm
npm install
```

## Dev Server
To start a development server on port 8080:

```bash
# yarn
yarn dev

# npm
npm run dev
```

## Build
To compile source code, run:

```bash
# Build client & server code

# yarn
yarn build

# npm
npm run build


# Build client code

# yarn
yarn build:client

# npm
npm run build:client


# Build client code

# yarn
yarn build:server

# npm
npm run build:server
```

The files will be placed in `public` directory.

## Run
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
