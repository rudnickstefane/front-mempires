import styled from 'styled-components';
import backgroundImage from '../../assets/images/header.jpg';
import sectionTitle from '../../assets/images/section-title.svg';

export const Title = styled.h1`
    color: #333;
    font-size: 2em;
    text-align: center;
`;

export const ContentHeader = styled.div`
display: flex;
height: 34rem;
background: #08041b;
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
    height: 34rem;
`;

export const ContentImage = styled.div`
    background: url(${backgroundImage}) left/cover no-repeat;
    width: 100%;
    background-position-x: -10rem;
`;

export const GradientOverlay = styled.div`
    background: linear-gradient(270deg, #08041b, #08041b, transparent, transparent);
    width: 100%;
    height: 100%;
`;

export const PromoText = styled.div`
    margin-bottom: 1.5rem;

    .highlight {
        font-size: 2rem;
        font-weight: bold;
        color: #ffcc00; /* Cor destacada para chamar atenção */
    }

    .large {
        font-size: 3rem;
        font-weight: bold;
        display: block;
        margin-top: 0.5rem;
    }

    .small {
        font-size: 1.2rem;
        display: block;
        margin-top: 1rem;
    }
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