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
import DeleteIcon from "@material-ui/icons/Delete";
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

function Row({ row, schema, exercises, onSelectToEdit, delWorkout }) {
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
          {schema.name}
        </TableCell>
        <TableCell align="left">{row.date}</TableCell>
        <TableCell align="right">
          <IconButton onClick={() => delWorkout(row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => onSelectToEdit(row.id)}>
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
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Series</TableCell>
                    <TableCell>Reps</TableCell>
                    <TableCell>Weight</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exercises.map(exercise => (
                    <TableRow key={exercise.id}>
                      <TableCell component="th" scope="row">
                        <Typography variant="body1">{exercise.name}</Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography variant="body1">
                          {exercise.series}
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography variant="body1">{exercise.reps}</Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography variant="body1">
                          {exercise.weight + "kg"}
                        </Typography>
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

function WorkoutsCollapsibleTable({
  workoutsSchema,
  workouts,
  workoutsExercises,
  onSelectToEdit,
  delWorkout,
  nameFilter,
  onSetNameFilter,
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
              <TableCell align="left" size="small">
                <TextField
                  label="search"
                  value={nameFilter}
                  onChange={e => onSetNameFilter(e.target.value)}
                />
              </TableCell>
              <TableCell align="left">Schema</TableCell>
              <TableCell align="left">Creation Date</TableCell>
              <TableCell align="right">
                <IconButton component={Link} to="/home/workouts/add">
                  <AddCircleOutlineIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workouts &&
              workouts.map(row => {
                return (
                  workoutsExercises[row.id] &&
                  workoutsSchema[row.id] && (
                    <Row
                      delWorkout={delWorkout}
                      key={row.id}
                      exercises={workoutsExercises[row.id]}
                      schema={workoutsSchema[row.id]}
                      row={row}
                      onSelectToEdit={onSelectToEdit}
                    />
                  )
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default WorkoutsCollapsibleTable;
