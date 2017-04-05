var todos = Alloy.Collections.todo;
var INDEXES = {
	'All': 0,
	'Active': 1,
	'Done': 2
};
var whereIndex = INDEXES['All'];	// initially 0

// open the app's main window
$.todoWin.open();

// fetch existing todo items from storage (unless todos is null)
todos && todos.fetch();

// Filter the fetched collection before rendering. Don't return the
// collection itself, but instead return an array of models from either
// the "All", "Active" or "Done" todos, depending on which is selected,
// that you would like to render. This function works in concert with
// the function showTasks(e) at the end of this file, which is called
// every time the All, Active or Done buttons are clicked.
function whereFunction(collection) {
	return !whereIndex ?
		collection.models :
		collection.where({ done: whereIndex === 1 ? 0 : 1 });
}

// Perform transformations on each model as it is processed. Since
// these are only transformations for UI representation, we don't
// actually want to change the model. Instead, return an object
// that contains the fields you want to use in your bindings. The
// easiest way to do that is to clone the model and return its
// attributes with the toJSON() function.
function transformFunction(model) {
	var transform = model.toJSON();
//	transform.item = '[' + transform.item + ']';	// puts [ ] around items
	return transform;
}

// open the "add item" window
function addToDoItem() { // loads the "add" component
	Alloy.createController("add").getView().open();
}

// Show task list based on selected status type
function showTasks(e) {
	if (typeof e.index !== 'undefined' && e.index !== null) {
		whereIndex = e.index;	// source is a TabbedBar on iOS
	} else {	// source is an Android menu
		whereIndex = INDEXES[e.source.title];
	}
	todos.fetch();	// reloads and refilters tasks from DB
}