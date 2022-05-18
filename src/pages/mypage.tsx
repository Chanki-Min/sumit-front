import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import styled from "styled-components";

const Mypage: React.FC = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <Container>
      </Container>
    );
  }

  return (
    <PageWrapper>
      <LeftWing className="leftWing">
        <a>프로필 설정</a>
        <a>비밀번호 변경</a>
        <a>탈퇴하기</a>
      </LeftWing>
      <RightWing className="rightWing">
        <ProfileSection><div className="img_cont"></div>
          <div className="button_cont"><GrayButtonBig>업로드</GrayButtonBig><GrayButtonBig>삭제</GrayButtonBig></div></ProfileSection>
        <NameSection><div><div>이름</div>직업<div>
          </div></div>
          
          <div>
            <input/>
            <input/>
            </div></NameSection>
      </RightWing>
    </PageWrapper>



  );
};


export default Mypage;

const ProfileSection = styled.div`
  display: flex;
  gap: 20px;
  & .img_cont {
    width: 120px;
    height: 120px;
    background-color: aqua;
  }

  & .button_cont {
    display: flex;
    flex-direction: column;
    justify-content:  space-between;
    align-items: center;

  }
`

const GrayButtonBig = styled.button`
    display: block;
      background-color: gray;
      width: 100px;
      height: 38px;
`

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
`



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
`

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
  
`

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
  padding:30px;
`

const Button = styled.div`

`;
