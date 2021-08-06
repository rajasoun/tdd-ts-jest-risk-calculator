
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

const Modal = (props: any) => {
    return (
        <>
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
                            <LevelsTable data={props.data.lhAndImpLevel} />
                            <RiskSeverityTable data={props.data.overAllRiskSeverity} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;
