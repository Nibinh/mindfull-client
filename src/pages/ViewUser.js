import React from "react";
import { Grid, Box } from "@mui/material";
import HeaderTwo from "../components/HeaderTwo";
import Cardd from "../components/Cardd";
import { useParams } from "react-router-dom";

function ViewUser() {
  const params = useParams();

  return (
    <div>
      <HeaderTwo />
      <Grid container>
        <Grid container spacing={2} sx={{ marginTop: 5, padding: 5 }}>
          <Grid item xs={1} md={4} sm={2}></Grid>
          <Grid item xs={10} md={4} sm={8} textAlign="center">
            <Cardd id={params.id} />
          </Grid>
          <Grid item xs={1} md={4} sm={2}></Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ViewUser;
