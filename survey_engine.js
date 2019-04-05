/**
 * This class manages all survey logic and survey error checking. It uses the file_manager class to persist
 * surveys and survey results in JSON files. In production, a DB layer should replace the file layer.
 */
const file_manager = require('file_manager');

class survey_engine {

    /**
     * Retrieves a survey from a file
     *
     * @param survey_id the id of the survey to retrieve
     * @returns {JSON} the survey in JSON format
     */
    static get_survey(survey_id) {
        return file_manager.read_file(survey_id);
    }

    /**
     * Retrieves the results for a survey and user
     *
     * @param survey_id the id of the survey being queried for
     * @param username the id of the user who took the survey
     * @returns {JSON} the user's results from the survey in JSON format
     */
    static get_survey_results(survey_id, username) {
        return file_manager.read_file(survey_id + "-" + username);
    }

    /**
     * Adds a new survey to the system
     *
     * @param survey_id the id of the survey to add
     * @param survey_questions the questions of the survey
     */
    static add_survey(survey_id, survey_questions) {
        file_manager.write_to_file(survey_id, survey_questions);
    }

    /**
     * Checks if a survey with a given id exists
     *
     * @param survey_id the id of the survey to check
     * @returns {boolean} true if the survey exists, false otherwise
     */
    static survey_exists(survey_id) {
        return file_manager.file_exists(survey_id);
    }

    /**
     * Saves results for a survey
     *
     * @param survey_id the id of the survey to associate the survey results with
     * @param username the id of the user to associate the survey results with
     * @param survey_results the results of the survey
     */
    static save_survey_results(survey_id, username, survey_results) {
        file_manager.write_to_file(survey_id + "-" + username);
    }

    /**
     * Checks if a user has taken a survey
     *
     * @param survey_id the id of the survey to check
     * @param username the id of the user to check
     * @returns {boolean} true if the user has taken the specified survey, false otherwise
     */
    static user_has_taken_survey(survey_id, username) {
        return file_manager.file_exists(survey_id + "-" + username);
    }

    /**
     * Checks if responses to a survey are valid before saving them
     *
     * @param survey_id the id of the survey to check
     * @param survey_results the results of the survey
     * @return {boolean} true if the results of the survey are valid, false otherwise
     */
    static survey_results_valid(survey_id, survey_results) {
        return file_manager.read_file(survey_id).length === survey_results.length &&
            survey_results.all(x => typeof x == "boolean");
    }

    /**
     * Checks if survey questions submitted for a new survey are valid
     *
     * @param survey_id the id of the survey to check
     * @param survey_questions the questions of the survey
     * @return {boolean} true if the survey questions are valid, false otherwise
     */
    static survey_valid(survey_id, survey_questions) {
        return survey_questions instanceof Array &&
            survey_questions.all(x => typeof x == "string");
    }
}