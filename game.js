const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswer = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is 2 + 2?',
        choice1: '5',
        choice2: '1',
        choice3: '4',
        choice4: '32',
        answer: 3,
    },
    {
        question: 'When is Mateos birthday?',
        choice1: '28',
        choice2: '24',
        choice3: '29',
        choice4: '27',
        answer: 2,
    },
    {
        question: 'Where is the tallest building located?',
        choice1: 'Dubai',
        choice2: 'New York',
        choice3: 'Chicago',
        choice4: 'Texas',
        answer: 1,
    },
    {
        question: 'What grade is Mateo in?',
        choice1: '12th',
        choice2: '4th',
        choice3: '11th',
        choice4: '3rd',
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0  
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionIndex, 1)

    acceptingAnswer = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswer) return

        acceptingAnswer = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })   
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()