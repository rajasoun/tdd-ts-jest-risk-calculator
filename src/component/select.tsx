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
        setDropDownData(event.target.value as string)
        if (typeof window != "undefined" && !localStorage.getItem("vector")){
            localStorage.setItem("vector", JSON.stringify(
                [
                    {id: "TAF_SL", value: 1}, 
                    {id: "TAF_M", value: 1}, 
                    {id: "TAF_O", value: 0}, 
                    {id: "TAF_S", value: 2}
                ])
            )
        }
        if(localStorage.getItem("vector")) {
            const vector = JSON.parse(localStorage.getItem("vector") || "[]")
            vector.find((obj: any) => obj.id === event.target.name).value = 
            (event.target.value).split(":")[1];
            localStorage.setItem("vector", JSON.stringify(vector))
        }

        
        // const risk = Risk.stringToVector(`(SL:1/M:1/O:0/S:2/ED:1/EE:1/A:1/ID:2/LC:2/LI:1/LAV:1/LAC:1/FD:1/RD:1/NC:2/PV:3)`)
        // console.log(risk);
        // const likelihood = Risk.calculateAverage(risk.slice(0, 8));
        // console.log(likelihood);
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
