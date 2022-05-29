import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';
import { Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';

const Header: React.FC = (props) => {
	const { user } = useUser();

	const options = [
		{ key: 'home', text: '홈으로 가기', link: '/home' },
		{ key: 'mypage', text: '마이페이지', link: '/mypage' },
		{ key: 'dashboard', text: '대시보드', link: '/dashboard' },
		{ key: 'logout', text: '로그아웃하기', link: '/api/auth/logout' },
	];

	return (
		<>
			<Navigation>
				<Link href={'/'} passHref>
					<LogoBox>
						<Image src='/img/mountain.png' alt='logo' width={40} height={40} />
						sumit
					</LogoBox>
				</Link>
				{user && (
					<Profile>
						{user.picture && (
							<div className='profile_img'>
								<Image
									src={user.picture}
									layout='fill'
									alt='user profile image'
								/>
							</div>
						)}
						<Dropdown trigger={user.name}>
							<Dropdown.Menu>
								{options.map((option) => (
									<Dropdown.Item
										key={option.key}
										text={option.text}
										href={option.link}
									/>
								))}
							</Dropdown.Menu>
						</Dropdown>
					</Profile>
				)}
			</Navigation>
		</>
	);
};

export default Header;

const Navigation = styled.nav`
	box-sizing: border-box;
	padding: 5px 20px;
	width: 100%;
	height: 70px;

	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: rgb(171, 214, 243);
`;

const LogoBox = styled.button`
	box-sizing: border-box;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	gap: 8px;

	font-size: 30px;
	font-weight: 700;

	background-color: transparent;
	border: none;

	&:hover {
		color: teal;
	}
`;

const Profile = styled.a`
	display: flex;
	align-items: center;
	margin-right: 50px;
	font-size: 18px;

	& > .profile_img {
		position: relative;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 10px;
	}
`;
