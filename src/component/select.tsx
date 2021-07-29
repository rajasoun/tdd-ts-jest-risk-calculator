import React, { useEffect, useState, useRef } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Risk from '../risk';

const SelectDropDown = (props: any) => {
    
    // Remove all storages at the beginning
    useEffect(() => {
        if (localStorage.getItem("vector")) localStorage.removeItem("vector")
    }, [])

    const [dropDownData, setDropDownData] = useState('');

    const handleChange = (
        event:  React.ChangeEvent<{ name?: string | undefined; value: any; }>
    ) => {
        setDropDownData(event.target.value as any)
        if (typeof window != "undefined" && !localStorage.getItem("vector")){
            localStorage.setItem("vector", JSON.stringify(
                [
                    {id: "TAF_SL", name: "SL", value: 1}, 
                    {id: "TAF_M", name: "M", value: 1}, 
                    {id: "TAF_O", name: "O",value: 0}, 
                    {id: "TAF_S", name: "S", value: 2},
                    {id: "VF_ED", name: "ED", value: 1},
                    {id: "VF_EE", name: "EE", value: 1},
                    {id: "VF_A", name: "A", value: 1},
                    {id: "VF_ID", name: "ID", value: 2},
                    {id: "TMF_LC", name: "LC", value: 2}, 
                    {id: "TMF_LI", name: "LI", value: 1}, 
                    {id: "TMF_LAV", name: "LAV", value: 1}, 
                    {id: "TMF_LAC", name: "LAC", value: 1},
                    {id: "BIF_FD", name: "FD", value: 1},
                    {id: "BIF_RD", name: "RD", value: 1},
                    {id: "BIF_NC", name: "NC", value: 2},
                    {id: "BIF_PV", name: "PV", value: 3}
                ])
            )
        }
        if(localStorage.getItem("vector")) {
            const vector = JSON.parse(localStorage.getItem("vector") || "[]")
            vector.find((obj: any) => obj.id === event.target.name).value = 
            (event.target.value).split(":")[1];
            localStorage.setItem("vector", JSON.stringify(vector))

            const vectorToString = Risk.vectorToString(vector)
            const risk = Risk.stringToVector(vectorToString)

            const likelihoodAvg = Risk.calculateAverage(risk.slice(0, 8));
            const likelihoodLabel = Risk.rate(Number(likelihoodAvg));
            const likelihoodLabelColour = Risk.colour(likelihoodLabel);
            
            const impactAvg = Risk.calculateAverage(risk.slice(8, 16));
            const impactLabel = Risk.rate(Number(impactAvg));
            const impactLabelColour = Risk.colour(impactLabel);
            
            const criticality = Risk.criticality(likelihoodLabel, impactLabel);
            const criticalityColour = Risk.colour(criticality)

            // props.sendData({
            //     "likelihoodAvg": likelihoodAvg,
            //     "likelihoodLabel": likelihoodLabel,
            //     "likelihoodLabelColour": likelihoodLabelColour,
            //     "impactAvg": impactAvg,
            //     "impactLabel": impactLabel,
            //     "impactLabelColour": impactLabelColour,
            //     "criticality": criticality,
            //     "criticalityColour": criticalityColour,
            //     "vector": vectorToString
            // })
        }   
    };  
  
    return (
        <>
            <InputLabel id={`ip_label_${props.id}`}>
                {props.name}
            </InputLabel>
            <Select
                id={`dropdown_${props.id}`}
                value={dropDownData}
                inputProps={{"name" : props.id}}
                onChange={handleChange}
                label={props.name}
            >
                <MenuItem value=""><em>None</em></MenuItem>
                {
                    props.options.map(
                        (data:any, index: number) => (
                            <MenuItem 
                                value={`${props.id}:${data.value}`} 
                                key={`options_${props.id}_${index}`}
                            >
                                {data.name} ({data.value})
                            </MenuItem>
                        )
                    )
                }
            </Select>
        </>
    )
}

export default SelectDropDown;
