import {
	getSession,
	UserProfile,
	withPageAuthRequired,
} from '@auth0/nextjs-auth0';
import fetchPages from '../api/fetchPage';
import { Page } from '../models/page';

import { Card, Grid, Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';

import styled from 'styled-components';

interface DashboardProps {
	user?: UserProfile;
	pages: Omit<Page, 'slides'>[];
}
/**
 * /dashboard 페이지
 * @author ck.min
 * @returns NextPage
 */
const Dashboard = ({ user, pages }: DashboardProps) => {
	if (!Array.isArray(pages) || !user) {
		return <></>;
	}

	return (
		<Grid>
			<Grid.Row columns='3' stretched>
				{pages.map((page) => (
					<Card key={page.uuid}>
						<div className='ui fluid image'>
							{page.share == true ? (
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
						<Card.Content href={`/edit/${page.uuid}`} passHref>
							<Card.Header>{page.title}</Card.Header>
							<Card.Description>{page.description}</Card.Description>
							{page.hashtags.map((h) => (
								<HashTag key={h}>{h}</HashTag>
							))}
						</Card.Content>
					</Card>
				))}
				{/* <Link href={`/dashboard`} passHref> */}
				<Card>
					<Icon name='plus' />
					<Card.Content>
						<Card.Header>새로운 페이지 시작하기</Card.Header>
					</Card.Content>
				</Card>
			</Grid.Row>
		</Grid>
	);
};

const HashTag = styled.div`
	height: 20px;
	margin: 2px;
	background-color: aquamarine;
	border: none;
`;

export const getServerSideProps = withPageAuthRequired<DashboardProps>({
	async getServerSideProps(context) {
		// Getting user data from Auth0
		const user = getSession(context.req, context.res)?.user;
		const pages = await fetchPages({ withSlides: false });

		// Pass user and page data to render method
		return {
			props: {
				user: user,
				pages: pages,
			},
		};
	},
});

export default Dashboard;
