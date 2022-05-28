import {
	getSession,
	UserProfile,
	withPageAuthRequired,
} from '@auth0/nextjs-auth0';
import fetchPages from '../api/fetchPage';
import { Page, PagePartial, OmittedPage } from '../models/page';
import ProjectPreview from '../components/layout/projectPreview';

import { Card, Grid, Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';

import styled from 'styled-components';

interface DashboardProps {
	user?: UserProfile;
	// pages: Omit<Page, 'slides'>[];
	pages: OmittedPage[];
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
			<Grid columns='4'>
				{pages.map((page) => {
					// <ProjectPreview {...page} />;
					<ProjectPreview page={page} />;
					// <ProjectPreview
					// 	uuid={page.uuid}
					// 	title={page.title}
					// 	description={page.description}
					// 	hashtags={page.hashtags}
					// 	share={page.share}
					// />;
					// console.log(page);
				})}
				<Card>
					<Icon name='plus' />
					<Card.Content>
						<Card.Header>새로운 페이지 시작하기</Card.Header>
					</Card.Content>
				</Card>
			</Grid>
		</Grid>
	);
};

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
