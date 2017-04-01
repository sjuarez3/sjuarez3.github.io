// store temporary id for last clicked id
var tmp = 'course';
   function showhide(id) {
        //hide tmp
        var a = document.getElementById(tmp);
           a.style.display = 'none'
           //show clicked id
       var e = document.getElementById(id);
          e.style.display = 'block';

       tmp = id;
       //test tmp
//       window.alert(tmp);
   }