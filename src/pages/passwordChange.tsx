import {
  getSession,
  UserProfile,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";



const PasswordChange = () => {
 
    const [cur_pw, setCur_PW] = useState<string | undefined>("");
    const [new_pw, setNew_pw] = useState<string | undefined>("");
    const [new_pwcheck, setNew_pwcheck] = useState<string | undefined>("");
  
    const [isChangeAble, setIsChangeable] = useState(false);

      useEffect(() => {
        if (cur_pw !== "" && new_pw !== "" && new_pwcheck !== "") {
          setIsChangeable(true);
        } else {
          setIsChangeable(false);
        }
      }, [cur_pw, new_pw, new_pwcheck]);

  
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();



    const inputpw = e.target.name as "cur_pw" | "new_pw" | "new_pwcheck";
    const value = e.target.value;

    switch (inputpw) {
      case "cur_pw":
        setCur_PW(value);
        break;

      case "new_pw":
        setNew_pw(value);
        break;
          
      case "new_pwcheck":
        setNew_pwcheck(value);

      default:
        break;
    }
  }

  const hasError = passwordEntered =>{
    const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const pw = $("#new_pw").val();
    // new_pw.length < 8 ? true : false; //비밀번호는 최소 8자리(n자리)
   
    if(false === reg.test(pw)) {
      alert('비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.');
      }else {
      console.log("통과");
      } 
  }


  const hasNotSameError = passwordEntered =>{
    new_pw != new_pwcheck ? true : false;    
  }

  
 
    return (
        <PageWrapper>
            <LeftWing className="leftWing">
                <a href="http://localhost:3000/mypage">프로필 설정</a>
                <a href="http://localhost:3000/passwordChange">비밀번호 변경</a>
            </LeftWing>
            <RightWing className="rightWing">
                <InputSection>
                    <div className="input_name">지금 pw</div>
                    <input
                        className="input_item"
                        type="text"
                        name="cur_pw"
                        value={cur_pw}
                        onChange={handleInputChange}
                        placeholder="내용을 입력해주세요."
                    ></input>
                </InputSection>
                <InputSection>
                    <div className="input_name">새 pw</div>
                    <input
                        className="input_item"
                        type="text"
                        value={new_pw}
                        name="new_pw"
                        placeholder="내용을 입력해주세요."
                        onChange={handleInputChange}
                    ></input>
                    
                    {/* <span>비밀번호는 최소 n자리, 특수문자는 1자를 포함해야 합니다.</span> */}
                </InputSection>
                <InputSection>
                    <div className="input_name">새 pw 확인</div>
                    <input
                        className="input_item"
                        type="text"
                        value={new_pwcheck}
                        name="new_pwcheck"
                        error={hasNotSameError('new_pwcheck')}
                        placeholder="내용을 입력해주세요."
                        onChange={handleInputChange}
                        helperText={
                          hasNotSameError('new_pwcheck') ? "비밀번호가 일치하지 않습니다." : null
                      }
                    ></input>
                    {/* <div>비밀번호가 일치하지 않습니다.</div> */}
                </InputSection>
                <Changebutton
                    onClick={onChange} isActive={isChangeAble}>
                    변경하기
                </Changebutton>
            </RightWing>
        </PageWrapper>
    );
};



// export const getServerSideProps = withPageAuthRequired<MypageProps>({
//   async getServerSideProps(context) {
//     // Getting user data from Auth0
//     const user = getSession(context.req, context.res)?.user;

//     // Pass user and page data to render method
//     return {
//       props: {
//         user: user,
//       },
//     };
//   },
// });

export default PasswordChange;



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


  & #chooseFile {
    display:none;
  }
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