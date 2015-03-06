//var select = document.getElementById('length');    
//
//for (var i = 0; i<= 24; i++){
//    
//    var option = document.createElement('option');
//    option.value = i;
//    option.innerHTML = i;
//    select.options.add(option);
//}


var difficulty = {};
difficulty['1'] = [1,2,3];
difficulty['2'] = [4,5,6];
difficulty['3'] = [7,8,9];

window.changeList = function () {
    var diffList = document.getElementById("diffList");
    var numbRange = document.getElementById("numbList");
    
    var selectDiff = diffList.options[diffList.value].value;
    while(numbRange.options.length)
    {
        numbRange.remove(0);
    }
    var diff = difficulty[selectDiff];
    if(diff)
    {
        var i;
        for(i = 0; i < diff.length; i++)
        {
            var difficulty2 = new Option(diff[i], i);
            numbRange.options.add(difficulty2);
        }
    }
}


function confirmation() {
    var answer = confirm("Return to menu?");
    if(answer)
    {
        window.location = "homepage.html";
    }
    else
    {
//        alert("yay")
    }
    
}



// Only works if it's in .html; NEED TO FIX
//        $(document).ready(function() {
//    $("#numbers_only").keydown(function (e) {
//        // Allow: backspace, delete, escape, enter.
//        if ($.inArray(e.keyCode, [46, 8, 27, 13, 110]) !== -1 ||
//             // Allow: Ctrl+A
//            (e.keyCode == 65 && e.ctrlKey === true) || 
//             // Allow: home, end, left, right
//            (e.keyCode >= 35 && e.keyCode <= 39)) {
//                 // let it happen, don't do anything
//                 return;
//        }
//        // Ensure that it is a number and stop the keypress
//        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//            e.preventDefault();
//        }
//    });
//});