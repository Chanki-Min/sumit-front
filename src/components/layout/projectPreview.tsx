import {
	getSession,
	UserProfile,
	withPageAuthRequired,
} from '@auth0/nextjs-auth0';
import fetchPages from '../../api/fetchPage';
import { Page, PagePartial, OmittedPage } from '../../models/page';

import { Card, Grid, Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';

import styled from 'styled-components';

/**
 * /dashboard 페이지
 * @author ck.min
 * @returns NextPage
 */

const ProjectPreview = (project: OmittedPage) => {
	// const { uuid, title, description, hashtags, share } = project;
	if (!Array.isArray(project)) {
		return <></>;
	}

	return (
		<div key={project.uuid}>
			<div className='ui fluid image'>
				{project.share == true ? (
					<a className='ui blue right corner label'>
						<i className='globe icon'></i>
					</a>
				) : (
					<a className='ui red right corner label'>
						<i className='globe slash icon'></i>
					</a>
				)}
				<img src='https://user-images.githubusercontent.com/62105312/168966757-11dfb781-44c6-4261-a247-cf5b968e5e90.png' />
			</div>
			<Card.Content href={`/edit/${project.uuid}`} passHref>
				<Card.Header>{project.title}</Card.Header>
				<Card.Description>{project.description}</Card.Description>
				{project.hashtags.map((h) => (
					<HashTag key={h}>{h}</HashTag>
				))}
			</Card.Content>
		</div>
	);
};

const HashTag = styled.div`
	height: 20px;
	margin: 2px;
	margin-radius: 10px;
	background-color: lightblue;
	border: none;
`;

export default ProjectPreview;
