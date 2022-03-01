import { handleAuth } from "@auth0/nextjs-auth0";

// {FRONT_DOMAIN}/auth/... 로 들어오는 모든 요청을 auth0로 중계하는 proxy-route를 생성합니다.
export default handleAuth();
