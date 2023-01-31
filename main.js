const btn = document.getElementById("btn");
const a = document.getElementById("a");
const b = document.getElementById("b");
const c = document.getElementById("c");
const d = document.getElementById("d");
const start = document.getElementById("btn-start");
const next = document.getElementById("btn-next");
const again = document.getElementById("btn-again");

start.addEventListener("click", function () {
  const part = document.getElementById("name").value;
  document.getElementById("start").style.display = "none";
  document.getElementById("container").style.display = "block";
  let queue = 1;
  let score = 0;
  //Change questions by JSON
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function () {
    const questions = JSON.parse(this.responseText);
    const numQuestions = Object.getOwnPropertyNames(questions);
    const maxQuestion = numQuestions.length;
    // Timer
    function startTimer(duration, display) {
      var start = Date.now(),
        diff,
        minutes,
        seconds;
      playing = true;
      function timer() {
        if (playing) {
          diff = duration - (((Date.now() - start) / 1000) | 0);
          minutes = (diff / 60) | 0;
          seconds = diff % 60 | 0;
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          display.textContent = "Time " + minutes + ":" + seconds;
          if (diff <= 0) {
            start = Date.now() + 1000;
            playing = false;
            document.getElementById("container").style.display = "none";
            document.getElementById("finish").style.display = "block";
            document.getElementById("name-result").innerHTML = part;
            document.getElementById("score").innerHTML =
              score + "  (" + Math.round((score / maxQuestion) * 100) + "%)";
          }
        }
      }
      timer();
      setInterval(timer, 1000);
    }
    twominutes = 60;
    x = document.querySelector("#time");
    startTimer(twominutes, x);
    ///////////////////////////
    ///  Insert first questions  ///
    document.getElementById("id").innerHTML = `${queue}/${maxQuestion}`;
    const ques = ` 
                <div class="question">
                    <p>${questions[queue].question}</p>
                </div>
                <section class="main">
                    <ul>
                        <li><input type="radio" id="a"  name="check" value="${questions[queue].a}">${questions[queue].a}</li>
                        <li><input type="radio" id="b"  name="check" value="${questions[queue].b}">${questions[queue].b}</li>
                        <li><input type="radio" id="c"  name="check" value="${questions[queue].c}">${questions[queue].c}</li>
                        <li><input type="radio" id="d"  name="check" value="${questions[queue].d}">${questions[queue].d}</li>
                        </ul>
                </section>
            `;
    document.getElementById("change-sections").innerHTML = ques;
    next.addEventListener("click", function () {
      let l1 = document.getElementById("a");
      let l2 = document.getElementById("b");
      let l3 = document.getElementById("c");
      let l4 = document.getElementById("d");
      if (l1.checked || l2.checked || l3.checked || l4.checked) {
        ///////score
        if (l1.checked) {
          if (l1.value == questions[queue].answer) {
            score += 1;
          }
        } else if (l2.checked) {
          if (l2.value == questions[queue].answer) {
            score += 1;
          }
        } else if (l3.checked) {
          if (l3.value == questions[queue].answer) {
            score += 1;
          }
        } else if (l4.checked) {
          if (l4.value == questions[queue].answer) {
            score += 1;
          }
        }
        queue += 1;
        document.getElementById("id").innerHTML = `${queue}/${maxQuestion}`;
        ///////////////////////////
        ///  chenge questions from JSON  ///
        if (queue <= maxQuestion) {
          const ques = ` 
                <div class="question">
                    <p>${questions[queue].question}</p>
                </div>
                <section class="main">
                    <ul>
                        <li><input type="radio" id="a" name="check" value="${questions[queue].a}">${questions[queue].a}</li>
                        <li><input type="radio" id="b" name="check" value="${questions[queue].b}">${questions[queue].b}</li>
                        <li><input type="radio" id="c" name="check" value="${questions[queue].c}">${questions[queue].c}</li>
                        <li><input type="radio" id="d" name="check" value="${questions[queue].d}">${questions[queue].d}</li>
                        </ul>
                </section>
            `;
          document.getElementById("change-sections").innerHTML = ques;
          document.getElementById("container").style.boxShadow =
            "0px 0px 10px #8888";
        } else {
          document.getElementById("container").style.display = "none";
          document.getElementById("finish").style.display = "block";
          document.getElementById("name-result").innerHTML = part;
          document.getElementById("score").innerHTML =
            score + "  (" + Math.round((score / maxQuestion) * 100) + "%)";
          if (score == maxQuestion) {
            document.getElementById("name-result").innerHTML =
              "👍 you are a genius!!! 😉";
          }
        }
      } else {
        document.getElementById("container").style.boxShadow =
          "0px 0px 10px red";
      }
    });
  };
  xmlhttp.open("GET", "question.json");
  xmlhttp.send();
});
//again section
again.addEventListener("click", function () {
  location.reload();
});
