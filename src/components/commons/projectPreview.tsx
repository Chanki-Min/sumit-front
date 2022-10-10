import { OmittedPage } from "../../models/page";

import { Button, Dropdown, Image } from "semantic-ui-react";

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
    <>
      <h1>{`${title} 페이지를 삭제하시겠어요?`}</h1>

      <Modal.Close asChild>
        <button>취소</button>
      </Modal.Close>
      <Modal.Close asChild>
        <button onClick={handleDelete}>삭제</button>
      </Modal.Close>
    </>
  );
};

const NameModal = ({ project }: { project: OmittedPage }) => {
  const { title, description } = project;

  const [dto, setDto] = useState({
    title,
    description,
  });

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
    <>
      <h1>이름 변경</h1>

      <ul>
        <li>
          <h2>제목</h2>
          <input
            name="title"
            placeholder={title}
            type="text"
            onChange={handleChange}
          ></input>
        </li>
        <li>
          <h2>설명</h2>
          <textarea
            name="description"
            placeholder={description}
            onChange={handleChange}
          />
        </li>
      </ul>
      <Modal.Close asChild>
        <button onClick={handleSubmit}>저장</button>
      </Modal.Close>
    </>
  );
};

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
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
            label={{
              color: project.share ? "blue" : "red",
              corner: "right",
              icon: project.share ? "globe" : "heart",
            }}
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
  background-color: white;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
`;

const ProjectContainer = styled.div`
  width: 500px;
  height: 350px;
  margin: 5% 0 0 6%;
  // border: 1px solid black;

  & > .project_img {
    height: 65%;
    overflow: hidden;
    border: 2px solid gray;
  }

  & > .project_header {
    margin-top: 2%;
    font-size: 20px;
    font-weight: 700;
    // border: 1px solid black;

    & > .menu_btn {
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
