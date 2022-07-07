import {
	getSession,
	UserProfile,
	withPageAuthRequired,
} from '@auth0/nextjs-auth0';

import { OmittedPage, transformPageToOmittedPage } from '../models/page';
import ProjectPreview from '../components/commons/projectPreview';

import Link from 'next/link';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';
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
		<Grid rows='3' columns={2}>
			{pages.map((page) => (
				<ProjectPreview key={page.uuid} project={page} />
			))}
			<AddNewProject>
				<Link href={'/edit/test_page'} passHref>
					<button className='add_btn'>
						<i className='plus icon' />
					</button>
				</Link>
				<div className='add_title'>새로운 페이지 시작하기</div>
			</AddNewProject>
		</Grid>
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

const AddNewProject = styled.div`
	width: 500px;
	height: 350px;
	margin: 5% 0 0 6%;
	// border: 1px solid black;

	& > .add_btn {
		width: 100%;
		height: 65%;
		border: 2px solid gray;

		&:hover {
			color: teal;
			border: 2px solid teal;
			background-color: lightblue;
		}
	}

	& > .add_title {
		margin-top: 4%;
		font-size: 20px;
		font-weight: 700;
		text-align: center;
	}
`;
