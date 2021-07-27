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
        margin: theme.spacing(4),
        minWidth: 300
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(0),
        marginBottom: theme.spacing(2),
        border: '1px solid black',
      },
    }),
);


const SelectDropDown = (props: any)=> {
  const objectData = Object.values(props);
  const classes = useStyles();
  const [dropDownData, setDropDownData] = React.useState('');


  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDropDownData(event.target.value as string);
  };  
  
  return (
    <>
    <FormControl variant="outlined" className={classes.formControl}>
      {
        objectData.map((data: any, index: number) => {
          return (
          <>
              <InputLabel id="demo-simple-select-outlined-label" key={index}>{data.name}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="dropdown-id"
                value={dropDownData}
                onChange={handleChange}
                label={data.name}
                className={classes.selectEmpty}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  data["options"].map((newData:any, indexData: number) => {
                    return <MenuItem value={newData.value} key={indexData}>{newData.name} ({newData.value})</MenuItem>
                  })
                }
              </Select>
          </>
          )
        })
      }
      </FormControl>

    </>
  )
}

export default SelectDropDown;
