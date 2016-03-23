// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;

var moment = require('alloy/moment');
var todos = Alloy.Collections.todo;
var id;

// $model represents the current model accessible to this
// controller from the markup's model-view binding. $model
// will be null if there is no binding in place.
if ($model) {	// $model != null && $model != 'undefined'
	id = $model.id;	// Set id from the current row's object
	if ($model.get('done')) { // Set styling for finished tasks
		$.row.backgroundColor = '#eee';	// light gray
		$.check.backgroundColor = '#eee';
		$.task.color = '#ccc';	// Color text darker gray
		$.check.image = '/tick_64.png';
	} else { // set styling for undone tasks
		$.row.backgroundColor = '#fff';	// white
		$.check.backgroundColor = '#fff';
		$.task.color = '#000';	// Color text black
		$.check.image = '/tick_gray_64.png';
	}
}

// toggle the "done" status of the IDed todo
function toggleStatus(e) {
	// find the todo task by id
	var todo = todos.get(id);	// local todo != global todo

	// set the current "done" and "date_completed" fields for the model,
	// then save to the presistence layer, and model-view binding will
	// automatically reflect this in the tableview
	todo.set({
		"done": todo.get('done') ? 0 : 1,	// invert done's value
		"date_completed": moment().unix()	// set time stamp
	}).save();
}

// delete the IDed todo from the collection
function deleteTask(e) {
	// prevent bubbling up to the row
	e.cancelBubble = true;

	// find the todo task by id
	var todo = todos.get(id);	// local todo != global todo

	// destroy the model from persistence layer, which will in turn remove
	// it from the collection, and model-view binding will automatically
	// reflect this in the tableview
	todo.destroy();
}