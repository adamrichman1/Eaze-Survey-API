class survey_engine {

    /**
     * Retrieves a survey from a file
     *
     * @param survey_id the id of the survey to retrieve
     * @returns {JSON} the survey in JSON format
     */
    static get_survey(survey_id) {

    }

    /**
     *
     * @param survey_id the id of the survey being queried for
     * @param username the id of the user who took the survey
     * @returns {JSON} the user's results from the survey in JSON format
     */
    static get_survey_results(survey_id, username) {

    }

    /**
     *
     * @param survey_id
     * @returns {boolean}
     */
    static create_survey(survey_id) {

    }

    /**
     *
     * @param survey_id the id of the survey to check
     * @return {boolean} true if the survey exists, false otherwise
     */
    static survey_exists(survey_id) {

    }

    /**
     * Checks if a user has taken a survey
     *
     * @param survey_id the id of the survey to check
     * @param username the id of the user to check
     * @return {boolean} true if the user has taken the specified survey, false otherwise
     */
    static user_has_taken_survey(survey_id, username) {

    }
}