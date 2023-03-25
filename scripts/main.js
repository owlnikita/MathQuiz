let questionField = document.querySelector('.question');
let answerBtns = document.querySelectorAll('.variants li');

let main = document.querySelector('.main')
let start = document.querySelector('.start')
let containerH3 = document.querySelector('.container_h3')
let h3Text = document.querySelector('.h3-text')
let startBtn = document.querySelector('.start_btn')

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

function randint(min,max){
    return Math.round(Math.random() * (max - min) + min)
}

let sings = ['+','-','*','/']

function getRandomSign(){
    return sings[randint(0,3)];
}
  
class Question {
    constructor() {
        let a = randint(0,12);
        let b = randint(0,12);
        let sign = getRandomSign();
        if (sign === '+'){
            this.correct = a + b;
        } else if (sign === '-'){
            this.correct = a - b;
        } else if (sign === '*'){
            this.correct = a * b;
        }else if (sign === '/'){
            while (!Number.isInteger(a / b)) { 
                a = randint(1, 12);
                b = randint(1, 12);
            }
            this.correct = a / b;
        }
        this.question = `${a} ${sign} ${b}`;
        this.answers = shuffle([
            randint(this.correct - 6, this.correct - 1),
            randint(this.correct - 6, this.correct - 1),
            this.correct,
            randint(this.correct + 1, this.correct + 6),
            randint(this.correct + 1, this.correct + 6),
        ]);
    }

    display () {
        questionField.innerHTML = this.question;
        for (let i = 0; i < this.answers.length; i++) {
            answerBtns[i].innerHTML = this.answers[i]
        }
    }
};



let currentQuestion = new Question()
currentQuestion.display();
let correctAnswers = 0;
let totalAnswers = 0;

startBtn.addEventListener('click', ()=>{
    main.style.display = 'flex'
    start.style.display = 'none'
    h3Text.innerHTML = `` 
    
    setTimeout(() =>{
        let statistic = Math.round(correctAnswers*100/totalAnswers)
        if (totalAnswers === 0){statistic=0}
        h3Text.innerHTML += `Вы дали ${correctAnswers} правильных ответов из ${totalAnswers}.</br>Точность - ${statistic}%` 
        start.style.display = 'block'
        main.style.display = 'none'
        containerH3.style.display = 'block'
        correctAnswers = 0
        totalAnswers = 0
}, 15000)
})

for(let i = 0; i < answerBtns.length; i++) {
    answerBtns[i].addEventListener('click', function () {
        totalAnswers++
        if (answerBtns[i].innerHTML == currentQuestion.correct) {
            correctAnswers++
            answerBtns[i].style.backgroundColor = '#00F353';
            anime({
                targets: answerBtns[i],
                backgroundColor: '#33D6A5',
                duration: 300,
                delay: 100,
                easing: 'linear',
            });
        } else {
            answerBtns[i].style.backgroundColor = '#CE0F0F';
            anime({
                targets: answerBtns[i],
                backgroundColor: '#33D6A5',
                duration: 300,
                delay: 100,
                easing: 'linear',
            });
        }

        currentQuestion = new Question()
        currentQuestion.display()
    });
};





