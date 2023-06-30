const username = document.getElementById('username')
const savescorebtn = document.getElementById('savescorebtn')
const mostrecentscore = localStorage.getItem('mostrecentscore')
const Finalscore = document.getElementById('Finalscore')

const highscores = JSON.parse(localStorage.getItem('highscores')) || []
const max_high = 5
Finalscore.innerText = mostrecentscore
username.addEventListener('keyup',()=>{
     savescorebtn.disabled = !username.value
})
savehighscore = (e)=>{
  e.preventDefault()
  const score = {
    score:mostrecentscore,
    name:username.value
  }
  highscores.push(score);
  highscores.sort((a,b)=>
  {
    return b.score - a.score
  })
  highscores.splice(5)

  localStorage.setItem('highscores',JSON.stringify(highscores))
  window.location.assign("index.html")
}