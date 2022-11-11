import type { NextPage } from 'next';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import Footer from '../components/commons/Footer';
import { useMediaQuery } from 'react-responsive';
import Header from '../components/main/Header';
// import LoginSection from '../components/main/LoginSection';
import Login_Intro from '../components/main/Login_Intro';
// import '../font/fontStyle.css';

const Home: NextPage = () => {

	const isPC = useMediaQuery({ minWidth: 768 });

	return (
		<>
			<Header isPC={isPC} />
			<Login_Intro isPC={isPC} />
			<Image src='/img/Info-1.svg' alt='logo' width={2000} height={930} />
			<Image src='/img/Info-2.svg' alt='logo' width={2000} height={930} />
			{/* <video autoplay src='/img/Info-2.mp4' width={1440} height={930} loop="" autoplay=""/> */}
			<Image src='/img/Info-3.svg' alt='logo' width={2000} height={930} />
			<Image src='/img/Info-4.svg' alt='logo' width={2000} height={930} />
			<Footer />
		</>
	);
};

export default Home;

const MainBackground = styled.div`
	display: flex;
	background-repeat : no-repeat;
    /* background-size : cover; */
`
