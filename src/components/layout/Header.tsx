import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Header: React.FC = (props) => {
  const { user } = useUser();

  return (
    <>
      <Navigation>
        <LogoBox>
          <Image src="/img/mountain.png" alt="logo" width={40} height={40} />
          sumit
        </LogoBox>

        {user && (
          <Link href={"/api/auth/logout"} passHref>
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
              {user.name}
            </Profile>
          </Link>
        )}
      </Navigation>


    </>
  );
};

export default Header;

const Navigation = styled.nav`
  box-sizing: border-box;
  padding: 5px 20px;
  width: 100%;
  height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(171, 214, 243);
`;

const LogoBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;

  font-size: 24px;
  font-weight: 700;
`;

const Profile = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px;
  font-size: 18px;

  & > .profile_img {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }
`;

