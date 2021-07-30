import Head from 'next/head';

const Index = () => {
    return (
        <>
            <Head>
                <title>OWASP Risk Assessment Calculator v2021</title>
            </Head>
            <h1 data-testid="header">Risk Assessment Calculator</h1>
            <hr />
            <select  data-testid="0">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
        </>
    )
}

export default Index
