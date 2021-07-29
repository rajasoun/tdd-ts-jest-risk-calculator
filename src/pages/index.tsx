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

interface RiskCalculation {
    likelihoodAvg: string,
    likelihoodLabel: string,
    likelihoodLabelColour: string,
    impactAvg: string,
    impactLabel: string,
    impactLabelColour: string,
    criticality: string,
    criticalityColour: string,
    vector: string
}

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
    margin-top: 4rem;
    text-align: center;
`;

const StyledCriticallityDiv = styled.div`
    margin-top: -6rem;
    float: right;
    text-align: center;
`;

const Styledlabel = styled.div`
    margin: 0 3rem;
    padding: 0.25rem;
    background-color: red;
    font-size: 1.15em;
    font-weight: 700;
    ${({ variant }) => variant && css`
       background-color: ${variant};
   `}
`;

const LabelLayout = (props: any) => {

    const data = props

    return (
        <StyledParentDiv>
            <h1>{data.title}</h1>
            {
                data.avg && (
                    <div>
                        <h3>{data.avg}</h3>
                        <Styledlabel variant={data.color}>{data.label}</Styledlabel>
                    </div>
                )
            }
        </StyledParentDiv>
    )
}

const Home = ({data}: any) => {
    const classes = useStyles();
    const [state, setState] = useState<RiskCalculation>();
    const getData = (childData: RiskCalculation) => setState({...childData})
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
                                        ): 
                                        ele.label == 'Likelihood' ?  
                                        <LabelLayout 
                                            title={ele.label}
                                            avg={state?.likelihoodAvg}
                                            label={state?.likelihoodLabel}
                                            color={state?.likelihoodLabelColour}
                                        /> :
                                        <LabelLayout 
                                            title={ele.label}
                                            avg={state?.impactAvg}
                                            label={state?.impactLabel}
                                            color={state?.impactLabelColour}
                                        />
                                    }
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <StyledCriticallityDiv>
                            <h1>Risk Severity</h1>
                            {
                                state?.criticalityColour && 
                                <Styledlabel variant={state?.criticalityColour}>
                                    {state?.criticality}
                                </Styledlabel>
                            }
                        </StyledCriticallityDiv>
                    </Grid>
                </Grid>
            </Container>
            <Modal vector={state?.vector}/>
        </>
    )
}

export default Home;