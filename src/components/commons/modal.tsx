import React from 'react';
import styled from 'styled-components';

const Modal = (props?: any) => {
	const {
		open,
		close,
		registerBtnStr,
		registerBtnFunc,
		cancelBtnStr,
		cancelBtnFunc,
		header,
		info,
	} = props;

	return (
		<ModalBox className={open ? 'openModal modal' : 'modal'}>
			{open && (
				<section>
					<header>
						{header}
						<button
							className='close_btn default_btn'
							onClick={close}
							type='button'
						>
							&times;
						</button>
					</header>
					<main>{info}</main>
					<footer>
						<button
							className='register_btn default_btn'
							onClick={registerBtnFunc}
							type='button'
						>
							{registerBtnStr}
						</button>
						{cancelBtnStr && (
							<button
								className='cancel_btn default_btn'
								onClick={cancelBtnFunc}
								type='button'
							>
								{cancelBtnStr}
							</button>
						)}
					</footer>
				</section>
			)}
		</ModalBox>
	);
};

export default Modal;

const ModalBox = styled.div`
	// background-color: rgba(0, 0, 0, 0.2);
	border: 1px solid black;

	& > .modal {
		display: none;
		overflow: auto;
	}

	& > .openModal {
		display: flex;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		overflow: hidden;
	}

	& > section {
		max-width: 500px;
		height: 150px;
		margin: auto;
		border: 2px solid #89aacd;
		border-radius: 0.7rem;
		background-color: #c5d4e6;

		& > header {
			position: relative;
			padding: 10px 15px;
			background-color: #89aacd;
			font-weight: bold;

			& > .close_btn {
				position: absolute;
				top: 7px;
				right: 15px;
				width: 30px;
				font-size: 20px;
				font-weight: bold;
				padding: 0;
				margin: 0px;
				background-color: transparent;
				border: none;

				&:hover {
					color: teal;
					background-color: transparent;
				}
			}
		}

		& > main {
			padding: 16px;
			font-size: 0.9rem;
			font-weight: 500;
		}

		& > footer {
			float: right;

			& > button {
				padding: 6px 12px;
				margin: 10px 5px;
				background-color: #89aacd;
				border: 1px solid gray;
				border-radius: 0.8rem;
				font-size: 13px;

				&:hover {
					outline: none;
					cursor: pointer;
					background-color: #6a96c0;
				}
			}
		}
	}
`;
