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


function countCompletedCourse(){
    student2.on('value', function(snapshot) {

       
        snapshot.forEach(function(snap) {
             var c = snapshot.val().completedCourses.length;
            var i= returnNumberOfRequirements();
            var u = c/i;
            u=u.toFixed(3);
            var div = document.getElementById("bar");
            div.style.width=u*100+"%";
            var p = document.getElementById("prog");
            var a = document.createElement("p");
            p.appendChild(a);
            a.style.position="absolute";
            a.innerHTML="Now you have: "+ c*0.5 + "/" + i*0.5 + " credits"+" as " + u*100 +"%" + " in progress";
            console.log(u);
            
        });
    });

}

var requirementsList =[];
var counter = 0;
cshonors.on('value', function(snapshot) {
   requirementsList = snapshot.val().mandatoryRequirements;

});


function returnNumberOfRequirements() {
	for(var i = 0; i < cshonorsrequirements.length; i++) {}
//	window.alert(i);
    return i;
}

countCompletedCourse();



