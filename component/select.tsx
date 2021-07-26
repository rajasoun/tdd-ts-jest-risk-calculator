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
        minWidth: 300,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(0),
        border: '1px solid black',
      },
    }),
);

const SelectDropDown = (props: any) => {
  //console.log(props);
  
    const classes = useStyles();
  return (
    <>
        <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Skill Level
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="select-option"
          onChange={(event) => props.updateFilter({ source: event.target.value })}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Ten</MenuItem>
          <MenuItem value={3}>Twenty</MenuItem>
          <MenuItem value={5}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}

export default SelectDropDown;
