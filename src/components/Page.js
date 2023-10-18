import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { pageAdded } from "../stores/userSlice";
import { UseSelector, useDispatch, useSelector } from "react-redux";

function Page() {
  const dispatch = useDispatch();

  const handleChange = (event, page) => {
    dispatch(pageAdded(page));
    console.log(page);
  };
  return (
    <div>
      <Stack spacing={2}>
        <Pagination count={10} color="secondary" onChange={handleChange} />
      </Stack>
    </div>
  );
}

export default Page;
