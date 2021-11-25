import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

export const SearchForm = ({ onInputChange, onSubmitClick, onRandomClick }) => {
  const [selected, setSelected] = useState("jokes");
  const [number, setNumber] = useState(1);
  const [disabled, setDisabled] = useState(false);

  const selectChange = (event) => {
    setSelected(event.target.value);
    if (event.target.value === "gif") setDisabled(true);
    else setDisabled(false);
    onInputChange(event);
  };

  const onNumberChange = (event) => {
    let num =
      event.target.value < 1 ||
      event.target.value > 10 ||
      isNaN(event.target.value)
        ? 1
        : event.target.value;
    event.target.value = num;
    setNumber(num);
    onInputChange(event);
  };

  return (
    <form onSubmit={onSubmitClick}>
      <Grid container spacing={{ xs: 1, sm: 1, md: 2 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Keywords"
            variant="outlined"
            name="keywords"
            type="text"
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label="No. of results"
            value={number}
            variant="outlined"
            name="noOfResults"
            type="number"
            onChange={onNumberChange}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel id="search-label">Type</InputLabel>
            <Select
              value={selected}
              labelId="search-label"
              id="search-type"
              label="Type"
              name="type"
              onChange={selectChange}
            >
              <MenuItem value={"jokes"}>Jokes</MenuItem>
              <MenuItem value={"memes"}>Memes</MenuItem>
              <MenuItem value={"gif"}>Gif</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={1}>
          <Button
            fullWidth
            sx={{ height: "100%" }}
            variant="contained"
            type="submit"
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={12} md={1}>
          <Button
            fullWidth
            sx={{ height: "100%" }}
            variant="outlined"
            disabled={disabled}
            onClick={onRandomClick}
          >
            Random
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
