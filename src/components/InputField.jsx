import React from "react";
import { TextField, InputAdornment, Grid } from "@material-ui/core";

const InputField = ({ data, handleInput }) => {
  return (
    <Grid item xs={6}>
      <TextField
        variant="outlined"
        label={data.label}
        value={data.currentValue}
        name={data.name}
        onChange={handleInput}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{data.input}</InputAdornment>
          )
        }}
        style={{ width: "100%" }}
      />
    </Grid>
  );
};

export default InputField;
