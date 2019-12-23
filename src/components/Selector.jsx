import React from "react";

import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

const Selector = ({ data, handleSelector }) => {
  return (
    <Grid item xs={data.size}>
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <InputLabel>{data.label}</InputLabel>
        <Select
          value={data.selectedValue}
          onChange={handleSelector}
          inputProps={{ name: data.populateType }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data.populateType === "mainSelector"
            ? data.populateWith.map((ele, index) => (
                <MenuItem value={data.measurements[index]} key={index}>
                  {ele}
                </MenuItem>
              ))
            : data.populateWith.map(ele => (
                <MenuItem value={ele.abbr} key={ele.abbr}>
                  {ele.plural}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default Selector;
