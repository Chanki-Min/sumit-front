import { OmittedPage } from '../../models/page';

import { Card, Image } from 'semantic-ui-react';

import styled from 'styled-components';

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

	console.log(project);

	return (
		<ProjectContainer>
			<div className='project_img'>
				<Image
					fluid
					label={{
						color: project.share ? 'blue' : 'red',
						corner: 'right',
						icon: project.share ? 'globe' : 'heart',
					}}
					src='/img/mountain.png'
					alt='project preview image'
				/>
			</div>
			<div className='project_header'>
				{project.title}
				<i className='ellipsis horizontal icon' />
			</div>
			<div className=''></div>
			<Card.Content>
				<Card.Description>{project.description}</Card.Description>
				{project.hashtags.map((h) => (
					<HashTag key={h}>{h}</HashTag>
				))}
			</Card.Content>
		</ProjectContainer>
	);
};

const ProjectContainer = styled.div`
	width: 500px;
	height: 350px;
	margin: 5% 0 0 6%;
	// border: 1px solid black;

	& > .project_img {
		height: 220px;
		overflow: hidden;
		border: 1px solid black;
	}

	& > .project_header {
		margin-top: 2%;
		font-size: 20px;
		font-weight: 700;
	}
`;

const HashTag = styled.button`
	height: 25px;
	margin: 1%;
	border-radius: 30px;
	background-color: lightblue;
	border: none;
`;

export default ProjectPreview;
