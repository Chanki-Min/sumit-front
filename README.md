## 프로젝트 시작하기

`npm`으로 필요한 의존성을 받아주세요:

```bash
npm install
```

## 설정하기

### 환경 변수 설정하기

Auth0 와 연동을 위하여 적절한 환경변수 파일이 필요합니다.

프로젝트 최상위 폴더에 `.env.local` 파일을 생성하고, [노션 문서](https://www.notion.so/56b04d6fa38a48c7a6fefc63626ac696)에 있는 내용을 복사해 주세요. [Next.js의 환경변수 챕터 보기~](https://nextjs.org/docs/basic-features/environment-variables):

최종 결과는 다음과 비슷한 파일입니다.

```sh
# A long secret value used to encrypt the session cookie
AUTH0_SECRET='LONG_RANDOM_VALUE'
# The base url of your application
AUTH0_BASE_URL='http://localhost:3000'
# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_DOMAIN.auth0.com'
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
# Your Auth0 API's Identifier
# OMIT if you do not want to use the API part of the sample
AUTH0_AUDIENCE='YOUR_AUTH0_API_IDENTIFIER'
# The permissions your app is asking for
# OMIT if you do not want to use the API part of the sample
AUTH0_SCOPE='openid profile email read:shows'
```

**주의**: 프로덕션에 올릴 때에는 `AUTH0_SECRET` 필드에 충분히 긴 문자열을 넣어주셔야 합니다. (`openssl rand -hex 32` 같은 명령으로 생성하실 수 있습니다.).

## 실행하기

## 핫-리로드로 실행하기 (개발 빌드)

```bash
npm run dev
```

## 프로덕션용으로 빌드하기

```bash
npm run build
```

## 프로덕션 빌드 실행하기

```bash
npm run start
```
