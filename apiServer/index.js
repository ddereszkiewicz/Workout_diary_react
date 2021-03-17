const express = require("express");
const app = express();
const cors = require("cors");
const users = require("./routes/users");
const exercises = require("./routes/exercises");
const work_outs = require("./routes/work_outs");
const work_out_schemas = require("./routes/work_out_schemas");

app.use(express.json());
app.use(cors());
// „Podłączamy” obsługę „endpointów”, które zdefiniowaliśmy dla kolekcji 'users' w katalogu routes/users.js
app.use("/users", users);
users.use("/workout-schemas", work_out_schemas);
users.use("/workouts", work_outs);
users.use("/exercises", exercises);

const dbConnData = {
  host: "127.0.0.1",
  port: 27017,
  database: "dzienniczek_treningowy",
};
// Łączymy się z bazą i „stawiamy” serwer API
// Do kontaktu z serwerem MongoDB wykorzystamy bibliotekę Mongoose

const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(response => {
    console.log(
      `Connected to MongoDB. Database name: "${response.connections[0].name}"`
    );
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch(error => console.error("Error connecting to MongoDB", error));
