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

// students reference
var students = database.ref('students');

// student1 reference John Smith
var student1 = database.ref('students/0');

// student2 reference Jane Doe
var student2 = database.ref('students/1');

// students courses array
var studentList = [];

// programs reference
var programs = database.ref('programs');

// programs reference honors CS 
var cshonors = database.ref('programs/0');

// programs reference majors CS
var csmajor = database.ref('programs/1');

// programs courses array
var programsList = [];

// completedCourses courses array
var completedCoursesList = [];

// for switching profiles
var s=-1;

student1.on('value', function(snapshot) {
	student1CompletedCoursesList = snapshot.val().completedCourses;
});

student2.on('value', function(snapshot) {
	student2CompletedCoursesList = snapshot.val().completedCourses;
});


                             

csmajor.on('value', function(snapshot) {
	csmajorRequirements = snapshot.val().mandatoryRequirements;
});

cshonors.on('value', function(snapshot) {
	cshonorsrequirements = snapshot.val().mandatoryRequirements;
});

// show complete text below completed courses
function showCourseInformation() {
	var courseCodeColumn1 = document.getElementsByClassName('courseCodeColumn1');
	var i = 0;
	
	for (i = 0; i < courseCodeColumn1.length; i++)
	{
		courseCode = courseCodeColumn1[i].getElementsByTagName("h3")[0].innerHTML;
		if (cshonorsrequirements.indexOf(courseCode) > -1)
		{
			var mandatory = document.createElement('p');
			mandatory.innerHTML = "Type: <b>Mandatory</b>";
			courseCodeColumn1[i].appendChild(mandatory);
		}
		else
		{
			var optional = document.createElement('p');
			optional.innerHTML = "Type: <b>Optional</b>";
			courseCodeColumn1[i].appendChild(optional);
		}
		if (student2CompletedCoursesList.indexOf(courseCode) > -1)
		{
			var newcontent = document.createElement('p');
			newcontent.innerHTML = "&#9989; Completed";
			courseCodeColumn1[i].appendChild(newcontent);
		}
		else
		{
			var addButton = document.createElement('button');
			addButton.innerHTML = "Add to Planner";
			addButton.className = "addButton";
			courseCodeColumn1[i].appendChild(addButton);
		}
	}
}

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
		
		var antiRequisites = "";
		var preRequisites =  "";
		
		if(typeof courseList[i].antiRequisites != 'undefined')
		{
			antiRequisites = courseList[i].antiRequisites;
		}
		if(typeof courseList[i].preRequisites != 'undefined')
		{
			preRequisites = courseList[i].preRequisites;
		}
		
		td.innerHTML = "<br><b>" + courseList[i].title + "</b><br></br><i>" + courseList[i].description + "<br><p>Anti-Requisite(s): " + antiRequisites + "<br>Pre-Requisites(s): " + preRequisites + "<br>Units: " + courseList[i].units + "</p><br></i>"   
		tr.appendChild(td);
		i++;
	});
});

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



// profile section
students.once('value', function(snapshot) {
	var studentName = document.getElementById('studentName');
	var studentProgram = document.getElementById('studentProgram');
	var studentYear = document.getElementById('studentYear');

	snapshot.forEach(function(snap) {

		var firstName = snap.val().firstName;
		var lastName = snap.val().lastName;
		var program = snap.val().program;
		var year = snap.val().year;
		
		studentName.innerHTML = "<b>" + firstName + " " + lastName + "</b>";
		studentProgram.innerHTML = "Program: " + program;
		studentYear.innerHTML = "Year: " + year;
	});
	showCourseInformation();
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
			
			if(innerHtml == "All")
			{
				courseTableRow[i].style.display = "";
			}
			else if(!innerHtml.includes(courseCode))
			{
				courseTableRow[i].style.display = "none";
			}
			else
			{
				courseTableRow[i].style.display = "";
			}
			i++;
		});
	});
}

// filter list by search
function filterCoursesBySearch() {
	// Declare variables 
	var i;
	var courseCode;
	var input = document.getElementById('searchCourses');
	var filter = input.value.toUpperCase();
	var courseTableRow = document.getElementsByClassName('courseTableRow');
	var courseCodeColumn1 = document.getElementsByClassName('courseCodeColumn1');

	for (i = 0; i < courseTableRow.length; i++) {
	  courseCode = courseTableRow[i].getElementsByTagName("td")[0].innerHTML;
	  if (courseCode.toUpperCase().indexOf(filter) > -1) {
		courseTableRow[i].style.display = "";
	  }
	  else
	  {
		courseTableRow[i].style.display = "none";
	  }
	}
}

// show all courses
function showAllCourses() {
	// Declare variables 
	var i;
	var courseCode;
	var courseTableRow = document.getElementsByClassName('courseTableRow');
	var courseCodeColumn1 = document.getElementsByClassName('courseCodeColumn1');

	for (i = 0; i < courseTableRow.length; i++) {
		courseTableRow[i].style.display = "";
	}
}
	
