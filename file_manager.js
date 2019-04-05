const fs = require('fs');

/**
 * Writes to a file
 *
 * @param id the identifier for the file
 * @param contents the contents to write to the file
 */
function write_to_file(id, contents) {
    fs.writeFile(id + ".json", JSON.stringify(contents), (err) => {
        if (err) throw err;
        console.log("File " + id + ".json has been saved.");
    });
}

/**
 * Reads from a file
 *
 * @param id the identifier of the file to read
 * @return {JSON} the contents of the file as a JSON object
 */
function read_file(id) {
    return JSON.parse(fs.readFileSync(id + ".json", "utf8"));
}

/**
 * Checks if a file exists
 *
 * @param id the identifier of the file to check
 * @return {boolean} true if the file exists, false otherwise
 */
function file_exists(id) {
    return fs.existsSync(id + ".json");
}

module.exports = {
    write_to_file,
    read_file,
    file_exists
};