import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { searchAdded } from "../stores/userSlice";

function Search() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    console.log("se", event.target.value);
    dispatch(searchAdded(event.target.value));
  };
  return (
    <div>
      <TextField
        variant="outlined"
        value={searchQuery}
        placeholder="Search"
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          borderRadius: "25px", // Adjust the value to control the curve
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: "25px", // Match the parent's border-radius
              border: "2px solid #b7b7b7", // You can customize the border style
            },
          },
        }}
      />
    </div>
  );
}

export default Search;
