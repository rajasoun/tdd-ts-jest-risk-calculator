import React, { useState, useEffect } from 'react';
import data from '../data/risk-calculator.json';
import Risk, { ThreatVector } from '../risk';
import LCC from 'lightning-container';
import Modal from '../component/risk-calculation-modal';

interface Option {
    name: string,
    value: number
}

interface Select {
    description: string,
    name: string,
    id: number,
    options: Array<Option>,
}

// Styles for element begins
const styleTitle = {
    fontSize: "1.2rem",
    fontWeight: 600,
    marginLeft: '1rem',
    marginBottom: '0.5rem'
}

const styleSelectLabel = {
    margin: '0rem 1rem',
    width: '100%'
}

const styleSelect = {
    margin: '0.75rem 1rem',
    width: '100%'
}

// Styles for element ends

let initialVector = data.initialVector
let vectorToString = Risk.vectorToString(initialVector);
let risk: any;
const optionsState: any = [] ;

export const generateThreatVectorJSON = (json: ThreatVector): ThreatVector[] => {
    const vector = initialVector.map(
        obj => obj.id === json.id && obj.name === json.name ? { ...obj, value: json.value } : obj
    );
    initialVector = vector;
    return vector;
}

const LabelLayout = (props: any) => {
    const data = props.data
    return (
        <div className="text-center">
            <h3 className="text-uppercase">{props.title}</h3>
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

const Index = (props: any) => {
    const [likelihood, setLikelihood] = useState({ avg: '', label: '', color: '' });
    const [impact, setImpact] = useState({ avg: '', label: '', color: '' });
    const [criticality, setCriticality] = useState({ label: '', color: '' });
    const [defaultOptions, setDefaultOptions]: any = useState({
        "SL": "", "M": "", "O": "", "S": "", "ED": "", "EE": "", "A": "", "ID": "", "LC": "", "LI": "", "LAC": "", "LAV": "", "FD": "", "RD": "", "NC": "", "PV": ""
    })

    const CalculateRisk = (riskCalculatorLabel: string, riskData: any) => {
        /* istanbul ignore else */
        if (riskCalculatorLabel === 'vectorToString') {
            vectorToString = Risk.vectorToString(riskData)
        } else {
            risk = Risk.stringToVector(riskData)
            initialVector = risk;
            vectorToString = Risk.vectorToString(risk);
        }

        optionsState.push(risk.slice(0, 4));
        optionsState.push(risk.slice(4, 8));
        optionsState.push("");
        optionsState.push(risk.slice(8, 12));
        optionsState.push(risk.slice(12, 16));
        optionsState.push("");

        // Likelihood
        const lhAvg = Risk.calculateAverage(risk.slice(0, 8));
        const lhLabel = Risk.rate(Number(lhAvg));
        const lhColor = Risk.colour(lhLabel);
        setLikelihood({ avg: lhAvg, label: lhLabel, color: lhColor });

        // Impact
        const impAvg = Risk.calculateAverage(risk.slice(8, 16));
        const impLabel = Risk.rate(Number(impAvg));
        const impColor = Risk.colour(impLabel);
        setImpact({ avg: impAvg, label: impLabel, color: impColor });

        // Criticality Label
        const criticalityLabel = Risk.criticality(lhLabel, impLabel);
        const criticalityColor = Risk.colour(criticalityLabel);
        setCriticality({ label: criticalityLabel, color: criticalityColor });
    }


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        setDefaultOptions({
            ...defaultOptions,
            [name]: value
        })

        let json = {
            id: Number(event.target.id),
            name: event.target.name,
            value: Number(event.target.value)
        }
        // Generate Threat Vecor
        risk = generateThreatVectorJSON(json);

        CalculateRisk("vectorToString", risk)
    }

    useEffect(() => {
        /* istanbul ignore next */
        LCC.addMessageHandler(function (message) {
            console.log(message);
            if (message.value === "save") {
                LCC.sendMessage(vectorToString);
            } else {
                console.log("message.value !== save", message.value);
                CalculateRisk("stringToVector", message.value)
            }
        });
    }, [])


    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-8">
                        <h1
                            data-testid="header"
                            className="container text-center mt-2 mb-0"
                        >
                            Risk Assessment Calculator
                        </h1>
                    </div>
                    <div className="col-sm-4 mt-2">
                        <h3 className="container text-center mt-3 mb-0">RISK SEVERITY</h3>
                    </div>
                </div>
                <hr />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 offset-md-8 text-center" style={{ marginTop: '-0.5rem' }}>
                        <div className="my-0">
                            <a href="#staticBackdrop" data-toggle="modal" data-target="#staticBackdrop">
                                How is Severity Risk Calculated?
                            </a>
                        </div>
                        <div>
                            <label className="text-uppercase px-4 py-1 mx-3 my-2"
                                style={
                                    {
                                        backgroundColor: criticality.color,
                                    }
                                }
                            >
                                <b>{criticality.label}</b>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
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
                                    className={(ele.label === "Likelihood" || ele.label === "Impact") ? "position-relative" : ""}
                                    style={{ top: '50%' }}
                                >
                                    <div style={styleTitle}>
                                        {ele.title}
                                    </div>
                                    {
                                        !ele.label ? ele.select.map((data: Select, ind: number) => (
                                            <div key={data.id}>
                                                <div className="form">
                                                    <div>
                                                        <label
                                                            style={styleSelectLabel}
                                                            className="checkbox-inline"
                                                        >
                                                            {data.description}
                                                        </label>
                                                        <select
                                                            data-testid={data.id}
                                                            id={String(data.id)}
                                                            name={data.name}
                                                            className="form-control"
                                                            style={styleSelect}
                                                            onChange={handleChange}
                                                            value={(risk != undefined && optionsState[index] != undefined && data.name === optionsState[index][ind].name && defaultOptions[data.name] == '') ? optionsState[index][ind].value : defaultOptions[data.name]}
                                                        // defaultValue={defaultOptions}
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
                                            </div>
                                        )) : ele.label === 'Likelihood' ?
                                            <LabelLayout
                                                title={ele.label}
                                                data={likelihood}
                                            /> :
                                            <LabelLayout
                                                title={ele.label}
                                                data={impact}
                                            />
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 text-center pt-0">
                        <label>
                            VECTOR:
                            <a href="#" target="_blank" data-testid="anchorTag" className="col">
                                {vectorToString}
                            </a>
                        </label>
                    </div>
                    <Modal data={data} />
                </div>
            </div>
        </div>
    )
}

export default Index
