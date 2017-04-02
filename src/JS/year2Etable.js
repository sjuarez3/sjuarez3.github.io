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
// EnrolledCourses array
var enrolledCoursesList = [];

// year1 planner table
student2.on('value', function(snapshot) {
	var i = 0;
    var j =0;
    var index = 0;
    student2EnrolledCoursesList = snapshot.val().coursesEnrolled;
	var tableBody = document.getElementById("year2");
	snapshot.forEach(function(snap) {
        while(i<student2EnrolledCoursesList.length){
        courseList[i] = student2EnrolledCoursesList[i];
        index = courseList[i].search(/\d/);
        if(courseList[i][index] == 2){
		var tr = document.createElement("tr");
		tr.className = "plannerContainerRow";
		tableBody.appendChild(tr);
		var td = document.createElement("td");
		td.className = "plannerColumn";
		tr.appendChild(td);

		td.innerHTML = "<br><b> &#10005" + courseList[i]
        i++;
        }
            else{
                i++;
            }
        }
        
	});
});





