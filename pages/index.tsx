import Head from 'next/head';
import styled, { css } from 'styled-components';
import SelectDropDown from '../component/select';

const Title = styled.div`
    font-size: 2.2rem;
    font-weight: 800;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const HorizontalLine = styled.hr`
    width: 98%;
    border: 1px solid rgb(220, 220, 220);
`; 

const StyleDiv = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 20px;
    margin-left: 30px   
`;
const Home = (props: any) => {
    return (
        <>
            <Head>
                <title>OWASP Risk Assessment Calculator v2021</title>
            </Head>
            <Title>
                Risk Assessment Calculator
            </Title>
            <HorizontalLine />
            <StyleDiv>Thread Agent Factor</StyleDiv>
            <SelectDropDown props={props}/>
        </>
    )
}

export default Home;