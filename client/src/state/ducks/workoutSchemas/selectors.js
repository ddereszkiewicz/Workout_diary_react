import { createSelector } from "reselect";

export const workoutSchemasSelector = state =>
  state.entities.workoutSchemas.allIds.map(
    id => state.entities.workoutSchemas.byId[id]
  );

export const oneWorkoutSchemaSelector = (state, id) =>
  state.entities.workoutSchemas.byId[id];

export const selectFilteredByNameSchemas = createSelector(
  workoutSchemasSelector,
  state => state.schemas.nameFilter,
  (schemas, name) => schemas.filter(schema => schema.name.includes(name))
);

export const editedSchemaSelector = createSelector(
  state => state.entities.workoutSchemas.byId,
  state => state.schemas.editedSchema,
  (schemas, id) => schemas[id]
);
