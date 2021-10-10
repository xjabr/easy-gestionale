import styled from 'styled-components';

export const NewPageWrapper = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 999;
`;

export const NewPageWrapperCopy = styled.div`
	position: fixed;
	width: 95%;
	max-height: 95%;
	top: 50%;
	left: 50%;
	background: #fff;
	transform: translate(-50%, -50%);
	border-radius: 2px;
	box-shadow: 0px 0px 200px #0008;
	padding: 20px;
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