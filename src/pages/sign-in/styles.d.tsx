import { Button as ButtonLink } from '@mui/material';
import styled from 'styled-components';

export const Title = styled.h1`
    color: #333;
    font-size: 2em;
    text-align: center;
`;

export const SignInUp = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const ButtonCustom = styled(ButtonLink)`
    color: var(--colorPrimary) !important;
    margin: 0 10px !important;

    &:hover {
        color: blue;
        background-color: #40576d11 !important;
    }
`;