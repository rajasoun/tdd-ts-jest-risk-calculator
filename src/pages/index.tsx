import data from '../data/risk-calculator.json';
import Risk, { ThreatVector } from '../risk';

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

let initialVector = data.initialVector

export const generateThreatVectorJSON = (json: ThreatVector): ThreatVector[] => {
    const vector = initialVector.map(
        obj => obj.id === json.id && obj.name === json.name ? { ...obj, value: json.value } : obj
    );
    initialVector = vector;
    return vector;
}

const Index = () => {

    const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        let json = {
            id: Number(event.target.id),
            name: event.target.name,
            value: Number(event.target.value)
        }
        const risk = generateThreatVectorJSON(json)
        const likelihoodAvg = Risk.calculateAverage(risk.slice(0, 8));
        return likelihoodAvg
    }

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
                                                        id={String(data.id)}
                                                        name={data.name}
                                                        className="form-control"
                                                        style={styleSelect}
                                                        onChange={handleChange}
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
