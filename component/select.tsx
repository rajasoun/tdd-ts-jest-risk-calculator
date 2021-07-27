import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Risk from '../src/risk'

const SelectDropDown = (props: any)=> {
  const [dropDownData, setDropDownData] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    // console.log(event);
    
    setDropDownData(event.target.value as string)
    // console.log(dropDownData);
    
    const risk = Risk.stringToVector('Security penetration skills (1)')
    // console.log(risk);
    const likelihood = Risk.calculateAverage(risk.slice(0, 8));
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
        onChange={handleChange}
        label={props.name}
      >
        <MenuItem value=""><em>None</em></MenuItem>
        {
          props.options.map(
            (data:any, index: number) => (
              <MenuItem 
                value={`${data.name} (${data.value})`} 
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
