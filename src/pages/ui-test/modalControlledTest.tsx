import { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import Modal from "../../components/commons/modalEnhanced";

/**
 * 모달 컴포넌트 사용법 안내를 위한 테스트 페이지입니다. 먼저 /ui-test/modalTest를 숙지한 이후 봐주세요
 */

const ModalTestPage: NextPage = () => {
  /**
   * 이전 페이지에서 설명한 대로 스타일링은 가능하지만, modal의 상태를 외부에서 제어하고 싶은 경우가 있을 수 있습니다.
   * 예를 들어, modal이 열리고 닫힘에 따라, 다른 컴포넌트의 상태를 바꿔야 할 경우가 있을 수 있습니다.
   *
   * 이를 위해 외부 상태를 선언하고, <Modal>에게 상태를 주입시킬 수 있습니다.
   * 이 접근 방식은 react의 제어 컴포넌트에 영감을 받았습니다.
   * https://ko.reactjs.org/docs/forms.html#controlled-components
   *
   *  아래를 확인해 주세요
   */

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {/* 여기서 defaultOpen대신 open과 setOpen을 주입하면, modal은 내부 상태를 사용하지 않고, 외부 상태를 자신의 열림/닫힘 상태로 이용합니다 */}
      {/* 모달의 열고 닫힘음 open이 결정하고, open이 바뀌려 할때마다 onChangeOpen이 사용됩니다. 이는 react의 제어 컴포넌트와 같은 개념입니다. */}
      <Modal open={open} onChangeOpen={setOpen}>
        <Modal.Trigger>기본 버튼으로 렌더링!</Modal.Trigger>
        <Modal.Trigger asChild>
          <div>원래는 버튼이지만, aschild로 인해 div로 렌더링!</div>
        </Modal.Trigger>

        <Modal.Trigger>
          <div>만약 aschild가 빠지면 button 안에 div를 렌더링하므로 주의!</div>
        </Modal.Trigger>

        <StyledModalTrigger>보라색 트리거</StyledModalTrigger>

        <Modal.Portal>
          <StyledOverlay>
            <StyledContent>
              내용 <Modal.Close>닫기</Modal.Close>
            </StyledContent>
          </StyledOverlay>
        </Modal.Portal>
      </Modal>

      {/* 이제 모달 바깥에서도 모달의 열림/닫힘 상태를 이용할 수 있습니다 */}
      <div
        style={{
          margin: "20px 0",
          fontSize: 20,
        }}
      >
        모달이 {open ? "열렸어요" : "닫혔어요"}
      </div>
    </>
  );
};

const StyledModalTrigger = styled(Modal.Trigger)`
  background-color: purple;
  color: white;
  display: block;

  font-size: 20px;
`;

const StyledOverlay = styled(Modal.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const StyledContent = styled(Modal.Content)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 200px;
  min-height: 200px;

  background-color: white;
`;

export default ModalTestPage;
