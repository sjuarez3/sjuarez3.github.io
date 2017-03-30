// database reference
var database = firebase.database();

// subjects reference
var subjects = database.ref('subjects');

// courses reference
var courses = database.ref('courses');

// subjects dropdown menu
subjects.on('value', function(snapshot) {
	snapshot.forEach(function(snap) {

		var subject = snap.val().subject;
		var sel = document.getElementById('subjectSelect');
		var opt = document.createElement('option');
		opt.innerHTML = subject;
		opt.value = subject;
		sel.appendChild(opt);
	});
});

// list courses
function listCourses() {
    var selectedCourse = document.getElementById("subjectSelect").value;	

	courses.on('value', function(snapshot) {
		snapshot.forEach(function(snap) {

			var course = snap.val().subject;
			var ul = document.getElementById('courselist');
			li = ul.getElementsByTagName('li');
			if(course == selectedCourse)
			{
				var opt = document.createElement('li');
				opt.innerHTML = course;
				opt.value = course;
				ul.appendChild(opt);
			}
		});
	});
}