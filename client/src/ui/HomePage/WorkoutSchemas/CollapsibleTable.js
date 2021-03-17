import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Grid, TextField } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Link } from "react-router-dom";
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row({ row, onSelectSchemaToEdit }) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.date}</TableCell>
        <TableCell align="right">
          <IconButton onClick={() => onSelectSchemaToEdit(row.id)}>
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Exercises
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.exercises.map(exercise => (
                    <TableRow key={exercise}>
                      <TableCell component="th" scope="row">
                        <Typography variant="body1"> {exercise}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({
  workoutSchemas,
  onSetNameFilter,
  nameFilter,
  onSelectSchemaToEdit,
}) {
  useEffect(() => {
    return () => onSetNameFilter("");
  }, [onSetNameFilter]);
  return (
    <Grid item sm={6}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                size="small"
                value={nameFilter}
                onChange={e => onSetNameFilter(e.target.value)}
              >
                <TextField label="search" />
              </TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Creation Date</TableCell>
              <TableCell align="right">
                <IconButton component={Link} to="/home/workout-schemas/add">
                  <AddCircleOutlineIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workoutSchemas &&
              workoutSchemas.map(row => (
                <Row
                  key={row.id}
                  row={row}
                  onSelectSchemaToEdit={onSelectSchemaToEdit}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
