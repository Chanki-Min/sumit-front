import { Button, Dropdown, Menu } from "semantic-ui-react";
import styled from "styled-components";

interface Props {
  leftBarVisible: boolean;
  setLeftBarVisible: (b: boolean) => void;
  rightBarVisible: boolean;
  setRightBarvisible: (b: boolean) => void;
}

const MenuBar: React.FC<Props> = ({
  leftBarVisible,
  setLeftBarVisible,
  rightBarVisible,
  setRightBarvisible,
}) => {
  return (
    <Container>
      <Menu>
        <TranparentButton
          icon={leftBarVisible ? "angle double left" : "angle double right"}
          onClick={() => setLeftBarVisible(!leftBarVisible)}
        />
        {/* 
        <Dropdown text="프로젝트" pointing className="link item">
          <Dropdown.Menu>
            <Dropdown.Item>저장하기</Dropdown.Item>
            <Dropdown.Item>실행 취소</Dropdown.Item>
            <Dropdown.Item>다시 실행</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Dropdown text="내보내기">
                <Dropdown.Menu>
                  <Dropdown.Header>파일 포멧</Dropdown.Header>
                  <Dropdown.Item>HTML</Dropdown.Item>
                  <Dropdown.Item>Markdown</Dropdown.Item>
                  <Dropdown.Item>Pdf</Dropdown.Item>
                  <Dropdown.Item>Raw</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown text="편집" pointing className="link item"></Dropdown>
        <Dropdown text="도움말" pointing className="link item"></Dropdown> */}

        <Menu.Menu position="right">
          <TranparentButton
            icon={rightBarVisible ? "angle double right" : "angle double left"}
            onClick={() => setRightBarvisible(!rightBarVisible)}
          />
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

const Container = styled.nav`
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
`;

const TranparentButton = styled(Button)`
  background-color: transparent !important;
  border-radius: 0px !important;
`;

export default MenuBar;
