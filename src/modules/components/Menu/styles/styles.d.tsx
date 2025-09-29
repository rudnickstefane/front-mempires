import { Box, Button as ButtonLink } from '@mui/material';
import sectionTitle from '@sr/assets/images/section-title.svg';
import backgroundShape from '@sr/assets/images/shape.png';
import backgroundImage from '@sr/modules/assets/images/back-header.png';
import { Link as RouterLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideUp = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
`;

export const DropdownMenu = styled.div<{ isOpen: boolean }>`
  animation: ${({ isOpen }) => (isOpen ? slideDown : slideUp)} 0.3s ease-in-out forwards;
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};

  &.standard-menu {
    width: 300px;
    transform: none;
    left: 0;
    display: block;
  }
`;

export const SubMenu = styled(Box)<{ isOpen: boolean; positionAbove?: boolean }>`
  top: ${(props) => (props.positionAbove ? 'auto' : '0')};
  bottom: ${(props) => (props.positionAbove ? '0' : 'auto')};
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  left: 102%;
  animation: ${({ isOpen }) => (isOpen ? slideDown : slideUp)} 0.3s ease-in-out forwards;
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
`;

export const ContentHeader = styled.div`
display: flex;
height: 39rem;
background: #08041b;
`;

export const ContentImage = styled.div`
    background: url(${backgroundImage}) left/cover no-repeat;
    width: 100%;
`;

export const GradientOverlay = styled.div`
    background: linear-gradient(270deg, #08041b, #08041b, transparent, transparent);
    width: 100%;
    height: 100%;
`;

export const TextContainer = styled.div`
color: white;
    max-width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    right: 3rem;
    top: 10rem;

h2 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
}
`;

export const Destaque = styled.div`
    font-size: 14px;
    color: #fff;
    position: relative;
    line-height: 28px;
    display: inline-block;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 20px;
    text-align: center;
    padding: 0 40px;
    letter-spacing: .1em;
    -webkit-mask-image: url(${sectionTitle});
    -webkit-mask-image: url(${sectionTitle});
    mask-image: url(${sectionTitle});
    -webkit-mask-size: 100%;
    mask-size: 100%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    mask-position: center center;
    height: 46px;
    line-height: 3.4;
`;

export const Shape = styled.div`
    margin-top: 20rem;
    background: url(${backgroundShape}) no-repeat center bottom;
    width: 100%;
    height: 214px;
    position: absolute;
`;

export const GradientTopHeader = styled.div`
    background: linear-gradient(180deg, #08041b, transparent);
    position: absolute;
    width: 100%;
    height: 7rem;
`;

export const GradientBottomHeader = styled.div`
    background: linear-gradient(0deg, #08041b, transparent);
    position: absolute;
    width: 100%;
    height: 39rem;
`;

export const Img = styled.img`
    transition: all .3s ease-in-out;
    width: 60px;
`;

export const Link = styled(RouterLink)`
    color: var(--colorPrimary);
    text-decoration: none;

    &:hover {
        color: blue;
    }
`;

export const Button = styled(ButtonLink)`
    color: var(--white) !important;
    margin: 0 10px !important;

    &:hover {
        color: blue;
        background-color: #40576d11 !important;
    }
`;

export const PromoText = styled.div`
    margin-bottom: 1.5rem;
`;

export const PromoButton = styled.a`
    display: inline-block;
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
    font-weight: bold;
    color: white;
    background-color: #383f85;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2e347a;
    }
`;