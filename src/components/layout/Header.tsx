import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useScroll from "../../hooks/useScroll";
// import { authState } from '../../stores/auth';
import MarginContainer from "../main/Margin";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import { Dropdown } from "semantic-ui-react";
import styled from "styled-components";

const Header = ({ isPC }: { isPC: boolean }) => {
  const { user } = useUser();
  const { scrollY } = useScroll();

  const options = [
    // { key: 'home', text: '홈으로 가기', link: '/' },
    { key: "mypage", text: "마이페이지", link: "/mypage" },
    // { key: 'dashboard', text: '나의 대시보드', link: '/dashboard' },
    // { key: 'search', text: '대시보드 검색', link: '/search' },
    { key: "logout", text: "로그아웃하기", link: "/api/auth/logout" },
  ];
  // const navigate = useNavigate();
  //   const { isAuthenticated } = useRecoilValue(authState);
  return (
    <Wrapper scrollY={scrollY} isPC={isPC}>
      <Navigation>
        <Link href={"/"} passHref>
          <LogoBox>
            <Image src="/img/mountain.png" alt="logo" width={28} height={32} />
            sumit
          </LogoBox>
        </Link>
        {user && (
          <Profile>
            {user.picture && (
              <div className="profile_img">
                <Image
                  src={user.picture}
                  layout="fill"
                  alt="user profile image"
                />
              </div>
            )}
            <Dropdown trigger={user.name}>
              <Dropdown.Menu>
                {options.map((option) => (
                  <Dropdown.Item
                    key={option.key}
                    text={option.text}
                    href={option.link}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Profile>
        )}
      </Navigation>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div<{ scrollY: number; isPC: boolean }>`
  position: fixed;
  top: 0px;
  height: ${({ isPC }) => (isPC ? "70px;" : "60px")};
  width: 100%;
  background-color: ${({ scrollY }) =>
    scrollY > 30 ? `rgba(225, 225, 237, 0.884)` : `rgba(255, 255, 255, 0)`};
  backdrop-filter: saturate(100%) blur(30px);
  filter: drop-shadow(0px 1px 25px rgba(0, 0, 0, 0.1));

  z-index: 10;
  /* & > div {
    font-weight: 500;
    display: flex;
    justify-content: center; //space-between,
    align-items: center;
    & > a {
      position: absolute;
      left: 32px;
      cursor: pointer;
      &:hover {
        transform: translateY(-3px);
        transition: all 0.3s ease;
      }
    } }*/
`;
const Navigation = styled.nav`
  padding: 5px 20px;
  width: 100%;
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-bottom: solid 1px rgba(156, 156, 156, 0.2); // 추가
`;

const LogoBox = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;

  font-size: 30px;
  font-weight: 700;

  background-color: transparent;
  border: none;

  &:hover {
    color: teal;
  }
`;

const Profile = styled.a`
  display: flex;
  align-items: center;
  margin-right: 50px;
  font-size: 18px;

  & > .profile_img {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }
`;
