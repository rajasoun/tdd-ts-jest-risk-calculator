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
    marginLeft: '1rem',
    marginBottom: '0.5rem'
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
let vectorToString = Risk.vectorToString(initialVector);

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
        <div className="text-center" style={{ margin: '30% 0 0 0' }}>
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

const LevelsTable = (props: any) => {
    return (
        <table className="table table-bordered">
            <tbody>
                <tr><th colSpan={2}>Likelihood and Impact Levels</th></tr>
                {
                    props.data.map((ele: any, index: number) => (
                        <tr key={index}>
                            <td>{ele.range}</td>
                            <td style={{
                                backgroundColor: ele.color,
                                color: ele.color == "rgba(255, 0, 0)" ? "white" : ''
                            }}>
                                {ele.label}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

const RiskSeverityTable = (props: any) => {
    return (
        <table className="table table-bordered">
            <tbody>
                <tr><th colSpan={5}>Overall Risk Severity = Likelihood x Impact</th></tr>
                <tr>
                    <td rowSpan={5} className="align-middle"><b>Impact</b></td>
                </tr>
                {props.data.map((ele: any, i: number) => (
                    <tr key={i}>
                        <td>{ele.mainLabel}</td>
                        {ele.lblAndColor.map((e: any, index: number) => (
                            <td
                                key={index}
                                style={{
                                    backgroundColor: e.color,
                                    color: e.color == "rgba(255, 0, 0)" ? "white" : '',
                                    width: '25%'
                                }}
                            >{e.label}</td>
                        ))}
                    </tr>
                ))}
                <tr>
                    <td></td>
                    <td colSpan={4}><b>Likelihood</b></td>
                </tr>
            </tbody>
        </table>
    )
}

const Modal = () => {
    return (
        <div className="modal fade" id="staticBackdrop" data-backdrop="static">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">How is Severity Risk Calculated?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <LevelsTable data={data.lhAndImpLevel} />
                        <RiskSeverityTable data={data.overAllRiskSeverity} />
                    </div>
                </div>
            </div>
        </div>
    )
}
const Index = () => {

    const [likelihood, setLikelihood] = useState({ avg: '', label: '', color: '' });
    const [impact, setImpact] = useState({ avg: '', label: '', color: '' });
    const [criticality, setCriticality] = useState({ label: '', color: '' });

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let json = {
            id: Number(event.target.id),
            name: event.target.name,
            value: Number(event.target.value)
        }
        // Generate Threat Vecor
        const risk = generateThreatVectorJSON(json);
        // Set vector to String
        vectorToString = Risk.vectorToString(risk)

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

    return (
        <>
            <h1
                data-testid="header"
                className="container mx-auto my-3"
            >
                Risk Assessment Calculator
            </h1>
            <hr />
            <div className="container-fluid px-5">
                <div className="row">
                    {
                        data.data.map((ele: any, index: number) => (
                            <div
                                className={"col-sm-4"}
                                key={index}
                            >
                                <div
                                    key={`RAC_${index}`}
                                    className="col-sm-12 mt-1"
                                >
                                    <div style={styleTitle}>
                                        {ele.title}
                                    </div>
                                    {
                                        !ele.label ? ele.select.map((data: Select) => (
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
                                                        {data.options.map(
                                                            (option: Option, i: number) => (
                                                                <option
                                                                    key={`${data.name}__${i}`}
                                                                    value={option.value}
                                                                >
                                                                    {option.name} ({option.value})
                                                                </option>
                                                            ))}
                                                    </select>
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
            <div className="container-fluid">
                <div className="row">
                    <div className="offset-sm-8 col-sm-4" style={{ position: 'absolute', top: '4%', left: '-1.5%' }}>
                        <div className="text-center">
                            <h3>RISK SEVERITY</h3>
                            <label className="text-uppercase px-4 py-1"
                                style={
                                    {
                                        backgroundColor: criticality.color,
                                        position: 'absolute',
                                        top: '3%',
                                        right: criticality.label === 'undefined'? '9%' : '16%'
                                    }
                                }
                            >
                                <b>{criticality.label}</b>
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-12 text-center pt-3">
                        <label>
                            VECTOR:
                            <a href="#" target="_blank" data-testid="anchorTag">
                                {vectorToString}
                            </a>
                        </label>
                    </div>
                    <div className="col-sm-12 text-center" style={{ position: 'fixed', top: '9%',textAlignLast: 'end',right: '11%'}}>
                        <a href="#staticBackdrop" data-toggle="modal" data-target="#staticBackdrop" >
                            How is Severity Risk Calculated?
                        </a>
                    </div>
                    <Modal />
                </div>
            </div>
        </>
    )
}

export default Index
