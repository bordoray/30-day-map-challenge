<script>
  import question from '../data/places.json';
</script>
 
<div class="Quizzbox"> You can click to enlarge image
    <div class="quizz">
      {#each question as mapday}
         <p>Day {mapday.day}: {mapday.theme}</p>
         <p>{mapday.question}</p>
         <a href="./img/{mapday.day}.png" target="_blank">
            <img class="quizz-img" src="./img/{mapday.day}.png" />
         </a>
      {/each}
    </div>
  </div>

<style>
.Quizzbox {
  width:100%
}

.quizz-img {
    width: 100%; /* Make the image adapt to the width of the parent div */
    height: auto; /* Maintain the aspect ratio */
  }
</style>