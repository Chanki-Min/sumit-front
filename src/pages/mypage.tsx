import {
  getSession,
  UserProfile,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

interface MypageProps {
  user?: UserProfile;
}

const Mypage: React.FC<MypageProps> = ({ user }) => {
  const [name, setName] = useState<string | undefined>(user?.name ?? "");
  const [job, setJob] = useState<string | undefined>("");

  const [isChangeAble, setIsChangeable] = useState(false);

  useEffect(() => {
    if (name === user?.name && job === "") {
      setIsChangeable(false);
    } else {
      setIsChangeable(true);
    }
  }, [name, job, user?.name]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const inputName = e.target.name as "name" | "job";
    const value = e.target.value;

    switch (inputName) {
      case "name":
        setName(value);
        break;

      case "job":
        setJob(value);
        break;

      default:
        break;
    }
  };

  return (
    <PageWrapper>
      <LeftWing className="leftWing">
        <a href="http://localhost:3000/mypage">프로필 설정</a>
        <a>비밀번호 변경</a>
        <a>탈퇴하기</a>
      </LeftWing>
      <RightWing className="rightWing">
        {user && (
          <ProfileSection>
            {user.picture && (
              <div className="profile_img">
                <Image
                  src={user.picture}
                  layout="fill"
                  alt="user profile image"
                />
              </div>
            )}

            <div className="button_cont">
              <GrayButtonBig>업로드</GrayButtonBig>
              <GrayButtonBig>삭제</GrayButtonBig>
            </div>
          </ProfileSection>
        )}

        {user && (
          <InputSection>
            <div className="input_name">이름</div>
            <input
              className="input_item"
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
            ></input>
          </InputSection>
        )}
        <InputSection>
          <div className="input_name">직업</div>
          <input
            className="input_item"
            type="text"
            value={job}
            name="job"
            onChange={handleInputChange}
          ></input>
        </InputSection>
        {/* <div>
            <div>이름</div>
            <br/>직업<div>
          </div></div>
          
          <div>
            <input/> 
            <input/>
            </div> */}

        <Changebutton onClick={onChange} isActive={isChangeAble}>
          변경하기
        </Changebutton>
      </RightWing>
    </PageWrapper>
  );
};

export const getServerSideProps = withPageAuthRequired<MypageProps>({
  async getServerSideProps(context) {
    // Getting user data from Auth0
    const user = getSession(context.req, context.res)?.user;

    // Pass user and page data to render method
    return {
      props: {
        user: user,
      },
    };
  },
});

export default Mypage;

const onChange = () => {
  alert("변경 완료!");
};
const Changebutton = styled.button<{ isActive: boolean }>`
  border-color: gray;
  border-radius: 3px;
  margin-top: 10px;

  color: white;
  width: 90px;
  height: 35px;
  background-color: gray;

  ${(p) =>
    p.isActive === true &&
    css`
      background-color: #3f9df5;
      border-color: #3f9df5;
    `}
`;

const InputSection = styled.div`
  & .input_name {
    display: inline-block;
    margin-right: 20px;
    background-color: #00b496;
    border-radius: 10px;
    width: 80px;
    text-align: center;
    color: white;
  }
  & .input_item {
    display: inline-block;
    margin-left: 10px;
    border: 1px solid black;
    border-radius: 3px;
    width: 280px;
    height: 35px;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 50px;
  margin-left: -150px;
  margin-bottom: 60px;

  & .img_cont {
    width: 120px;
    height: 120px;
    background-color: aqua;
  }

  & .button_cont {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  & > .profile_img {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
  }
`;

const GrayButtonBig = styled.button`
  display: block;
  background-color: #d6d4d4;
  border-radius: 5px;
  border-color: #d6d4d4;
  width: 100px;
  height: 38px;
`;

const NameSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  & > * {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  & > div > div {
    width: 80px;
    height: 20px;
    color: green;
  }

  input {
  }
`;

const PageWrapper = styled.section`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: calc(100vh - 60px);
  overflow: scroll;
  justify-content: stretch;

  & .leftWing {
    flex: 0 0 300px;
  }

  & .rightWing {
    flex: 1 1;
  }
`;

const LeftWing = styled.nav`
  width: 100%;
  height: 100%;
  border-right: 2px solid black;
  padding: 35px;

  display: flex;
  flex-direction: column;
  gap: 30px;

  font-size: 18px;
  font-weight: 700;
`;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 40px 20px;
  font-size: 16px;
  font-weight: 400;
`;

const RightWing = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 30px;
`;

const Button = styled.div`
  border-radius: 20px;
`;
