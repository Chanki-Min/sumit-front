import {
	getSession,
	UserProfile,
	withPageAuthRequired,
} from '@auth0/nextjs-auth0';

import { OmittedPage, transformPageToOmittedPage } from '../models/page';
import ProjectPreview from '../components/commons/projectPreview';

import { Card, Grid, Icon } from 'semantic-ui-react';
import { fetchPages } from '../api/page/fetchPage';

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

	//   console.log(pages, user);

	return (
		// <Grid>
		<Grid rows='3' columns={2}>
			{pages.map((page) => (
				<ProjectPreview key={page.uuid} project={page} />
			))}

			<div style={{ height: '350px', width: '500px', margin: '5% 0 0 6%' }}>
				<Card>
					<Icon name='plus' />
					<Card.Content>
						<Card.Header>새로운 페이지 시작하기</Card.Header>
					</Card.Content>
				</Card>
				<button>페이지 삭제하기</button>
			</div>
		</Grid>
		// </Grid>
	);
};

export const getServerSideProps = withPageAuthRequired<DashboardProps>({
	async getServerSideProps(context) {
		// Getting user data from Auth0
		const user = getSession(context.req, context.res)?.user;
		const pages = await fetchPages(false);

		// Pass user and page data to render method
		return {
			props: {
				user: user,
				pages: pages.map(transformPageToOmittedPage),
			},
		};
	},
});

export default Dashboard;
