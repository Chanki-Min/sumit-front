import { OmittedPage } from "../../models/page";

import {
  Button,
  Dropdown,
  Image,
  Form,
  Input,
  TextArea,
} from "semantic-ui-react";

import styled from "styled-components";
import Link from "next/link";
import Modal from "./modalEnhanced";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import axios from "axios";

/**
 * /dashboard 페이지
 * @author ck.min
 * @returns NextPage
 */

interface ProjectPreviewProps {
  project: OmittedPage;
  viewOnly?: boolean;
}

type ModalKey = "share" | "name" | "delete";

const getModalContent = (key: ModalKey, project: OmittedPage) => {
  if (key === "name") {
    return <NameModal project={project} />;
  }

  if (key === "delete") {
    return <DeleteModal project={project} />;
  }

  return null;
};

const DeleteModal = ({ project }: { project: OmittedPage }) => {
  const { uuid, title } = project;

  const handleDelete = async () => {
    await axios.delete(`/api/pages/${uuid}`);
    location.reload();
  };

  return (
    <ModalWrapper>
      <h3>삭제</h3>
      <p>{`${title} 페이지를 삭제하시겠어요?`}</p>
      <Modal.Close asChild>
        <Button floated="right" onClick={handleDelete}>
          삭제
        </Button>
      </Modal.Close>
      <Modal.Close asChild>
        <Button floated="right">취소</Button>
      </Modal.Close>
    </ModalWrapper>
  );
};

const NameModal = ({ project }: { project: OmittedPage }) => {
  const { title, description } = project;

  const [dto, setDto] = useState({
    title,
    description,
  });

  const [toggle, setToggle] = useState(false);
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setDto({
      ...dto,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async () => {
    await axios.put(`/api/pages/${project.uuid}`, dto);
    location.reload();
  };

  return (
    <ModalWrapper>
      <Form>
        <h3>이름 변경</h3>
        <Form.Group inline>
          <label className="modal_title">제목</label>
          <Input
            focus
            className="modal_input"
            placeholder={title}
            onChange={handleChange}
            style={{ width: "400px" }}
          />
        </Form.Group>
        <Form.Group inline>
          <label className="modal_title">설명</label>
          <TextArea
            focus
            className="modal_input"
            placeholder={description}
            onChange={handleChange}
            style={{ width: "400px" }}
          />
        </Form.Group>
        <Form.Group inline>
          <label className="modal_title">공개 설정</label>
          <Button size="tiny" onClick={clickedToggle}>
            {!toggle ? (
              <p style={{ color: "red" }}>비공개</p>
            ) : (
              <p style={{ color: "teal" }}>공개</p>
            )}
          </Button>
          {/* <ToggleBtn onClick={clickedToggle}/>
					<p>Toggle Switch {!toggle ? 'OFF' : 'ON'}</p> */}
        </Form.Group>
        <Modal.Close asChild>
          <Button floated="right" onClick={handleSubmit}>
            저장
          </Button>
        </Modal.Close>
      </Form>
    </ModalWrapper>
  );
};

const ProjectPreview: React.FC<ProjectPreviewProps> = ({
  project,
  viewOnly,
}) => {
  const options = [
    // { key: "share", text: "공유 및 도메인 설정" }, TODO: 구현하기
    { key: "name", text: "이름 변경" },
    { key: "delete", text: "삭제" },
  ] as const;

  return (
    <ProjectContainer>
      <Link
        href={{
          pathname: `/edit/${project.uuid}`,
        }}
        passHref
      >
        <div className="project_img">
          <Image
            fluid
            // label={{
            // 	color: project.share ? 'blue' : 'red',
            // 	corner: 'right',
            // 	icon: project.share ? 'globe' : 'heart',
            // }}
            src="/img/projectPreviewImg.png"
            alt="project preview image"
          />
        </div>
      </Link>
      <div className="project_header">
        <Link
          href={{
            pathname: `/edit/${project.uuid}`,
          }}
          passHref
        >
          {project.title}
        </Link>
        <Dropdown className="menu_btn" icon="ellipsis horizontal icon">
          <Dropdown.Menu>
            {options.map((option) => (
              <Modal key={option.key}>
                <Modal.Trigger asChild>
                  <Dropdown.Item key={option.key} text={option.text} />
                </Modal.Trigger>
                <Modal.Portal>
                  <DimmedOverlay>
                    <CenteredModal
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {getModalContent(option.key, project)}
                    </CenteredModal>
                  </DimmedOverlay>
                </Modal.Portal>
              </Modal>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="project_description">{project.description}</div>
      <div className="project_hashtags">
        {project.hashtags?.map((h) => (
          <HashTag key={h}>{h}</HashTag>
        ))}
      </div>
    </ProjectContainer>
  );
};

export default ProjectPreview;

const ModalWrapper = styled.div``;

const DimmedOverlay = styled(Modal.Overlay)`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;

const CenteredModal = styled(Modal.Content)`
  position: fixed;
  background-color: pink;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  width: 500px;
  height: auto;
  padding: 15px 15px 15px 15px;
  border-radius: 10px;
`;

const ProjectContainer = styled.div`
  width: 500px;
  height: 350px;
  margin: 5% 0 0 6%;
  // border: 1px solid black;
  & > .project_img {
    height: 65%;
    overflow: hidden;
    border: 1px solid gray;
    border-radius: 10px;
  }

  & > .project_header {
    margin: 10px 0 0 8px;
    font-size: 20px;
    font-weight: 700;
    // border: 1px solid black;

    & > .menu_btn {
      margin: 0 8px 0 0;
      border: none;
      float: right;
      background-color: transparent;
    }
  }

  & > .project_description {
    margin: 3% 0 3% 0;
    font-size: 15px;
  }

  & > .project_hashtags {
    // border: 1px solid black;
  }
`;

const HashTag = styled.button`
  height: 25px;
  margin: 0 1% 0 0;
  border-radius: 30px;
  background-color: lightblue;
  border: none;
`;
