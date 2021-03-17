import { Grid } from "@material-ui/core";
import { Switch, Route } from "react-router";
import AddWorkoutSchema from "./AddWorkoutSchema/AddWorkoutSchema";
import CollapsibleTable from "./CollapsibleTable";
import { connect } from "react-redux";

import {
  editedSchemaSelector,
  selectFilteredByNameSchemas,
} from "../../../state/ducks/workoutSchemas/selectors";
import {
  selectSchemaToEdit,
  setNameFilter,
} from "../../../state/ducks/workoutSchemas/actions";
import EditSchemaForm from "./EditSchema/EditSchemaForm";

const WorkoutSchemasPage = ({
  visibleSchemas,
  user,
  onSetNameFilter,
  nameFilter,
  editedSchema,
  editedSchemaId,
  onSelectSchemaToEdit,
}) => {
  return (
    <div className="workout-schemas">
      <Grid container justify="center" direction="row">
        <Switch>
          <Route exact path="/home/workout-schemas">
            {!editedSchemaId ? (
              <CollapsibleTable
                workoutSchemas={visibleSchemas}
                onSetNameFilter={onSetNameFilter}
                nameFilter={nameFilter}
                onSelectSchemaToEdit={onSelectSchemaToEdit}
              />
            ) : (
              <EditSchemaForm
                schema={editedSchema}
                onSelectToEdit={onSelectSchemaToEdit}
              />
            )}
          </Route>
          <Route exact path="/home/workout-schemas/add">
            <AddWorkoutSchema user={user} />
          </Route>
        </Switch>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    visibleSchemas: selectFilteredByNameSchemas(state),
    nameFilter: state.schemas.nameFilter,
    editedSchema: editedSchemaSelector(state),
    editedSchemaId: state.schemas.editedSchema,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetNameFilter: name => dispatch(setNameFilter(name)),
    onSelectSchemaToEdit: id => dispatch(selectSchemaToEdit(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WorkoutSchemasPage);
