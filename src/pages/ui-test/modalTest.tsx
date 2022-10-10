import { NextPage } from "next";
import styled from "styled-components";
import Modal from "../../components/commons/modalEnhanced";

/**
 * 모달 컴포넌트 사용법 안내를 위한 테스트 페이지입니다.
 *
 */

const ModalTestPage: NextPage = () => {
  return (
    <>
      {/* 
    기본 형태는 아래와 같습니다
      <Modal>
        <Modal.Trigger>열기</Modal.Trigger>
        <Modal.Portal>
          <Modal.Overlay>
            <Modal.Content>
              내용 <Modal.Close>닫기</Modal.Close>
            </Modal.Content>
          </Modal.Overlay>
        </Modal.Portal>
      </Modal>
    */}

      <Modal defaultOpen={false}>
        {/* 각 엘리먼트 <Modal.Trigger 등에 있는 asChild 속성을 명시하면 해당 엘리먼트을 직계 자식으로 대치하고, 엘리먼트의 모든 속성을 직계 자식에게 위임합니다. */}
        <Modal.Trigger>기본 버튼으로 렌더링!</Modal.Trigger>
        <Modal.Trigger asChild>
          <div>원래는 버튼이지만, aschild로 인해 div로 렌더링!</div>
        </Modal.Trigger>

        <Modal.Trigger>
          <div>만약 aschild가 빠지면 button 안에 div를 렌더링하므로 주의!</div>
        </Modal.Trigger>

        {/* 각 엘리먼트는 CSS-in-JS (스타일드-컴포넌트 등)으로 자유롭게 스타일링 할 수 있습니다. 의도적으로 스타일링은 하지 않았으니 자유롭게 스타일링 하세요 */}
        {/* 즉, 스타일링을 하기 위해서는  button 자체를 유지하고 스타일링 하거나, asChild를 통해 새로운 스타일링된 자식을 도입하는 2가지의 방법이 있습니다. */}
        <StyledModalTrigger>보라색 트리거</StyledModalTrigger>

        {/* Portal은 자기 자식을 react 세계 외부의 dom으로 portal합니다. 즉, portal 아래의 영역이 모달로서 렌더링됩니다 */}
        <Modal.Portal>
          {/* Overlay는 Content를 감싸는 영역입니다. 이것을 스타일링하여 dim처리를 하면 됩니다. 예시를 위해 스타일링 했습니다 */}
          <StyledOverlay>
            {/* Content는 모달 자체입니다. 이것을 스타일링하며 가운데 정렬을 하면 됩니다*/}
            <StyledContent>
              내용 <Modal.Close>닫기</Modal.Close>
            </StyledContent>
          </StyledOverlay>
        </Modal.Portal>
      </Modal>
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
