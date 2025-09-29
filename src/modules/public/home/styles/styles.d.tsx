import styled from 'styled-components';
import equipament from '../../../../assets/images/equipament.png';
import homeOne from '../../../../assets/images/indexOne.png';
import plansImage from '../../../../assets/images/plans.jpg';

export const Title = styled.h1`
    color: #333;
    font-size: 2em;
    text-align: center;
`;

export const Img = styled.img`
    width: 58px;
    height: 58px;
    transform: skew(18deg);
`;

export const ImgCustomOne = styled.div`
    background: url(${homeOne}) no-repeat center top;
    width: 100%;
    margin-top: 2rem;

    @media (max-width: 768px) {
        margin-top: 10rem;
        background: url(${homeOne}) no-repeat right top;
    }
`;

export const ImgEquipament = styled.div`
    background: url(${equipament}) no-repeat center;
    position: relative;
    width: 335px;
    height: 505px;
    margin-top: -5rem;

    @media (max-width: 768px) {
        background: url(${equipament}) no-repeat center;
    }
`;

export const ImgCustom = styled.img`
    width: 90%;
    border-radius: 5px;
`;

export const BoxPlans = styled.div`
    background: url(${plansImage});
`;