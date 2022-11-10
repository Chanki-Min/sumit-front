import type { NextPage } from 'next';
import styled, { css } from 'styled-components';
import LoginSection from '../components/main/LoginSection';
import Background_PNG from 'img/mainpage.png';
import Image from 'next/image';

const Home: NextPage = () => {
	return (
		<>
			<MainBackground>
				{/* <Image src='/img/mainpage.png' width={1440} height={4844}/> */}
					<LoginSection/>
			</MainBackground>
		</>
	);
};

export default Home;

const MainBackground = styled.div`
	display: flex;
	background-repeat : no-repeat;
    /* background-size : cover; */
`

const LeftWing = styled.section`
	display: block;
	width: 300px;
	height: calc(100vh - 70px);
	background-color: lightgray;
`;
