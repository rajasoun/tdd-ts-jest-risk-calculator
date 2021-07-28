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

    // if(dropDownData != '')
    // {
    // //   console.log(dropDownData);    
    //   let replaceBrackets: any = dropDownData.replace(":", " ");
    // //   console.log(replaceBrackets);
      
    //   let removeSpace: any = replaceBrackets.split(" ");
    // //   console.log(removeSpace[0]);
      
    //   vector.find((data: any) => data[removeSpace[0]] = parseInt(removeSpace[1]))
    // }
    const handleChange = (event:  React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        setDropDownData(event.target.value as number)
        if (typeof window != "undefined" && !localStorage.getItem("vector")){
            localStorage.setItem("vector", JSON.stringify(
                [
                    {id: "TAF_SL", value: 1}, 
                    {id: "TAF_M", value: 1}, 
                    {id: "TAF_O", value: 0}, 
                    {id: "TAF_S", value: 2},
                    {id: "VF_ED", value: 1},
                    {id: "VF_EE", value: 1},
                    {id: "VF_A", value: 1},
                    {id: "VF_ID", value: 2},
                    {id: "TMF_LC", value: 2}, 
                    {id: "TMF_LI", value: 1}, 
                    {id: "TMF_LAV", value: 1}, 
                    {id: "TMF_LAC", value: 1},
                    {id: "BIF_FD", value: 1},
                    {id: "BIF_RD", value: 1},
                    {id: "BIF_NC", value: 2},
                    {id: "BIF_PV", value: 3}
                ])
            )
        }
        if(localStorage.getItem("vector")) {
            const vector = JSON.parse(localStorage.getItem("vector") || "[]")
            vector.find((obj: any) => obj.id === event.target.name).value = 
            (event.target.value).split(":")[1];
            localStorage.setItem("vector", JSON.stringify(vector))
            const vectorToString = Risk.vectorToString(vector)
            console.log(vectorToString);

            const risk = Risk.stringToVector(vectorToString)
            console.log(risk);

            const likelihood = Risk.calculateAverage(risk.slice(0, 8));
            console.log(likelihood);

            const likelihoodLabel = Risk.rate(Number(likelihood));
            console.log(likelihoodLabel);

            const colour = Risk.colour(likelihoodLabel);
            console.log(colour);
            
            const impact = Risk.calculateAverage(risk.slice(8, 16));
            console.log(impact);

            const impactLabel = Risk.rate(Number(impact));
            console.log(impactLabel);

            const criticality = Risk.criticality(likelihoodLabel, impactLabel);
            console.log(criticality);
            

            props.sendData(likelihood, likelihoodLabel, colour, impact, impactLabel, vectorToString, criticality)
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
