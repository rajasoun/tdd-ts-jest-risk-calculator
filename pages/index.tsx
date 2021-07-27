import Head from 'next/head';
import styled, { css } from 'styled-components';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import SelectDropDown from '../component/select';   
import { GetStaticProps } from 'next';
import data from '../data/risk-calculator.json';

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

const Home = ({data}: any) => {

    const classes = useStyles();

    return (
        <>
            <Head>
                <title>OWASP Risk Assessment Calculator v2021</title>
            </Head>
            <Title>
                Risk Assessment Calculator
            </Title>
            <HorizontalLine />
            <Grid container className={classes.root} >
            {
                data.data.map((ele: any, index: number) => {
                    return (
                        <Grid item xs={6} key={index}>
                            <StyleDiv>{ele.title}</StyleDiv>
                            {
                                ele.select.map((data: any, i: number) => (
                                    <Grid item xs={12} key={`custom_select${i}`}>
                                        <FormControl 
                                            variant="outlined" 
                                            className={classes.formControl} 
                                        >
                                            <SelectDropDown {...data} />
                                        </FormControl>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    )
                })
            }
            </Grid>
        </>
    )
}

export default Home;