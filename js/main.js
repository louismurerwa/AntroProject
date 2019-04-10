var info;
var scoring;
//This function loads the Json
//Loading the json into the data 
window.onload = $.getJSON("js/quiz.json", function (data) {
    //Remove visibility of buttons in the quiz that wwill be used later
    document.getElementById("restart").style.display = "none";
    //Display the title of the question
    document.getElementById("header").innerHTML = "<h2>" + data.title + "</h2>";
    //Load data to a global variable
    info = data;
    //Load the first question.
    loadQuestion(0);
    playQuiz();


});
// This function allows the user to play the user to press next and move to next question
function playQuiz() {
    //Keep track of questions
    var count = 1;
    //Get the next button
    var btn = document.getElementById("subButton");
    //Keeps track of the score that will dertemine the output of the quiz
    scoring = 0;
    //Load next question on clicking next button
    btn.onclick = function (info) {
        var solutions = document.getElementsByName("solution");
        for (var i = 0; i < solutions.length; i++) {
            document.getElementById(solutions[i].id).parentNode.style.color = "black";

        }

        if (!selectOption()) {
            document.getElementById("alert").style.display = "block";
            // alert("Alert Option");
        } else if (count >= 4) {
            //Calculate the current score after selection
            calculate(count - 1);
            //Change color of selected option
            changeState();
            //Display the discover yourself button
            document.getElementById("subButton").style.display = "none";
            document.getElementById("submision").style.display = "flex";

        } else {
            //Calculate the score of this selection
            calculate(count - 1);
            //load next questions to the page
            loadQuestion(count);
            count = count + 1;

        }
    }
}

// This function loads a new question from the java script
function loadQuestion(num) {
    var answers = document.getElementsByClassName("answer");
    for (var i = 0; i < answers.length; i++) {
        document.getElementById("question").innerHTML = '<p id="q1">' + info.questions.options[num].question_name + '</p>';
        answers[i].innerHTML = '<input type="radio" onclick="changeState()"  id="cityquestion' + i + '" value="' + info.questions.options[num].answers[i].text + '" name="solution" /><label for="cityquestion' + i + '">' + info.questions.options[num].answers[i].text + '<img src="' + info.questions.options[num].answers[i].img_url + '" /></label>';
    }
}

//This function changes the color state of the none selected options
function changeState() {
    var solutions = document.getElementsByName("solution");
    for (var i = 0; i < solutions.length; i++) {
        if (solutions[i].checked != true) {
            document.getElementById(solutions[i].id).parentNode.style.color = "red";
        }
    }
}

//The function removers the alert displayed when a user doesnt choose a question
function selectOption() {
    var solutions = document.getElementsByName("solution");
    for (var i = 0; i < solutions.length; i++) {
        if (solutions[i].checked == true) {
            document.getElementById("alert").style.display = "none";
            return true;
        }
    }
}



//This function calculates the score and out puts the outcome of what the user fits into
function score() {
    if (scoring <= 5) {
        document.getElementById("message").innerHTML = "Travel Score " + scoring;
        document.getElementById("funfact").innerHTML = info.outcomes.outcome1.message;
    } else if (scoring > 5 && scoring <= 10) {
        document.getElementById("message").innerHTML = "Travel Score " + scoring;
        document.getElementById("funfact").innerHTML = info.outcomes.outcome2.message;
    } else if (scoring > 10 && scoring <= 15) {
        document.getElementById("message").innerHTML = "Travel Score " + scoring;
        document.getElementById("funfact").innerHTML = info.outcomes.outcome3.message;
    } else {
        document.getElementById("message").innerHTML = "Travel Score " + scoring;
        document.getElementById("funfact").innerHTML = info.outcomes.outcome4.message;
    }
    modal.style.display = "block";
    document.getElementById("submision").style.display = "none";
    document.getElementById("restart").style.display = "flex";
}


//This function keeps track of the the score
function calculate(count1) {

    var solutions = document.getElementsByName("solution");
    for (var i = 0; i < solutions.length; i++) {
        console.log(solutions[i].id);
        if (solutions[i].checked == true) {

            for (var j = 0; j < 4; j++) {
                console.log("louis");
                if (solutions[i].value == info.questions.options[count1].answers[j].text) {
                    scoring = scoring + info.questions.options[count1].answers[j].weight;

                }
            }

        }
    }
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("subButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}