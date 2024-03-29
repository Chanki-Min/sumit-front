import { useUser } from '@auth0/nextjs-auth0';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import Image from 'next/image';

const LoginSection: React.FC = () => {

	const { user, isLoading } = useUser();

	const isPC = useMediaQuery({ minWidth: 768 });

	if (isLoading) {
		return(
		<Container></Container>)
	}

	if (typeof user === 'undefined') {
		return (
			
			<Container>
				
				<h1>로그인하고 sumit을 시작해보세요!</h1>
				<BtnBox>
					<Link href={'/api/auth/login'} passHref>
						<Button animated='fade' className='btn'>
							<Button.Content visible>Sumit에 처음 오셨나요?</Button.Content>
							<Button.Content hidden>Go to Login</Button.Content>
						</Button>
					</Link>
					<Link href={'/search'} passHref>
						<Button animated='fade' className='btn'>
							<Button.Content visible>페이지 구경하기</Button.Content>
							<Button.Content hidden>Go to My SearchPage</Button.Content>
						</Button>
					</Link>
				</BtnBox>
			</Container>
		);
	}

	return (
		<Container>
			<h1>환영합니다, {user.name}님!</h1>
			<BtnBox>
				<Link href={'/dashboard'} passHref>
					<Button animated='fade' className='btn'>
						<Button.Content visible>페이지를 한번 만들어볼까요?</Button.Content>
						<Button.Content hidden>Go to My Dashboard</Button.Content>
					</Button>
				</Link>
				<Link href={'/search'} passHref>
					<Button animated='fade' className='btn'>
						<Button.Content visible>페이지 구경하기</Button.Content>
						<Button.Content hidden>Go to Search</Button.Content>
					</Button>
				</Link>
			</BtnBox>
		</Container>
	);
};

export default LoginSection;



const Container = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	/* background-color: rgb(255, 255, 255); */

	/* margin-top: 200px; */
	
	& > h1 {
		font-size: 52px;
		font-weight: 600;
	}
`;

const BtnBox = styled.div`
	display: flex;

	& > .btn {
		height: 40px;
		margin: 10px 10px 10px 10px;
		line-height: 15px;
		background-color: rgba(112, 112, 112, 0.7);
		color: white;

		&:hover {
			height: 40px;
			background-color: rgba(0, 0, 0, 0.7);
			color: white;
		}
	}
`;
