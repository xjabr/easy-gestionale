import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// logo
import LogoLAZWEB from '../../media/logo.png';

const WrapperNavbar = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: row;
  background: #7189ED;
  padding: 20px 30px;
  align-items: center;

  .navbar-item {
    &.logo {
      img {
        width: 200px;
      }
    }

    &.logo-text {
      a {
        font-weight: bold;
        font-size: 22px;
        color: #fff!important;
        text-decoration: none;
        margin-left: 20px
      }

      margin-right: auto;
    }

    .navbar-menu {
      margin: 0;
      padding: 0;

      li {
        display: inline-block;

        a {
          color: #fff;
          font-size: 18px;
          text-decoration: none;
          padding: 0 15px;

          &.text-bold {
            font-weight: bold;
          }
        }
      }
    }
  }
`;

const Navbar = ({ isAuth = false }) => {
	return (
    <WrapperNavbar>
      <div className="navbar-item logo"><a href="http://www.lnzweb.it/" target="_blank"><img src={LogoLAZWEB} alt="Logo LAZWEB"/></a></div>
      <div className="navbar-item logo-text"><NavLink to="/">LAZWEB GESTIONALE</NavLink></div>
      <div className="navbar-item">
        <ul className="navbar-menu">
          { isAuth ?
          <>
            <li><NavLink to="/">Account</NavLink></li>
            <li><NavLink to="/">Disconnetti</NavLink></li>
          </>
          : 
          <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/">Accedi</NavLink></li>
            <li><NavLink to="/" className="text-bold">Registrati GRATIS!</NavLink></li>
          </>
          }
        </ul>
      </div>
    </WrapperNavbar>
	)
}

export default Navbar;