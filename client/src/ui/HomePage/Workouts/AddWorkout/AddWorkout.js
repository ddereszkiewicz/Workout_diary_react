import { Grid } from "@material-ui/core";
import SelectSchemaForm from "./AddWorkoutForm/SelectSchemaForm";

const AddWorkout = ({ user, workoutSchemas }) => {
  return (
    <Grid container direction="row" justify="center">
      <SelectSchemaForm user={user} workoutSchemas={workoutSchemas} />
    </Grid>
  );
};

export default AddWorkout;
