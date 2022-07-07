import React from 'react';
import styled from 'styled-components';

const Modal = (props?: any) => {
	const {
		open,
		close,
		registerBtnStr,
		registerBtnFunc,
		cancelBtnstr,
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
				</section>
			)}
		</ModalBox>
	);
};

export default Modal;

const ModalBox = styled.div`
	display: none;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 99;
	background-color: var(--modal-background);

	& > .close_btn {
		position: absolute;
		top: 10px;
		right: 15px;
		width: 30px;
		font-size: 21px;
		font-weight: bold;
		padding: 0;
		margin: 0px;
		color: var(--modal-btn-color);
		background-color: transparent;
	}
`;
