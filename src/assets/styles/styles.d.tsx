import styled from 'styled-components';
import sectionTitle from '../images/section-title.svg';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const Destaque = styled.div`
    background: white;
    position: absolute;
    width: 70%;
    padding: 2rem;
    top: 33rem;
    right: 3rem;
`;

export const DestaqueTitle = styled.div`
    font-size: 14px;
    color: #fff;
    position: relative;
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

export const GradientHeaderEnd = styled.div`
    width: 100%;
    background: linear-gradient(0deg, #fff, #fff, #08041b);
    height: 20rem;
`;