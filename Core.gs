/**
 * loads a configuration file from the google drive by path/name
 *
 * @param {string} the path and base filename to use
 * @return {object} a parsed JSON object or null if an error occurs
 */
function loadByPath(path) {
  var content = MyDriveUtil.loadFileByPath(jsonFileName(path));
  if (content === null) {
    return null;
  }
  
  var result = null;
  var errFile = errorFileName(path);
  try {
    result = JSON.parse(content);
    var file = MyDriveUtil.getFileByPath(errFile);
    MyDriveUtil.removeFile(file);
  }
  catch(err) {
    MyDriveUtil.createFileByPath(errFile, content + "\n\n" + err.message);
  }
  
  return result;
}

/**
 * creates the JSON file path based on the given path/name
 *
 * @param {string} the path and name of the base file
 * @return {string} the path and name of the JSON file
 */
function jsonFileName(path) {
  return path + ".json";
}

/**
 * creates the error file path based on the given path/name
 *
 * @param {string} the path and name of the base file
 * @return {string} the path and name of the error file
 */
function errorFileName(path) {
  return path + ".err";
}