// database reference
var database = firebase.database();

// subjects reference
var subjects = database.ref('subjects');

// declare subjects array
var subjectList = [];

// courses reference
var courses = database.ref('courses');

// decalre courses array
var courseList = [];

// subjects dropdown menu
subjects.on('value', function(snapshot) {
	var i = 0;
	
	// loop through each element in subjects document
	snapshot.forEach(function(snap) {

		var subject = snap.val().subject;
		subjectList[i++] = subject; 
		var sel = document.getElementById('subjectSelect');
		var opt = document.createElement('option');
		opt.innerHTML = subject;
		opt.value = subject;
		sel.appendChild(opt);
	});
	for(i = 0; i < subjectList.length; i++)
	{
		console.log(subjectList[i]);
	}
});


// list courses
function listCourses() {
    var selectedSubject = document.getElementById('subjectSelect').value;
	var i = 0;
	var li = document.getElementsByClassName('courseCode');

	courses.on('value', function(snapshot) {
		snapshot.forEach(function(snap) {

			courseList[i] = snap.val(); 

			var courseCode = "test";
			var title = snap.val().title;
			var subject = snap.val().subject;
			var breadthType = snap.val().breadthType;
			var description = snap.val().description;
			
			if(selectedSubject == subject)
			{
				courseCode = snap.val().courseCode;
			}

			var innerHtml = li[i].innerHTML;
			
			if(innerHtml != courseCode)
			{
				li[i].style.display = "none";
			}
			else
			{
				li[i].style.display = "unset";
			}
			i++;
		});
	});
}