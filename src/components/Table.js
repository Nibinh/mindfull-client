import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useSnackbar } from "@mui/base/useSnackbar";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { css, keyframes } from "@mui/system";
import { fetchUsers } from "../stores/userSlice";
import DeleteUser from "./DeleteUser";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function Tablee() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const filter = useSelector((state) => state.users.filter);
  const page = useSelector((state) => state.users.page);
  const search = useSelector((state) => state.users.search);
  const deleteMsg = useSelector((state) => state.users.deleteMsg);
  const addMsg = useSelector((state) => state.users.addUserMsg);

  const isDataEmpty = users.length === 0;

  const [open, setOpen] = React.useState(false);

  const { getRootProps, onClickAway } = useSnackbar({
    open,
    autoHideDuration: 1000,
  });

  useEffect(() => {
    dispatch(fetchUsers({ filter, page, search }));
    if (deleteMsg) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    }
  }, [filter, page, search, deleteMsg, addMsg]);

  return (
    <div>
      <TableContainer component={Paper}>
        {isDataEmpty ? (
          <div>No data available</div>
        ) : (
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Phone</StyledTableCell>
                <StyledTableCell>By</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((data) => (
                <StyledTableRow key={data._id}>
                  <StyledTableCell component="th" scope="row">
                    {data.name}
                  </StyledTableCell>
                  <StyledTableCell> {data.email}</StyledTableCell>
                  <StyledTableCell> {data.phone}</StyledTableCell>
                  <StyledTableCell>{data.createdBy.name}</StyledTableCell>

                  <StyledTableCell>
                    <Grid sx={{ display: "flex" }}>
                      <DeleteUser id={data._id} />
                      <Link to={"/viewUser/" + data._id}>
                        <VisibilityIcon sx={{ marginTop: 1 }} />
                      </Link>
                    </Grid>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {open ? (
        <ClickAwayListener onClickAway={onClickAway}>
          <CustomSnackbar {...getRootProps()}>{deleteMsg}</CustomSnackbar>
        </ClickAwayListener>
      ) : null}
    </div>
  );
}

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const snackbarInRight = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;

const CustomSnackbar = styled("div")(
  ({ theme }) => css`
    position: fixed;
    z-index: 5500;
    display: flex;
    right: 16px;
    bottom: 16px;
    left: auto;
    justify-content: start;
    max-width: 560px;
    min-width: 300px;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : grey[400]};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[50]};
    box-shadow: ${theme.palette.mode === "dark"
      ? `0 4px 8px rgb(0 0 0 / 0.7)`
      : `0 4px 8px rgb(0 0 0 / 0.1)`};
    padding: 0.75rem;
    color: ${theme.palette.mode === "dark" ? blue[200] : blue[900]};
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    animation: ${snackbarInRight} 200ms;
    transition: transform 0.2s ease-out;
  `
);

export default Tablee;
