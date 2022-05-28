import { OmittedPage } from "../../models/page";

import { Card } from "semantic-ui-react";

import styled from "styled-components";

/**
 * /dashboard 페이지
 * @author ck.min
 * @returns NextPage
 */

interface ProjectPreviewProps {
  project: OmittedPage;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
  // const { uuid, title, description, hashtags, share } = project;

  //CK.MIN project는 array가 아닙니다.
  //   if (!Array.isArray(project)) {
  //     return <></>;
  //   }

  console.log(project);

  return (
    <ProjectContainer
    // key={project.uuid} CK.MIN: loop 를 통해 생성되지 않는 경우 key 속성은 넣지 않아야 예측 가능한 상태 업데이트를 받을 수 있습니다.
    >
      <div className="ui fluid image">
        {project.share == true ? (
          <a className="ui blue right corner label">
            <i className="globe icon"></i>
          </a>
        ) : (
          <a className="ui red right corner label">
            <i className="globe slash icon"></i>
          </a>
        )}
        <img src="https://user-images.githubusercontent.com/62105312/168966757-11dfb781-44c6-4261-a247-cf5b968e5e90.png" />
      </div>
      <Card.Content href={`/edit/${project.uuid}`} passHref>
        <Card.Header>{project.title}</Card.Header>
        <Card.Description>{project.description}</Card.Description>
        {project.hashtags.map((h) => (
          <HashTag key={h}>{h}</HashTag>
        ))}
      </Card.Content>
    </ProjectContainer>
  );
};

const ProjectContainer = styled.div``;

const HashTag = styled.div`
  height: 20px;
  margin: 2px;
  margin-radius: 10px;
  background-color: lightblue;
  border: none;
`;

export default ProjectPreview;
