const assert = require('assert');
const survey_engine = require('../survey_engine');

/**
 * Tests for Survey Engine
 */
describe('Survey Engine', function() {
    /**
     * Tests for survey_results_valid()
     */
    describe('#survey_results_valid()', function() {
        it('should return false if the survey results are not an array', function() {
            assert.strictEqual(survey_engine.survey_results_valid("results", [], "not_arr"), false);
        });
        it('should return false if the number of responses differs from the number of survey questions', function() {
            assert.strictEqual(survey_engine.survey_results_valid("my_survey", ["t"], [false, true]), false);
        });
        it('should return false if each element in the array is not a string', function() {
            assert.strictEqual(survey_engine.survey_results_valid("my_survey", ["t"], [false, true]), false);
        });
        it('should return true if both of the previous requirements are met', function() {
            assert.strictEqual(survey_engine.survey_results_valid("my_survey", ["a", "b",  "c"], [true, false, true]), true);
        });
    });
    /**
     * Tests for survey_valid()
     */
    describe('#survey_valid()', function() {
        it('should return false if the provided survey is not an array', function() {
            assert.strictEqual(survey_engine.survey_valid("my_survey", "not_arr"), false);
        });
        it('should return false if each element in the array is not a string', function() {
            assert.strictEqual(survey_engine.survey_valid("my_survey", [false, "test"]), false);
        });
        it('should return true if both of the previous requirements are met', function() {
            assert.strictEqual(survey_engine.survey_valid("my_survey", ["a", "b",  "c"]), true);
        });
    });
});