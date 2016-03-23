
//var moment = require('alloy/moment');

exports.definition = {	// Needed by Backbone.js
	config: {		 // Notice there's no primary key column,
		"columns": { // so col. "alloy_id" is added at runtime.
			"item":"text",
			"done":"integer",	// 0 = no, 1 = yes
			"date_completed":"text"
		},
		"adapter": {
			"type": "sql",	// specified SQLlite DB
			"collection_name": "todo"
		}
	},
/*	// I'm not sure what the validate function is doing!
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			validate : function(attrs) {
				for (var key in attrs) {
					var value = attrs[key];
					if (value) {
						if (key === "item") {
							if (value.length <= 0) {
								return 'Error: No item!';
							}
						}
						if (key === "done") {
							if (value.length <= 0) {
								return 'Error: No completed flag!';
							}
						}
					}
				}
			}
		});

		return Model;
	},
*/	// The following allows undone tasks to be listed first on home pg.
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, { // uses Underscore.js
			comparator: function(todo) { // overrides Underscore's comparator fn.
				return todo.get('done'); // returns 0 or 1.
			}
		});
		// Careful, JS is a case-sensitive lang.
		return Collection;
	}
};