import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../layout/Header';
import { useMediaQuery } from 'react-responsive';

const Layout: React.FC<PropsWithChildren> = (props) => {
	const { user } = useUser();
	const isPC = useMediaQuery({ minWidth: 768 });

	return (
		<>
			<Header/>
			<LayoutContent>{props.children} </LayoutContent>
		</>
	);
};

export default Layout;

const LayoutContent = styled.section`
	/* position: relative; */
	width: 100%;
	/* margin-top: 60px; */
	/* padding: 0.05px; // to disable margin collapsing */
	height: calc(100% - 70px);
	border: none;
`;
