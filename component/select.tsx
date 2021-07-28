import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Risk from '../src/risk'

const SelectDropDown = (props: any)=> {
  const [dropDownData, setDropDownData] = React.useState('');
  const [vector, setVector] = React.useState([{
    SL:1,M:1,O:0,S:2,ED:1,EE:1,A:1,ID:2,LC:2,LI:1,LAV:1,LAC:1,FD:1,RD:1,NC:2,PV:3
  }])

  // if(dropDownData != '')
  // {
  //   console.log(dropDownData);
  //   let replaceBrackets = dropDownData.replace("(", "").replace(")", "");
  //   let removeSpace = replaceBrackets.split(" ");
    // vector.map(data => {   
    //   data[removeSpace[0]] = parseInt(removeSpace[1]);
    // }) 
    
  // }
  // console.log(vector);
  

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    // console.log(event);
    
    setDropDownData(event.target.value as string)
    
    
    const risk = Risk.stringToVector(`(SL:1/M:1/O:0/S:2/ED:1/EE:1/A:1/ID:2/LC:2/LI:1/LAV:1/LAC:1/FD:1/RD:1/NC:2/PV:3)`)
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
                value={`${props.id} (${data.value})`} 
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
