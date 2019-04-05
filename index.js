/**
 * This file manages user-traffic with a REST API. It contains all survey endpoints and uses the survey_engine class
 * to manage survey logic and survey error checking
 */
const express = require("express");
const app = express();
app.use(require("body-parser").json());
const survey_engine = require('./survey_engine');

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
    // Send 404 not found response if the specified survey doesn't exist
    if (!survey_engine.survey_exists(req.query.id)) {
        console.log(req.query.id);
        return sendErrorResponse(res, 404, "Survey not found: " + req.query.id + ".");
    }
    // Send survey along with 200 response
    res.statusCode = 200;
    res.json(survey_engine.get_survey(req.query.id));
});


/**
 * GET endpoint to request survey results - accepts 2 query parameters
 * id: String to identify the survey
 * username: String id of the user who took the survey
 *
 * @param req the HTTP request object
 * @param res the HTTP response object
 * @return the survey results if the survey and user's results were found, and a 400 bad request response otherwise
 */
app.get("/get-survey-results", (req, res) => {
    // Send 404 not found response if the specified survey doesn't exist
    if (!survey_engine.survey_exists(req.query.id)) {
        return sendErrorResponse(res, 404, "Survey not found: " + req.query.id + ".");
    }
    // Send 404 not found response if the specified user has not taken the specified survey
    else if (!survey_engine.user_has_taken_survey(req.query.id, req.query.username)) {
        return sendErrorResponse(res, 404, "Results for user " + req.query.username + " not found.");
    }
    // Send survey results along with 200 response
    res.statusCode = 200;
    res.json(survey_engine.get_survey_results(req.query.id, req.query.username));
});


/**
 * POST endpoint to create a survey - accepts 1 query parameter
 * id: String to identify the survey
 * Body: contains the survey questions as a JSON array of Strings
 *
 * @param req the HTTP request object
 * @param res the HTTP response object
 * @return 200 on success, 400 bad request if a survey with the specified id has already been created
 * */
app.post("/create-survey", (req, res) => {
    // Send 400 response if a survey with the specified id has already been created
    if (survey_engine.survey_exists(req.query.id)) {
        return sendErrorResponse(res, 400, "Survey with the specified id has already been created.");
    }
    // Send 400 response if the survey questions were invalid
    else if (!survey_engine.survey_valid(req.query.id, req.body)) {
        return sendErrorResponse(res, 400, "Survey questions were not valid.");
    }
    // Add the survey to the system and send a 200 response
    survey_engine.add_survey(req.query.id, req.body);
    res.send(res.ok);
});


/**
 * POST endpoint to submit survey results - accepts 1 query parameter
 * id: String to identify the survey
 * username: String id of the user who took the survey
 * Body: contains the survey answers as a JSON array of Booleans
 *
 * @param req the HTTP request object
 * @param res the HTTP response object
 * @return 200 on success, 400 bad request if the survey id is invalid
 * */
app.post("/submit-survey", (req, res) => {
    // Send 404 not found response if the specified survey does not exist
    if (!survey_engine.survey_exists(req.query.id)) {
        return sendErrorResponse(res, 404, "Survey not found: " + req.query.id + ".");
    }
    // Send 400 response if the survey responses were invalid
    else if (!survey_engine.survey_results_valid(req.query.id, survey_engine.get_survey(req.query.id), req.body)) {
        return sendErrorResponse(res, 400, "Survey responses invalid.");
    }
    // Save survey results in system and send 200 response
    survey_engine.save_survey_results(req.query.id, req.query.username, req.body);
    res.send(res.ok);
});

/**
 * Sends an error response to a user
 *
 * @param res the HTTP response entity
 * @param statusCode the status code to include in the response
 * @param body the message body to include in the response
 */
function sendErrorResponse(res, statusCode, body) {
    res.statusCode=statusCode;
    res.send(body);
}
