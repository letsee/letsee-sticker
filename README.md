Letsee Sticker Web App (WEBAR)  
----

기존의 Letsee Browser 앱에서 동작했던 Letsee Sticker Web App을 
WebAR SDK위에서 돌아가도록 포팅작업을 진행하였다. 

현재 렛시 Browser에서 동작했던 로그인 기능은 모두 제거되어 있고, 
User는 하나의 유저를 고정하여 사용하고 있다. 
```
currentUser = {
  firstname: 'WEBARSDK-JUNGWOO',
  lastname: 'TEST',
  uid: "jjjjjw910911-010-6284-8051",
};
```

## 빌드환경 구성

- node: ```v8.14.0```  
(높은버전의 node로 빌드시 node-sass 모듈에서 에러 발생)
- react: ```v15.6,1``` 

- ```Yarn```으로 빌드를 진행한다.  
(npm으로 빌드시 에러 발생)

```
brew install yarn
yarn install
yarn run build
```
`yarn run build` 실행 시 `public` 폴더로 React 소스코드가 빌드된 결과가 출력된다. 

소스코드를 수정한 후, `yarn run build` 명령어를 통해 webpack으로 빌드 된 index.html 파일이 포함된 ```동작가능한 웹리소스 폴더를 추출``` 할 수 있다.  

현재 ```webpack-dev-server```구축이 되어있지 않기 때문에 소스코드를 수정할때마다 ```yarn run build``` 명령어를 수행해야 하므로 매우 불편하다.
추후에 ```webpack-dev-server``` 구축을 통해 ```hot-reloading``` 가능하도록 구성하도록 한다. 

## public 내부 폴더 구조
 
- index.html (메인)
- css 
- assets
- js

## 백엔드 서버 정보

현재 스티커앱의 백엔드 데이터는 `firebase`, `firebase cloud function` 을 통해 데이터를 조회하고 갱신한다. 

Letsee Firebase 프로젝트 목록 중 ```webar-sticker``` 프로젝트를 이용한다.

#### firebase 
- publicMessage, privateMessage 저장, 스티커들의 위치 정보데이터 저장, 조회
- https://console.firebase.google.com/project/letsee-webar-sticker/database/letsee-webar-sticker/data
- 위 링크로 들어가면 Sticker데모 앱의 백엔드 데이터 구조를 확인 할 수 있다.

#### cloud function 
- Message들이 firebase에 등록될때마다 자동으로 messageCount값을 늘려주거나 줄여주는 기능을 수행함. (serverless)
- https://console.firebase.google.com/project/letsee-webar-sticker/functions
- 위 링크로 들어가 `자세한 사용 통계`를 확인하면 각각의 함수들에 대한 통계 및 소스코드 확인 가능


### cloud function 실행

프로젝트 루트의 `cloud` 폴더 안에서 firebase cloud function을 배포할 수 있다. 아래 단계를 통해 배포를 진행한다. 

* 함수에 필요한 모듈을 설치하기 위해 `cloud/functions` 경로에서 `npm install` 명령어을 실행시켜준다. 

프로젝트 루트의 `cloud` 폴더 안에서 firebase cloud function을 배포할 수 있다. 아래 단계를 통해 배포를 진행한다. 

* 함수에 필요한 모듈을 설치하기 위해 `cloud/functions` 경로에서 `npm install` 명령어을 실행시켜준다. 
```
npm install -g firebase-tools
```
* 이후 Firebase CLI로 로그인을 진행한다. 로그인한 유저의 권한에는 `webar-sticker` 에 대한 접근 권한이 있어야 한다.
```
firebase login
```
- 마지막으로 cloud 폴더에서 아래 명령어로 함수를 배포해준다. 이때 `index.js`에 있는 cloud 함수들이 배포가 되며, 바로 사용할 수 있다. 
```
firebase deploy 
```
  
  
 
## Run, Docker

기존에 윤정님이 만들어놓은 도커 배포 방식인데 현재 동작하지 않는다.

추후 도커로 배포할 상황이 발생시 참고용으로 남겨둠.

### server
```
NODE_ENV=production PORT=[someport] yarn start
```

### build
```
$ docker build -t yjang/letsee-sticker .
```

### run
```
$ docker run -p 3000:3000 --name letsee-sticker -d yjang/letsee-sticker
```

## 스티커 이동 오류 

현재 스티커를 웹앱으로 포팅하는 과정에서 스티커를 이동시키는 기능 동작 중, WebAR SDK가 사용하는 축과, 
기존의 Letsee Browser위에서 동작했던 스티커 웹앱이 사용하는 좌표축이 달라서 맞추는 작업을 진행하였다.

현재 이동, 회전, 축회전 기능은 모두 잘 동작하지만, 두손으로 터치를 입력하는 도중, 한손가락은 고정시키고 
남은 손가락을 붙였다 떼었다 할 때 스티커의 ```position```값이 튀는 문제가 발생하고 있는데, 추후 개발 시 참고를 바란다.
