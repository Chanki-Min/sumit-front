import React, { useState } from 'react';
import {
	getSession,
	UserProfile,
	withPageAuthRequired,
} from '@auth0/nextjs-auth0';

import Modal from '../components/commons/modal';
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
	//   console.log(pages, user);

	const [openDeletePage, setOpenDeletePage] = useState<boolean>(false);

	const openDeletePageModal = () => {
		setOpenDeletePage(true);
		console.log('페이지 삭제 모달이 열렸습니다.');
	};
	const closeDeletePageModal = () => {
		setOpenDeletePage(false);
		console.log('페이지 삭제 모달이 닫혔습니다.');
	};
	const onDeletePage = () => {
		// page를 삭제하는 api call
		window.location.assign('/dashboard');
		console.log('페이지가 삭제되었습니다.');
	};

	if (!Array.isArray(pages) || !user) {
		return <></>;
	}

	return (
		<>
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
				<button onClick={openDeletePageModal}>페이지 삭제하기</button>
			</Grid>
			<Modal
				open={openDeletePage}
				close={closeDeletePageModal}
				registerBtnStr='예'
				registerBtnFunc={onDeletePage}
				cancelBtnStr='아니오'
				cancelBtnFunc={closeDeletePageModal}
				header='페이지 삭제'
				info='정말로 페이지를 삭제하시겠습니까?
							'
			/>
		</>
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
			background-color: #a7bed9;
		}
	}

	& > .add_title {
		margin-top: 4%;
		font-size: 20px;
		font-weight: 700;
		text-align: center;
	}
`;
