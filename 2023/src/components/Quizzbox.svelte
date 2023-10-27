<script>
  import question from '../data/places.json';

  let score = 0;
  let day = 0
  let user_answer = ''
  let response = ''

	function answerClick() {
		day += 1;
	}
</script>
 
<div class="Quizzbox"> 
    <div class="scorebox">Score : {score} / {day}</div>
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
        <button on:click={answerClick}>Submit!
         </button></p>
    </div>
    <div class="answerbox">
      <p>Answer: {question[day].place}</p>
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
</style>