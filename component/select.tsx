import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const SelectDropDown = (props: any)=> {
  const [dropDownData, setDropDownData] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(event);
    
    // setDropDownData(event.target.value as string)
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
                value={data.value} 
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
