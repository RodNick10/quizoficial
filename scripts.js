var mainDiv = document.getElementById("questionsDiv");

function myFunction() {
  if (mainDiv.style.display === "none") {
    mainDiv.style.display = "block";
  } else {
    mainDiv.style.display = "none";
  }
  //startTimer(fiveMinutes, display);
}

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}
window.addEventListener("click", function() {
  //window.onload = function() {
  var fiveMinutes = 60 * 5,
    display = document.querySelector("#time");
  startTimer(fiveMinutes, display);
});

var questions = [
  {
    q: "Is JavaScript a case-sensitive language?",
    o: ["yes ", "no ", "depends ", "never "],
    a: 0
  },
  {
    q: "How can you get the type of arguments passed to a function?",
    o: [
      "using typeof operator",
      "using getType funciton",
      "Both of the above",
      "None of the above"
    ],
    a: 0
  },
  {
    q: "How can you get the total number of arguments passed to a function?",
    o: ["using args.length property", "using arguments.length", "none", "both"],
    a: 1
  },
  {
    q:
      "Which of the following type of variable is visible only within a function where it is defined?",
    o: ["global variable", "local variable", "both", "none"],
    a: 1
  },
  {
    q:
      "Which of the following function of String object combines the text of two strings and returns a new string?",
    o: ["add()", "merge()", "concat()", "append"],
    a: 2
  }
];

var quiz = {
  draw: function() {
    var wrapper = document.getElementById("quiz-wrap");

    for (var index in questions) {
      var number = parseInt(index) + 1;
      var qwrap = document.createElement("div");
      qwrap.classList.add("question");

      var question = document.createElement("h3");
      question.innerHTML = number + ") " + questions[index]["q"];
      qwrap.appendChild(question);

      //
      for (var oindex in questions[index]["o"]) {
        //
        var label = document.createElement("label");
        qwrap.appendChild(label);

        //
        var option = document.createElement("input");
        option.type = "radio";
        option.value = oindex;
        option.required = true;
        option.classList.add("oquiz");

        option.name = "quiz-" + number;
        label.appendChild(option);

        var otext = document.createTextNode(questions[index]["o"][oindex]);
        label.appendChild(otext);
      }

      // Finally, add this question to the main HTML quiz wrapper
      wrapper.appendChild(qwrap);
    }

    var submitbutton = document.createElement("input");
    submitbutton.type = "submit";
    wrapper.appendChild(submitbutton);
    wrapper.addEventListener("submit", quiz.submit);
  },

  submit: function(evt) {
    // quiz.submit() : Handle the calculations when the user submits to quiz

    // Stop the form from submitting
    evt.preventDefault();
    evt.stopPropagation();

    // Remember that we added an "oquiz" class to all the options?
    // We can easily get all the selected options this way
    var selected = document.querySelectorAll(".oquiz:checked");

    // Get the score
    var score = 0;
    for (var index in questions) {
      if (selected[index].value == questions[index]["a"]) {
        score++;
      }
      //else {
      //timer.value = timer.value - "00:10";
      //var timerRemaining = fiveMinutes - timer.value;
      //timer = timerremaining.value - "00:10";
      //var penaltyTimer = timer.value;
      //penaltyTimer = timer.value - "00:10";
      //}
    }
    // We can calculate the score now
    var total = selected.length;
    var percent = score / total;

    // Update and show the score
    // Instead of creating elements, we can also directly alter the inner HTML
    var html = "<h1>";
    if (percent >= 0.7) {
      html += "WELL DONE!";
    } else if (percent >= 0.4) {
      html += "NOT BAD!";
    } else {
      html += "TRY HARDER!";
    }
    html += "</h1>";
    html += "<div>You scored " + score + " out of " + total + ".</div>";
    document.getElementById("quiz-wrap").innerHTML = html;
  }
};

/* [INIT] */
window.addEventListener("load", quiz.draw);
