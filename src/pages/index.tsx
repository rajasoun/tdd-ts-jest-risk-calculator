import Head from 'next/head';
import { GetStaticProps } from 'next';
import styled, { css } from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import SelectDropDown from '../component/select';  
import Modal from '../component/calculator-modal';
import data from '../data/risk-calculator.json';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        formControl: {
            margin: '0.75rem 1rem',
            minWidth: 400
        },
    }),
);

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            data: data,
        }
    }
}

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
    margin: 1rem; 
`;

const StyledParentDiv = styled.div`
    margin-top: 8rem;
    text-align: center;
`;

const variantSeverity : any = {
    medium: {
        backgroundColor: "rgb(144, 238, 144)",
        color: "#000"
    },
    low: {
        backgroundColor: "rgb(255, 255, 0)",
        color: "#000"
    },
    high: {
        backgroundColor: "rgb(255, 169, 0)",
        color: "#000"
    },
    critical: {
        backgroundColor: "rgb(255, 0, 0)",
        color: "#fff"
    }
};

const Styledlabel = styled.div`
    margin: 0 3rem;
    padding: 0.25rem;
    background-color: red;
    font-size: 1.15em;
    font-weight: 700;
    ${({ variant }) => variant && variantSeverity[variant] && css`
       background-color: ${variantSeverity[variant].backgroundColor};
       color: ${variantSeverity[variant].color};
   `}
`;

const LabelLayout = (props: any) => {
    return (
        <StyledParentDiv>
            <h1>Likelihood</h1>
            <h3>{props.score}</h3>
            <Styledlabel variant='critical'>Low</Styledlabel>
        </StyledParentDiv>
    )
}

const Home = ({data}: any) => {
    const classes = useStyles();
    const [childPropsData, getChildPropsData] = useState('')
    const getData = (val: any) => {
        getChildPropsData(val)
    }
    return (
        <>
            <Head>
                <title>OWASP Risk Assessment Calculator v2021</title>
            </Head>
            <Title>
                Risk Assessment Calculator
            </Title>
            <HorizontalLine />
            <Container maxWidth="lg">
                <Grid container className={classes.root}>
                    {
                        data.data.map((ele: any, index: number) => {
                            return (
                                <Grid item xs={ele.gridSize} key={index}>
                                    <StyleDiv>{ele.title}</StyleDiv>
                                    { !ele.label ? 
                                        ele.select.map(
                                            (data: any, i: number) => (
                                                <div key={i}>
                                                    <FormControl 
                                                        variant="outlined" 
                                                        className={classes.formControl} 
                                                    >
                                                        <SelectDropDown {...data} sendData={getData}/>
                                                    </FormControl>
                                                </div>   
                                            )
                                        ): <LabelLayout score={childPropsData}/> 
                                    }
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
            <Modal />
        </>
    )
}

export default Home;