import data from '../data/risk-calculator.json';

interface Option {
    name: string,
    value: number
}

interface Select {
    description: string,
    name: string,
    id: number,
    options: Array<Option>
}

// Styles for element begins
const styleTitle = {
    fontSize: "1.2rem",
    fontWeight: 600,
    margin: '1rem'
}

const styleSelectLabel = {
    margin: '0rem 1rem',
    minWidth: 400
}

const styleSelect = {
    margin: '0.75rem 1rem',
    minWidth: 400
}
// Styles for element ends

const Index = () => {
    return (
        <>
            <h1
                data-testid="header"
                className="text-center my-3"
            >
                Risk Assessment Calculator
            </h1>
            <hr />
            <div className="container-fluid">
                <div className="row">
                    {
                        data.data.map((ele: any, index: number) => (
                            <div
                                className={"col-sm-4"}
                                key={index}
                            >
                                <div
                                    key={`RAC_${index}`}
                                    className="col-sm-12"
                                >
                                    <div style={styleTitle}>
                                        {ele.title}
                                    </div>
                                    {
                                        ele.select.map((data: Select) => (
                                            <div key={data.id}>
                                                <div className="form-group">
                                                    <label style={styleSelectLabel}>
                                                        {data.description}
                                                    </label>
                                                    <select
                                                        data-testid={data.id}
                                                        name={data.name}
                                                        className="form-control"
                                                        style={styleSelect}
                                                        >
                                                        {
                                                            data.options.map(
                                                                (option: Option, i: number) => (
                                                                <option
                                                                    key={`${data.name}__${i}`}
                                                                    value={option.value}
                                                                >
                                                                    {option.name} ({option.value})
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Index