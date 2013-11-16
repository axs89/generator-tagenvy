/**
 * TagEnvy constructor.
 *
 * The exports object of the `tagenvy` module is an instance of this class.
 *
 */

function TagEnvy () {
    this.options = {};
};

TagEnvy.prototype.Art = require('./art');

module.exports = exports = new TagEnvy;
