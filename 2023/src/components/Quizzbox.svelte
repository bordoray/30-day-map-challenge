<script>
  import question from '../data/places.json';

  let score = 0;
  let count = 0;
  let day = 0;
  let user_answer = '';
  let answer_message = '';
  let answer_result = '';

	function answerClick() {
    count += 1
    submitBtn.disabled = true
    answer_message = "The answer is " + question[day].place
    if (user_answer == question[day].place){
      answer_result = 'Correct!'
      score += 1
    }
    else{
      answer_result = 'Oh no!'
    }
		
	}
  function switchNextDay(){
    user_answer = ''
    answer_message = ''
    answer_result = ''
    day += 1;
    count = day
    submitBtn.disabled = false


  }
</script>
 
<div class="Quizzbox"> 
    <div class="scorebox">Score : {score} / {count}</div>
    <div class="quizz">
      <p>Day {question[day].day}: {question[day].theme}</p>
         <p>{question[day].question}</p>
         <a href="./img/{question[day].day}.png" target="_blank">
            <img class="quizz-img" src="./img/{question[day].day}.png" />
         </a>
      <!-- {#each question as mapday}
         <p>Day {mapday.day}: {mapday.theme}</p>
         <p>{mapday.question}</p>
         <a href="./img/{mapday.day}.png" target="_blank">
            <img class="quizz-img" src="./img/{mapday.day}.png" />
         </a>
         
      {/each} -->
    </div>
    <div class="submit">
      <p><input bind:value={user_answer} placeholder="Your answer" />
        <button id="submitBtn" on:click={answerClick}>Submit!</button></p>
    </div>
    <div class="result">{answer_result}</div>
    <div class="answerbox">
      <p>{answer_message}</p>
      <button on:click={switchNextDay}>Next</button>
    </div>
  </div>

<style>
.Quizzbox {
  width: 100%;
  padding: 10px 
}

.quizz-img {
    width: 100%; /* Make the image adapt to the width of the parent div */
    height: auto; /* Maintain the aspect ratio */
  }

.scorebox{
  padding : 10px
}
.answerbox{
  padding: 20px;
}
</style>