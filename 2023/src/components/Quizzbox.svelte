<script>
  import question from '../data/places.json';
  
  export let map;
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

    // map
    map.flyTo({
      center: [question[day].lon,question[day].lat], 
      zoom: question[day].zoom,
      speed: 3
    });

    // add point
    const placedata = {
        'type': 'FeatureCollection',
        'features': [
            {
            'type': 'Feature',
            'properties': {
              "day": question[day].day},
            'geometry': {
                'type': 'Point',
                'coordinates': [question[day].lon,question[day].lat]
            }
            }
        ]
    }

    let place_source = 'place_data_' + question[day].day.toString()
    map.addSource(place_source, {
      type: 'geojson',
      data: placedata
    });

    let color = "#660c06" // red for bad  
    if(answer_result == 'Correct!'){
      color = "#066616";
    }

    map.addLayer({
      id: 'place_'+question[day].day.toString(),
      source: place_source,
      type: 'circle',
      paint: {
        'circle-color': color,
        'circle-opacity': 0.8,
        'circle-radius': 8
        // MapLibre Style Specification paint properties
      },
      layout: {
        // MapLibre Style Specification layout properties
      }
    });

    map.addLayer({
      id: 'place_label_'+question[day].day.toString(),
      // References the GeoJSON source defined above
      // and does not require a `source-layer`
      source: place_source,
      type: 'symbol',
      paint: {
        'text-color': "#FFF"
      },
      layout: {
        'text-field': ['get', 'day'],
        'text-size': 14
        // 'text-color': "#FFF"
        // Set the label content to the
        // feature's `name` property
        
      }
    });
		
	}
  function switchNextDay(){
    user_answer = ''
    answer_message = ''
    answer_result = ''
    day += 1;
    count = day
    submitBtn.disabled = false

    // map
    map.flyTo({
      center: [0,0], 
      zoom: 1,
      speed: 10
    });


  }
</script>
 
<div class="Quizzbox"> 
    <div class="scorebox">Score : {score} / {count}</div>
    <div class="quizz">
      <p>Day {question[day].day}: {question[day].theme}</p>
         <p>{question[day].question}</p>
         <a href="./img/{question[day].day}.png" target="_blank">
            <img class="quizz-img" src="./img/{question[day].day}.png" alt="map_{question[day].day}" />
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
    <div>{map}</div>
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