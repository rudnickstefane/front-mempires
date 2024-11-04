import { Button as ButtonLink } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const Img = styled.img`
    transition: all .3s ease-in-out;
    transform: scale(1.02);
    width: 33px;
    height: 31px;
`;

export const ButtonHeader = styled(ButtonLink)`
    color: var(--colorPrimary) !important;
    margin: 0 10px !important;
    font-weight: normal !important;

    &:hover {
        color: blue;
        background-color: #40576d11 !important;
    }
`;