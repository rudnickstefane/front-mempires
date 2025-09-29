import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

export const Img = styled.img`
    transition: all .3s ease-in-out;
    transform: scale(1.02);
    width: 33px;
    height: 31px;
`;

export const Link = styled(RouterLink)`
    color: var(--colorPrimary);
    text-decoration: none;

    &:hover {
        color: blue;
    }
`;