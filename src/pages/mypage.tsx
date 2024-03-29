import {
	getSession,
	UserProfile,
	useUser,
	withPageAuthRequired,
} from '@auth0/nextjs-auth0';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

interface MypageProps {
	user?: UserProfile;
}

const Mypage: React.FC<MypageProps> = ({ user }) => {
	const [name, setName] = useState<string | undefined>(user?.name ?? '');
	const [job, setJob] = useState<string | undefined>('');

	const [isChangeAble, setIsChangeable] = useState(false);

	useEffect(() => {
		if (name === user?.name && job === '') {
			setIsChangeable(false);
		} else {
			setIsChangeable(true);
		}
	}, [name, job, user?.name]);

	const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		e.stopPropagation();

		const inputName = e.target.name as 'name' | 'job';
		const value = e.target.value;

		switch (inputName) {
			case 'name':
				setName(value);
				break;

			case 'job':
				setJob(value);
				break;

			default:
				break;
		}
	};

	const [imgFile, setImgFile] = useState<string | ArrayBuffer>(null);
	const [formData, setFormData] = useState<FormData>();
	const fileInput = useRef(null);

	const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const reader = new FileReader();
		const file = fileInput.current.files[0];

		const formData = new FormData();
		formData.append('file', file);
		setFormData(formData);

		reader.readAsDataURL(file);

		reader.onload = () => {
			setImgFile(reader.result);
		};
	};

	const handleRemoveImage = () => {
		setImgFile(null);
		setFormData(undefined);
	};

	const submitProfileImage = async () => {
		let uploadRes;
		if (typeof formData !== 'undefined') {
			uploadRes = await axios.post<{ Location: string }>(
				'/api/uploadImage',
				formData
			);
		}

		const auth0Res = await axios.patch('/api/me', {
			picture: uploadRes ? uploadRes.data.Location : undefined,
			nickname: name,
			user_metadata: {
				job: job,
			},
		});

		await axios.get('/api/auth/me');

		alert('변경 완료!');
	};

	return (
		<PageWrapper>
			<RightWing className='rightWing'>
				{user && (
					<ProfileSection>
						{user.picture && (
							<div className='profile_img'>
								<Image
									src={imgFile ? imgFile.toString() : user.picture}
									layout='fill'
									alt='user profile image'
								/>
							</div>
						)}

						<div className='button_cont'>
							<GrayButtonBig>
								<label htmlFor='chooseFile'>사진 추가</label>
							</GrayButtonBig>
							<input
								type='file'
								id='chooseFile'
								name='chooseFile'
								accept='image/*'
								style={{ display: 'none' }}
								ref={fileInput}
								onChange={handleImageChange}
							/>
							<GrayButtonBig onClick={handleRemoveImage}>초기화</GrayButtonBig>
						</div>
					</ProfileSection>
				)}

				{user && (
					<InputSection>
						<div className='input_name'>이름</div>
						<input
							className='input_item'
							type='text'
							name='name'
							value={name}
							onChange={handleInputChange}
						></input>
					</InputSection>
				)}
				<InputSection>
					<div className='input_name'>직업</div>
					<input
						className='input_item'
						type='text'
						value={job}
						name='job'
						onChange={handleInputChange}
					></input>
				</InputSection>
				<Changebutton onClick={submitProfileImage} isActive={isChangeAble}>
					변경하기
				</Changebutton>
			</RightWing>
		</PageWrapper>
	);
};

export const getServerSideProps = withPageAuthRequired<MypageProps>({
	async getServerSideProps(context) {
		// Getting user data from Auth0
		const user = getSession(context.req, context.res)?.user;

		// Pass user and page data to render method
		return {
			props: {
				user: user,
			},
		};
	},
});

export default Mypage;

const Changebutton = styled.button<{ isActive: boolean }>`
	border-color: gray;
	border-radius: 5px;
	margin-top: 10px;

	color: #000000;
	width: 90px;
	height: 35px;
	background-color: gray;

	${(p) =>
		p.isActive === true &&
		css`
			background-color: rgb(167, 199, 247);
			border-color: rgb(182, 211, 255);
		`}
`;

const InputSection = styled.div`
	& .input_name {
		display: inline-block;
		margin-right: 20px;
		background-color: #00b496;
		border-radius: 10px;
		width: 80px;
		height: px;
		text-align: center;
		color: white;
	}
	& .input_item {
		display: inline-block;
		margin-left: 10px;
		border: 1px solid black;
		border-radius: 3px;
		width: 280px;
		height: 35px;
	}
`;

const ProfileSection = styled.div`
	display: flex;
	gap: 50px;

	& .img_cont {
		width: 120px;
		height: 120px;
		background-color: #00ffff;
	}

	& .button_cont {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	& > .profile_img {
		position: relative;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;
	}
`;

const GrayButtonBig = styled.button`
	display: block;
	background-color: #d6d4d4;
	border-radius: 5px;
	border-color: #d6d4d4;
	width: 100px;
	height: 38px;

	& #chooseFile {
		display: none;
	}
`;

const NameSection = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;

	& > * {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	& > div > div {
		width: 80px;
		height: 20px;
		color: rgb(49, 216, 166);
	}

	input {
	}
`;

const PageWrapper = styled.section`
	display: flex;
	flex-direction: row;

	width: 100%;
	height: calc(100vh - 60px);
	overflow: scroll;
	justify-content: stretch;
	background-color: rgba(255, 255, 255, 0.2);

	& .leftWing {
		flex: 0 0 300px;
	}

	& .rightWing {
		flex: 1 1;
	}
`;


const Container = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 40px 20px;
	font-size: 16px;
	font-weight: 400;
`;

const RightWing = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 30px;
	padding: 30px;
`;

const Button = styled.div`
	border-radius: 20px;
`;
