const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName('choice-text'))
const progresstext = document.getElementById('progresstext')
const scoretext = document.getElementById('scoretext')
const progressbarfull = document.getElementById('progressbarfull')
const loader = document.getElementById('loader');
const game = document.getElementById('game')
let currentquestion = {};
let acceptinganswers = false;
let score = 0 
let questioncounter = 0
let availablequestion = []

let questions = [];
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
.then((res)=>
    {
        return res.json();
    })
.then((loadedquestions)=>{
   console.log(loadedquestions);
   questions = loadedquestions.results.map((loadedquestion) =>{
    const formattedquestion = {
        question : loadedquestion.question,
    };
    const answerchoices = [...loadedquestion.incorrect_answers];
    formattedquestion.answer =  Math.floor(Math.random() * 4)+1
    answerchoices.splice(
        formattedquestion.answer - 1,
        0,
        loadedquestion.correct_answer);
   

   answerchoices.forEach((choice,index) => {
    formattedquestion['choice'+(index+1)] = choice
   });
   return formattedquestion
})

startgame();
})
.catch((err)=>
{
    console.log(err)
})

const correct_bonus = 10;
const max_questions = 3;

startgame = ()=>
{
    questioncounter = 0
    score = 0
    availablequestion = [...questions]
    getnewquestion();
    game.classList.remove('hidden')
    loader.classList.add('hidden')

}
getnewquestion = ()=>
{
    if(availablequestion.length === 0 || questioncounter>= max_questions)
    {
        localStorage.setItem('mostrecentscore',score)
        return window.location.assign("end.html")
    }
    questioncounter++;
    progresstext.innerText = `Question:${questioncounter}/${max_questions}`
// update the progress bar
   progressbarfull.style.width = `${(questioncounter/max_questions) * 100}%`
    const questionindex = Math.floor(Math.random()*availablequestion.length)
    currentquestion = availablequestion[questionindex]

question.innerText = currentquestion.question
choices.forEach(choice=>{
        const number = choice.dataset['number']
        choice.innerText = currentquestion['choice'+number]
    })
    availablequestion.splice(questionindex,1)
    console.log(availablequestion);
    acceptinganswers = true
};
choices.forEach(choice =>{
    choice.addEventListener('click',e=>{
      
        if(!acceptinganswers)return;

   
        acceptinganswers = false;
        const selectedchoice = e.target;
        const selectedans = selectedchoice.dataset['number']
        let classtoapply = 'incorrect'
        if(selectedans == currentquestion.answer)
        {
            classtoapply = 'correct'

        }
        if(classtoapply =='correct')
        {
            incrementscore(correct_bonus)
        }
       
     
        selectedchoice.parentElement.classList.add(classtoapply)
        setTimeout(()=>
        {
            selectedchoice.parentElement.classList.remove(classtoapply)
            getnewquestion();
        },1000)
        


    })
})

incrementscore = num=>{
    score+=num
    scoretext.innerText = score
}