// filter list by lvl 1000 courses
function filterByFirstYearCourses() {
	// Declare variables 
	var i;
	var courseCode;
	var courseTableRow = document.getElementsByClassName('courseTableRow');
	var courseCodeColumn1 = document.getElementsByClassName('courseCodeColumn1');
	var index = 0;

	for (i = 0; i < courseTableRow.length; i++) {
	  courseCode = courseTableRow[i].getElementsByTagName("h3")[0].innerHTML;
	  index = courseCode.search(/\d/);
	  if (courseCode[index] == 1) {
		courseTableRow[i].style.display = "";
	  }
	  else
	  {
		courseTableRow[i].style.display = "none";
	  }
	}
}

// filter list by lvl 2000 courses
function filterBySecondYearCourses() {
	// Declare variables 
	var i;
	var courseCode;
	var courseTableRow = document.getElementsByClassName('courseTableRow');
	var courseCodeColumn1 = document.getElementsByClassName('courseCodeColumn1');
	var index = 0;

	for (i = 0; i < courseTableRow.length; i++) {
	  courseCode = courseTableRow[i].getElementsByTagName("h3")[0].innerHTML;
	  index = courseCode.search(/\d/);
	  if (courseCode[index] == 2) {
		courseTableRow[i].style.display = "";
	  }
	  else
	  {
		courseTableRow[i].style.display = "none";
	  }
	}
}

// filter list by lvl 3000 courses
function filterByThirdYearCourses() {
	// Declare variables 
	var i;
	var courseCode;
	var courseTableRow = document.getElementsByClassName('courseTableRow');
	var courseCodeColumn1 = document.getElementsByClassName('courseCodeColumn1');
	var index = 0;

	for (i = 0; i < courseTableRow.length; i++) {
	  courseCode = courseTableRow[i].getElementsByTagName("h3")[0].innerHTML;
	  index = courseCode.search(/\d/);
	  if (courseCode[index] == 3) {
		courseTableRow[i].style.display = "";
	  }
	  else
	  {
		courseTableRow[i].style.display = "none";
	  }
	}
}

// filter list by lvl 4000 courses
function filterByFourthYearCourses() {
	// Declare variables 
	var i;
	var courseCode;
	var courseTableRow = document.getElementsByClassName('courseTableRow');
	var courseCodeColumn1 = document.getElementsByClassName('courseCodeColumn1');
	var index = 0;

	for (i = 0; i < courseTableRow.length; i++) {
	  courseCode = courseTableRow[i].getElementsByTagName("h3")[0].innerHTML;
	  index = courseCode.search(/\d/);
	  if (courseCode[index] == 4) {
		courseTableRow[i].style.display = "";
	  }
	  else
	  {
		courseTableRow[i].style.display = "none";
	  }
	}
}

// filter list by completed courses
function filterByCompleteCourses() {
	// Declare variables 
	var i;
	var courseCode;
	var courseTableRow = document.getElementsByClassName('courseTableRow');
	var courseCodeColumn1 = document.getElementsByClassName('courseCodeColumn1');
	var index = 0;
			
	for (i = 0; i < courseTableRow.length; i++)
	{
		courseCode = courseTableRow[i].getElementsByTagName("h3")[0].innerHTML;
		if (student2CompletedCoursesList.indexOf(courseCode) > -1)
		{
			courseTableRow[i].style.display = "";
		}
		else
		{
			courseTableRow[i].style.display = "none";
		}
	}
}

// filter list by mandatory courses
function filterByMandatoryCourses() {
	// Declare variables 
	var i;
	var courseCode;
	var courseTableRow = document.getElementsByClassName('courseTableRow');
	var courseCodeColumn1 = document.getElementsByClassName('courseCodeColumn1');
	var index = 0;
			
	for (i = 0; i < courseTableRow.length; i++)
	{
		courseCode = courseTableRow[i].getElementsByTagName("h3")[0].innerHTML;
		if (cshonorsrequirements.indexOf(courseCode) > -1)
		{
			courseTableRow[i].style.display = "";
		}
		else
		{
			courseTableRow[i].style.display = "none";
		}
	}
}




function progression(){
	var completecount = 0;
	var required = ;
	
	
}



function userLogOut(){
		s = Math.floor(Math.random() *(student.length + 1) );
	
	if(s == null){
		
		s = Math.floor(Math.random() *(student.length + 1) );

	}
	
	else
	{
		 sfirstName =  student[s].firstName;
		 sLastName = student[s].lastName;
		 sprogram = student[s].program;
		 syear = student[s].year;
	}
	
	if(student[s].firstName == sfirstName && student[s].lastName == sLastName ){
		
		userLogOut();
	}
		 firstName =  student[s].firstName;
		 LastName = student[s].lastName;
		 program = student[s].program;
		 year = student[s].year;
}


var selector, elems, makeActive;

selector = '.filterLinks';

elems = document.querySelectorAll(selector);

makeActive = function () {
    for (var i = 0; i < elems.length; i++)
        elems[i].classList.remove('active');
    
    this.classList.add('active');
};

for (var i = 0; i < elems.length; i++)
    elems[i].addEventListener('mousedown', makeActive);

function year1(){
        var i =0;
    	var tableBody = document.getElementById("courseTableBody");
        courseList[i] = completedCoursesList[i];
		var tr = document.createElement("tr");
		tr.className = "plannerContainerRow";
		tableBody.appendChild(tr);
		var td = document.createElement("td");
		td.className = "plannerColumn";
		tr.appendChild(td);

		td.innerHTML = courseList[i]
		i++;
    
}
