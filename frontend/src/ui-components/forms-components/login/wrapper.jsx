import React from 'react';
import styled from 'styled-components';

const WrapperMain = styled.div`
  position: fixed;
  z-index: 0;
  width: 100%;
  height: calc(100% - 95px);
  background: #8FA4F8;
  left: 0; right: 0; bottom: 0;
`;

const WrapperTringle = styled.div`
  clip-path: polygon(100% 0%, 0% 100%, 100% 100%);
  background: #7189ED;
  opacity: 0.5;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
`;

const WrapperAuth = ({ children }) => {
	return (
    <WrapperMain>
      { children }
      <WrapperTringle></WrapperTringle>
    </WrapperMain>
	)
}

export default WrapperAuth;