import styled from 'styled-components';

export const NewPageWrapper = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 50%;
	left: 50%;
	background: #0004;
	transform: translate(-50%, -50%);
	z-index: 999;
`;

export const NewPageWrapperCopy = styled.div`
	position: fixed;
	width: 80%;
	max-height: 90%;
	top: 50%;
	left: 50%;
	background: #fff;
	border: 1px solid #000;
	transform: translate(-50%, -50%);
	border-radius: 16px;
	box-shadow: 5px 5px 20px #0003;
	padding: 40px;
	z-index: 9999;
	overflow: auto;
`;

export const WrapperDashboard = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom: 0;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
`;

export const WrapperPages = styled.div`
	flex: 0 0 80%;
	max-width: 80%;
	height: 100%;
	background: #fff;
	padding: 20px;
	position: relative;
	overflow: auto;
`;

export const BottomPreview = styled.p`
	font-size: 14px;
	font-weight: bold;
	color: #666;
	margin-top: 6px;
	margin-bottom: 0;
`;