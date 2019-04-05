/**
 * This file manages user-traffic with a REST API. It contains all survey endpoints and uses the survey_engine class
 * to manage survey logic and survey error checking
 *
 * TODO - swagger-doc for API, finish survey_engine, unit test, integration test, README
 */
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
    sendErrorResponse(res, 400, "Survey id not recognized: " + req.query.id);
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
    if (survey_engine.survey_exists(req.query.id)) {
        if (survey_engine.user_has_taken_survey(req.query.id, req.query.username)) {
            return res.send(survey_engine.get_survey_results(req.query.id, req.query.username), res.ok);
        }
        return res.send("User with username " + req.query.username + " has not taken the specified survey", res.statusCode=400);
    }
    sendErrorResponse(res, 400, "Survey id not recognized: " + req.query.id);
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
    if (!survey_engine.survey_exists(req.query.id)) {
        if (survey_engine.survey_valid(req.query.id, req.body)) {
            survey_engine.add_survey(req.query.id, req.body);
            return res.send(res.ok);
        }
        return sendErrorResponse(res, 400, "Survey questions were not valid.");
    }
    sendErrorResponse(res, 400, "Sorry! Survey with the specified id has already been created.");
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
    if (survey_engine.survey_exists(req.query.id)) {
        if (survey_engine.survey_results_valid(req.query.id, req.body)) {
            survey_engine.save_survey_results(req.query.id, req.query.username, req.body);
            return res.send(res.ok);
        }
        return sendErrorResponse(res, 400, "Survey responses invalid!");
    }
    sendErrorResponse(res, 400, "Survey with the specified id does not exist!");
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
