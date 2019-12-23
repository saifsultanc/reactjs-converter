import React, { useState } from "react";

import convert from "convert-units";

import { Container, Grid } from "@material-ui/core";
import InputField from "./components/InputField";
import Selector from "./components/Selector";

const App = () => {
  const [mainSelector, setMainSelector] = useState("");
  const [firstQuantity, setFirstQuantity] = useState("");
  const [secondQuantity, setSecondQuantity] = useState("");
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);

  const generateMainSelector = () => {
    return convert()
      .measures()
      .map(ele => ele[0].toUpperCase() + ele.slice(1));
  };

  const handleMainSelector = e => {
    e.preventDefault();
    setMainSelector(e.target.value);
    setFirstQuantity("");
    setSecondQuantity("");
    setFirstValue(0);
    setSecondValue(0);
  };

  const handleSelector = e => {
    e.target.name === "firstQuantity"
      ? setFirstQuantity(e.target.value)
      : setSecondQuantity(e.target.value);
    setFirstValue(0);
    setSecondValue(0);
  };

  const handleInputFields = e => {
    e.preventDefault();
    if (e.target.name === "firstValue") {
      setFirstValue(e.target.value);
      setSecondValue(
        convert(e.target.value)
          .from(firstQuantity)
          .to(secondQuantity)
      );
    } else {
      setSecondValue(e.target.value);
      setFirstValue(
        convert(e.target.value)
          .from(secondQuantity)
          .to(firstQuantity)
      );
    }
  };

  return (
    <Container>
      <Grid container justify="center" align="center" spacing={3}>
        <Selector
          data={{
            size: 12,
            label: "Measurement",
            measurements: convert().measures(),
            populateType: "mainSelector",
            populateWith: generateMainSelector(),
            selectedValue: mainSelector
          }}
          handleSelector={handleMainSelector}
        />
        {mainSelector ? (
          <>
            <Selector
              data={{
                size: 6,
                label: "Quantity",
                populateType: "firstQuantity",
                populateWith: convert().list(mainSelector),
                selectedValue: firstQuantity
              }}
              handleSelector={handleSelector}
            />
            <Selector
              data={{
                size: 6,
                label: "Quantity",
                populateType: "secondQuantity",
                populateWith: convert().list(mainSelector),
                selectedValue: secondQuantity
              }}
              handleSelector={handleSelector}
            />
          </>
        ) : (
          <></>
        )}
        {firstQuantity && secondQuantity ? (
          <>
            <InputField
              data={{
                currentValue: firstValue,
                input: firstQuantity,
                name: "firstValue"
              }}
              handleInput={handleInputFields}
            />
            <InputField
              data={{
                currentValue: secondValue,
                input: secondQuantity,
                name: "secondValue"
              }}
              handleInput={handleInputFields}
            />
          </>
        ) : (
          <></>
        )}
      </Grid>
    </Container>
  );
};

export default App;
