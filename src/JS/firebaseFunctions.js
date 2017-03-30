// database reference
var database = firebase.database();

// subjects reference
var subjects = database.ref('subjects');

// declare subjects array
var subjectList = [];

// courses reference
var courses = database.ref('courses');

// declare courses array
var courseList = [];

// subjects dropdown menu
subjects.on('value', function(snapshot) {
	var i = 0;
	snapshot.forEach(function(snap) {

		var subject = snap.val().subject;
		subjectList[i++] = subject; 
		var sel = document.getElementById('subjectSelect');
		var opt = document.createElement('option');
		opt.innerHTML = subject;
		opt.value = subject;
		sel.appendChild(opt);
	});
});

// courses table
courses.on('value', function(snapshot) {
	var i = 0;
	var tableBody = document.getElementById("courseTableBody");
	snapshot.forEach(function(snap) {

		courseList[i] = snap.val();
		var tr = document.createElement("tr");
		tr.className = "courseTableRow";
		tableBody.appendChild(tr);
		var td = document.createElement("td");
		td.className = "courseCodeColumn1";
		tr.appendChild(td);
		var h3 = document.createElement("h3");
		h3.innerHTML = courseList[i].courseCode;
		td.appendChild(h3);
		var td = document.createElement("td");
		td.className = "courseCodeColumn2";
		td.innerHTML = "<br><b>" + courseList[i].title + "</b><br></br><i>" + courseList[i].description + "<br><p>Anti-Requisite(s): " + courseList[i].antiRequisites + "<br>Pre-Requisites(s): " + courseList[i].preRequisites + "<br>Units: " + courseList[i].units + "</p><br></i>"   
		tr.appendChild(td);
		i++;
	});
});


// filter courses tables based on selected subject from dropdown menu
function filterCourseTable() {
    var selectedSubject = document.getElementById('subjectSelect').value;
	var courseTableRow = document.getElementsByClassName('courseTableRow');
	var courseCodeColumn1 = document.getElementsByClassName('courseCodeColumn1');
	var i = 0;
	var tableBody = document.getElementById("courseTableBody");

	courses.on('value', function(snapshot) {
		snapshot.forEach(function(snap) {

			courseList[i] = snap.val();			
			
			var courseCode = "notacoursecode";
			var title = courseList[i].title;
			var subject = courseList[i].subject;
			var breadthType = courseList[i].breadthType;
			var description = courseList[i].description;
			
			if(selectedSubject == subject)
			{
				courseCode = courseList[i].courseCode;
			}

			var innerHtml = courseCodeColumn1[i].innerHTML;
			
			if(selectedSubject == "All")
			{
				innerHtml = "All";
			}
			
			console.log(courseCode);
			if(innerHtml == "All")
			{
				if(courseTableRow[i].style.display == "none")
				{
					courseTableRow[i].style.display = "unset"
				}
			}
			else if(!innerHtml.includes(courseCode))
			{
				courseTableRow[i].style.display = "none";
			}
			else
			{
				courseTableRow[i].style.display = "unset";
			}
			i++;
		});
	});
}