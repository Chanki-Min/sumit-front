import { useUser } from "@auth0/nextjs-auth0";
import { renderToHTML } from "next/dist/server/render";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState} from "react";
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
            
          <div className="button_cont"><GrayButtonBig>업로드</GrayButtonBig><GrayButtonBig>삭제</GrayButtonBig></div>
              </ProfileSection>
         
        )}


        { user && (
        <InputSection>
          <div className="input_name">이름</div>
          <input className="input_item" type="text" value={user.name} ></input>
        </InputSection>
        )}
        <InputSection>
          <div className="input_name">직업</div>
          <input className="input_item"></input>
        </InputSection>
          {/* <div>
            <div>이름</div>
            <br/>직업<div>
          </div></div>
          
          <div>
            <input/> 
            <input/>
            </div> */}

         <Changebutton onClick={onChange}>변경하기</Changebutton>
            

      </RightWing>
    </PageWrapper>
    );
  
};



export default Mypage; 

const onChange = () => {
	alert('변경 완료!');
};

const Changebutton = styled.button`
    background-color: #3f9df5;
    border-color:#3f9df5;
    border-radius:3px;
    margin-top:10px;
    
    color:white;
    width: 90px;
    height: 35px;

    /* & .activebtn {
      background-color: gray;
    }

    & .unactivebtn {
      background-color: #3f9df5;
    } */
`

const InputSection = styled.div`
  & .input_name {
    display: inline-block;
    margin-right:20px;
    background-color: #00b496;
    border-radius:10px;   
    width : 80px;
    text-align: center;
    color : white;

  }
  & .input_item {
    display: inline-block;
    margin-left: 10px;
    border: 1px solid black;
    border-radius:3px;    
    width: 280px;
    height: 35px;
  }
`

const ProfileSection = styled.div`
  display: flex;
  gap: 50px;
  margin-left:-150px;
  margin-bottom:60px;
  
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

  & > .profile_img {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
  }
`

const GrayButtonBig = styled.button`
      display: block;
      background-color: #d6d4d4;
      border-radius: 5px;
      border-color:#d6d4d4;
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
 border-radius: 20px;
`;
