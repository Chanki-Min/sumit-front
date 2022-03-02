import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Layout: React.FC = (props) => {
  const { user, isLoading } = useUser();

  const [state, setState] = useState<{
    isLoading: boolean;
    response: any;
    error: any;
  }>({ isLoading: false, response: undefined, error: undefined });

  useEffect(() => {
    console.log(JSON.stringify(state, undefined, 2));
  }, [state]);

  const callApi = async () => {
    setState((previous) => ({ ...previous, isLoading: true }));

    try {
      const response = await fetch("/api/hello");
      const data = await response.json();

      setState((previous) => ({
        ...previous,
        response: data,
        error: undefined,
      }));
    } catch (error) {
      setState((previous) => ({ ...previous, response: undefined, error }));
    } finally {
      setState((previous) => ({ ...previous, isLoading: false }));
    }
  };

  const handleButtonClick = (event: React.MouseEvent, fn: () => void) => {
    event.preventDefault();
    fn();
  };

  return (
    <>
      <Navigation>
        {user && (
          <Link href={"/api/auth/logout"} passHref>
            <Profile>{user.name}, 클릭해서 로그아웃하기</Profile>
          </Link>
        )}
        {!isLoading && !user && (
          <Link href={"/api/auth/login"} passHref>
            <LoginAnchor>로그인하기</LoginAnchor>
          </Link>
        )}

        <button onClick={(e) => handleButtonClick(e, callApi)}>
          보안이 필요한 요청 보내기
        </button>
      </Navigation>

      <ContentsSeciton>{props.children} </ContentsSeciton>
    </>
  );
};

export default Layout;

const Navigation = styled.nav`
  box-sizing: border-box;
  padding: 5px 20px;
  width: 100%;
  min-height: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: lightgray;
`;

const LoginAnchor = styled.a`
  display: inline-block;
  padding: 5px;
  background-color: blueviolet;

  color: white;
  font-size: 18px;
`;

const Profile = styled.a`
  display: inline-block;
  padding: 5px;
  background-color: blue;

  color: white;
  font-size: 18px;
`;

const ContentsSeciton = styled.section`
  width: 100%;
`;
