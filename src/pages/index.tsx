import Head from 'next/head';
import { GetStaticProps } from 'next'
import data from '../data/risk-calculator.json';

export const getStaticProps: GetStaticProps = async () => ({ props: { data } })

const Index = ({ data }: any) => {
    return (
        <>
            <Head>
                <title>OWASP Risk Assessment Calculator v2021</title>
            </Head>
            <h1 data-testid="header">Risk Assessment Calculator</h1>
            <hr />
            {
                data.data.map((ele: any, index: number) => (
                    <div key={`RAC_${index}`}>
                    {
                        ele.select.map((data: any) => (
                            <select key={data.id} data-testid={data.id} name={data.name}>
                                {
                                    data.options.map((option: any, i: any) => (
                                        <option
                                            key={`${data.name}__${i}`}
                                            value={option.value}
                                        >
                                            {option.name}
                                        </option>
                                    ))
                                }
                            </select>
                        ))
                    }
                    </div>
                ))
            }
        </>
    )
}

export default Index
