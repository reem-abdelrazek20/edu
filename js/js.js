const container = document.querySelector(".container");
const box = document.querySelector(".box-questions");
const buttonPrevious = document.querySelector(".Previous");
const buttonNext = document.querySelector(".Next");
const button = document.querySelector(".button");
let number = 0; 
let questions = []; 
let score = 0;
let answered = []; // لتتبع الأسئلة اللي تجاوبت

fetch("/questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
      if (number >= questions.length) {
        button.innerHTML=`<button class="restart">إعادة المحاولة </button>`
    box.innerHTML = `
      <div class="result">
        <h2>انتهيت من الأسئلة!</h2>
        <p>نتيجتك النهائية: ${score} من ${questions.length}</p>
           <h4>"بالتوفيق!  لو استفدت، ادعولي "</h4>
        
      </div>
    `;
    
    
    document.querySelector(".restart").addEventListener("click", () => {
      number = 0;
      score = 0;
      answered = [];
      showQuestion();
    });
    return; // نوقف الدالة هنا
  }
  box.innerHTML = `
    <div class="top"><p class="question-number">السؤال ${number + 1} من ${questions.length}</p>
        <p class="score">نتيجتك الحالية: ${score}</p>
        </div>
    <p class="question-text">${questions[number].question}</p>
    <div class="options">
      ${questions[number].options
        .map(option => `<button class="option">${option}</button>`)
        .join("")}
    </div>

  `;

  document.querySelectorAll(".option").forEach(btn => {
    btn.addEventListener("click", () => {
      // لو السؤال لسه ما تجاوبش عليه
      if (!answered.includes(number)) {
        if (btn.textContent === questions[number].answer) {
          btn.style.backgroundColor = "green"; 
          score++;
        } else {
          btn.style.backgroundColor = "red"; 
            document.querySelectorAll(".option").forEach(optionBtn => {
          if(optionBtn.textContent === questions[number].answer) {
            optionBtn.style.backgroundColor = "green";
          }
        });
        

        }
        answered.push(number); 
      }
    });
  });
}

buttonNext.addEventListener("click", () => {
  if (number < questions.length ) {
    number++;
    showQuestion();
  }
});

buttonPrevious.addEventListener("click", () => {
  if (number > 0) {
    number--;
    showQuestion();
  }
});
