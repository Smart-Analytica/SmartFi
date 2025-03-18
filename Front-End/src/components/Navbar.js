import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRefresh = () => {
    navigate('/');
    window.location.reload();
  };

  const navbarColor = getNavbarColor(location.pathname);

  return (
    <StyledNavbar style={{ backgroundColor: navbarColor }}>
      <StyledLink to="/" onClick={handleRefresh}>
        <Logo src={logo} alt="Logo" />
      </StyledLink>

      <StyledExternalLink href=" ">
        <Title style={{ fontSize: windowWidth < 600 ? '0.9rem' : '1rem' }}>
          SMART LABS
        </Title>
      </StyledExternalLink>
    </StyledNavbar>
  );
};

const getNavbarColor = (path) => {
  switch (path) {
    case '/landing1':
      return 'rgba(122, 103, 88, 0.51)';
    default:
      return 'rgba(122, 103, 88, 0.51)';
  }
};

const StyledNavbar = styled.nav`
  position: fixed;
  top: 10px;
  left: 50%;
  height: 8.5%;
  transform: translateX(-50%);
  width: 98%;
  max-width:1500px;
  min-width:320px;
  
  z-index:1000;
  backdrop-filter: blur(10px);
  border-radius:20px;
  box-shadow:0px4px8px rgba(0,0,0,0.1);
  
  display:flex;
  justify-content:space-between;
  align-items:center;
  
  padding:10px20px;
`;

const StyledLink = styled(Link)`
 text-decoration:none;
 color:inherit;
`;

const Title = styled.span`
 font-weight:bold;
 color:#000;
 margin-right:20px;
`;

const StyledExternalLink = styled.a`
 text-decoration:none; /* removes underline */
 color:inherit; /* ensures text inherits color */
 cursor:pointer;

 &:hover {
   opacity:0.8;
 }
`;

const Logo = styled.img`
 height:40px;
 margin-left:-3px;
 margin-top:-3px;
 filter: brightness(0) invert(0);
`;

export default Navbar;
