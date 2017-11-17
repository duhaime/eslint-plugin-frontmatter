var requireindex = require('requireindex');
var _ = require('lodash');

module.exports = {

  // Specify that this processor transforms .js files
  ".js": {

    /**
    * @args:
    *   text `str` the text from the given file
    *   filename `str` the filename of the given file
    * @returns:
    *   `[str]` a list of strings (one per each line in the file)
    **/

    preprocess: function(text, filename) {
      // Trim leading and trailing whitespace
      text = text.replace(/^\s+|\s+$/g, '');
      // Check if the file begins with frontmatter declaration
      if (text.substring(0,3) === '---') {
        // Remove the frontmatter
        var split = text.split('---');
        text= split.slice(2).join('---');
      }
      return [text];  // return an array of strings to lint
    },

    /**
    * @args:
    *   messages `Message[][]` A two-dimensional array of Message objects
    *     where each top-level array item contains array of lint messages related
    *     to the text that was returned in array from preprocess() method
    *   filename `str` The filename of the given file
    * @returns:
    *   `[Message]` a one-dimensional array of the retained messages
    **/

    postprocess: function(messages, filename) {
      return _.flatten(messages);
    },

    // Don't autofix lint errors
    supportsAutofix: false
  }
};