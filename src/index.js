const express = require("express");
const apicache = require("apicache");
const bodyParser = require("body-parser");
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const v1RecordRouter = require("./v1/routes/recordRoutes");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

const app = express();
const cache = apicache.middleware;
const PORT = process.env.PORT || 3000;

// body-parser allows us to parse the JSON inside the request body
// we're able to receive the JSON data inside our controller under `req.body`
app.use(bodyParser.json());
app.use(cache("2 minutes"));
app.use("/api/v1/workouts", v1WorkoutRouter);
app.use("/api/v1/records", v1RecordRouter);

app.listen(PORT, () => {
    console.log(`API is listening in port ${PORT}`)
    V1SwaggerDocs(app, PORT);
});
