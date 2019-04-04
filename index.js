import express from "express";

const app = express();

/**
 * Start web-service on port 5000
 */
app.listen(5000, () => {
    console.log("Server running on port 5000");
});


/**
 * GET endpoint to request a survey, accepts 1 query parameter
 * id: String to identify the survey
 *
 * @param req the HTTP request object
 * @param res the HTTP response object
 * @return the survey object if the provided id is valid, and a 400 bad request response if the id is invalid
 */
app.get("/get-survey", (req, res) => {
    if (survey_engine.survey_exists(req.query.id)) {
        return res.json(survey_engine.get_survey(req.query.id), res.ok);
    }
    res.send("Survey id not recognized: " + req.query.id, res.statusCode=400);
});


/**
 * GET endpoint to request survey results - accepts 2 query parameters
 * id: String to identify the survey
 * username: the id of the user who took the survey
 *
 * @param req the HTTP request object
 * @param res the HTTP response object
 * @return the survey results if the survey and user's results were found, and a 400 bad request response otherwise
 */
app.get("/get-survey-results", (req, res) => {
    if (survey_engine.survey_exists(req.query.id)) {
        if (survey_engine.user_has_taken_survey(req.query.id, req.query.username)) {
            return res.send(survey_engine.get_survey_results(req.query.id, req.query.username), res.ok);
        }
        res.send("User with username " + req.query.username + " has not taken the specified survey", res.statusCode=400);
    }
    res.send("Survey id not recognized: " + req.query.id, res.statusCode=400);
});


/**
 * POST endpoint to create a survey - accepts 1 query parameter
 * id: String to identify the survey
 *
 * @param req the HTTP request object
 * @param res the HTTP response object
 * @return 200 on success, 400 bad request if a survey with the specified id has already been created
 * */
app.post("/create-survey", (req, res) => {
    if (!survey_engine.survey_exists(req.query.id)) {
        survey_engine.create_survey(req.query.id);
        return res.send(res.ok);
    }
    res.statusCode=400;
    res.send("Survey with the specified id has already been created!");
});


/**
 * POST endpoint to take a survey - accepts 1 query parameter
 * id: String to identify the survey
 *
 * @param req the HTTP request object
 * @param res the HTTP response object
 * @return 200 on success, 400 bad request if a survey with the specified id has already been created
 * */
app.post("/create-survey", (req, res) => {
    if (!survey_engine.survey_exists(req.query.id)) {
        survey_engine.create_survey(req.query.id);
        return res.send(res.ok);
    }
    res.statusCode=400;
    res.send("Survey with the specified id has already been created!");
});
