import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import styled from "styled-components";

const LoginSection: React.FC = () => {
  const { user, isLoading } = useUser();

  if(isLoading) {
    return (
      <Container>
      </Container>
    );
  }

  if (typeof user === "undefined") {
    return (
      <Container>
        <h1>로그인하고 시작하기</h1>
        <p>sumut에 처음 오셨나요?</p>
        <Link href={"/api/auth/login"} passHref>
          <LoginAnchor>Login</LoginAnchor>
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <h1>
        환영합니다
        <br />
        {user.name}님!
      </h1>
      <p>페이지를 한번 만들어볼까요?</p>
      <Link href={"/dashboard"} passHref>
        <LoginAnchor>대시보드로 가기</LoginAnchor>
      </Link>
    </Container>
  );
};

export default LoginSection;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 40px 20px;

  & > h1 {
    font-size: 32px;
    font-weight: 700;
  }

  & > p {
    font-size: 16px;
    font-weight: 400;
  }
`;

const LoginAnchor = styled.a`
  display: block;
  position: absolute;
  bottom: 100px;
  box-sizing: border-box;
  width: 180px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: blue;
  color: white;
`;
