import { OmittedPage } from '../../models/page';

import { Card, Image } from 'semantic-ui-react';

import styled from 'styled-components';
import Link from 'next/link';

/**
 * /dashboard 페이지
 * @author ck.min
 * @returns NextPage
 */

interface ProjectPreviewProps {
	project: OmittedPage;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
	return (
		<Link
			href={{
				pathname: `/edit/${project.uuid}`,
			}}
			passHref
		>
			<ProjectContainer>
				<div className='project_img'>
					<Image
						fluid
						label={{
							color: project.share ? 'blue' : 'red',
							corner: 'right',
							icon: project.share ? 'globe' : 'heart',
						}}
						src='/img/projectPreviewImg.png'
						alt='project preview image'
					/>
				</div>
				<div className='project_header'>
					{project.title}
					<button className='menu_btn'>
						<i className='ellipsis horizontal icon' />
					</button>
				</div>
				<div className='project_description'>{project.description}</div>
				<div className='project_hashtags'>
					{project.hashtags.map((h) => (
						<HashTag key={h}>{h}</HashTag>
					))}
				</div>
			</ProjectContainer>
		</Link>
	);
};

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

export default ProjectPreview;
