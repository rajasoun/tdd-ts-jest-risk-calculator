import { useState } from 'react';
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

const LabelLayout = (props: any) => {
    const data = props

    return (
        <div className="text-center mt-5 pt-2">
            <h3 className="text-uppercase">{data.title}</h3>
            {
                data.avg && (
                    <div>
                        <h4 className="my-2">{data.avg}</h4>
                        <label className="text-uppercase px-4 py-1"
                            style={{ backgroundColor: data.color }}
                        >
                            <b>{data.label}</b>
                        </label>
                    </div>
                )
            }
        </div>
    )
}

const Index = () => {

    const [likelihoodAvg, setLikelihoodAvg] = useState('');
    const [impactAvg, setImpactAvg] = useState('');
    const [likelihoodLabel, setLikelihoodLabel] = useState('');
    const [impactLabel, setImpactLabel] = useState('');
    const [likelihoodLabelColor, setLikelihoodLabelColor] = useState('');
    const [impactLabelColor, setImpactLabelColor] = useState('');

    const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        let json = {
            id: Number(event.target.id),
            name: event.target.name,
            value: Number(event.target.value)
        }
        // Generate Threat Vecor
        const risk = generateThreatVectorJSON(json);
        // Likelihood Average Score
        const likelihoodAvgScore = Risk.calculateAverage(risk.slice(0, 8));
        setLikelihoodAvg(likelihoodAvgScore);
         // Impact Average Score
        const impactAvgScore = Risk.calculateAverage(risk.slice(8, 16));
        setImpactAvg(impactAvgScore);
         // Likelihood Label
        const likelihoodLabelValue = Risk.rate(Number(likelihoodAvgScore))
        setLikelihoodLabel(likelihoodLabelValue)
         // Impact Label
        const impactLabelValue = Risk.rate(Number(impactAvgScore))
        setImpactLabel(impactLabelValue)
        // Likelihood Color
        const likelihoodLabelColorCode = Risk.colour(likelihoodLabelValue);
        setLikelihoodLabelColor(likelihoodLabelColorCode)
        // Impact Color
        const impactLabelColorCode = Risk.colour(impactLabelValue);
        setImpactLabelColor(impactLabelColorCode)

        return likelihoodAvgScore
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
                                        !ele.label?
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
                                        : ele.label === 'Likelihood' ?
                                        <LabelLayout
                                            title={ele.label}
                                            avg={likelihoodAvg}
                                            label={likelihoodLabel}
                                            color={likelihoodLabelColor}
                                        />
                                        :
                                        <LabelLayout
                                            title={ele.label}
                                            avg={impactAvg}
                                            label={impactLabel}
                                            color={impactLabelColor}
                                        />
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
