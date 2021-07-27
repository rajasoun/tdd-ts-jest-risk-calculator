import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      formControl: {
        margin: theme.spacing(3),
        minWidth: 400,
      },
      selectEmpty: {
        border: '1px solid black',
        marginTop: "-10px"
      },
    }),
);


const SelectDropDown = (props: any)=> {
  const {name, id, options} = props;
  const classes = useStyles();
  const [dropDownData, setDropDownData] = React.useState({});

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDropDownData(event.target.value as string)
  };  
  
  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{name}</InputLabel>
        {
          <Select
              labelId="demo-simple-select-outlined-label"
              id="dropdown-id"
              value={dropDownData}
              inputProps={{name: name, id: id}} 
              onChange={(event) => {setDropDownData({input: event.target.value})}}
              label={name}
              className={classes.selectEmpty} 
            >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              options.map((data: any, index: number) => {
                return <MenuItem value={data.value} key={index}>{data.name + " (" + data.value + ")"}</MenuItem>
              })
            }
          </Select>
        }
      </FormControl>

    </>
  )
}

export default SelectDropDown;
