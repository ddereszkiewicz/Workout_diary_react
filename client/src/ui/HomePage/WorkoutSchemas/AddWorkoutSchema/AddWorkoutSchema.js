import { Grid } from "@material-ui/core";
import AddWorkoutSchemaForm from "./AddWorkoutSchemaForm";

const AddWorkoutSchema = ({ user }) => {
  return (
    <Grid container direction="row" justify="center">
      <AddWorkoutSchemaForm user={user} />
    </Grid>
  );
};

export default AddWorkoutSchema;
