/**
 * This file manages all survey logic and survey error checking. It uses the file_manager class to persist
 * surveys and survey results in JSON files.
 */
const file_manager = require('./file_manager');

/**
 * Retrieves a survey from a file
 *
 * @param survey_id the id of the survey to retrieve
 * @returns {JSON} the survey in JSON format
 */
function get_survey(survey_id) {
    return file_manager.read_file(survey_id);
}

/**
 * Retrieves the results for a survey and user
 *
 * @param survey_id the id of the survey being queried for
 * @param username the id of the user who took the survey
 * @returns {JSON} the user's results from the survey in JSON format
 */
function get_survey_results(survey_id, username) {
    return file_manager.read_file(survey_id + "-" + username);
}

/**
 * Adds a new survey to the system
 *
 * @param survey_id the id of the survey to add
 * @param survey_questions the questions of the survey
 */
function add_survey(survey_id, survey_questions) {
    file_manager.write_to_file(survey_id, survey_questions);
}

/**
 * Checks if a survey with a given id exists
 *
 * @param survey_id the id of the survey to check
 * @returns {boolean} true if the survey exists, false otherwise
 */
function survey_exists(survey_id) {
    return file_manager.file_exists(survey_id);
}

/**
 * Saves results for a survey
 *
 * @param survey_id the id of the survey to associate the survey results with
 * @param username the id of the user to associate the survey results with
 * @param survey_results the results of the survey
 */
function save_survey_results(survey_id, username, survey_results) {
    file_manager.write_to_file(survey_id + "-" + username, survey_results);
}

/**
 * Checks if a user has taken a survey
 *
 * @param survey_id the id of the survey to check
 * @param username the id of the user to check
 * @returns {boolean} true if the user has taken the specified survey, false otherwise
 */
function user_has_taken_survey(survey_id, username) {
    return file_manager.file_exists(survey_id + "-" + username);
}

/**
 * Checks if responses to a survey are valid before saving them
 *
 * @param survey_id the id of the survey to check
 * @param survey the contents of the survey
 * @param survey_results the results of the survey
 * @return {boolean} true if the results of the survey are valid, false otherwise
 */
function survey_results_valid(survey_id, survey, survey_results) {
    return survey_results instanceof Array &&
        survey.length === survey_results.length &&
        survey_results.every(x => typeof x == "boolean");
}

/**
 * Checks if survey questions submitted for a new survey are valid
 *
 * @param survey_id the id of the survey to check
 * @param survey_questions the questions of the survey
 * @return {boolean} true if the survey questions are valid, false otherwise
 */
function survey_valid(survey_id, survey_questions) {
    console.log(typeof(survey_questions));
    return survey_questions instanceof Array &&
        survey_questions.every(x => typeof x == "string");
}

module.exports = {
    get_survey,
    get_survey_results,
    add_survey, survey_exists,
    save_survey_results,
    user_has_taken_survey,
    survey_results_valid,
    survey_valid
};
