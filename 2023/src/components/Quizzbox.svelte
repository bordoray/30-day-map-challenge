<script>
  import { Button, Input, Col, Row} from 'sveltestrap';
  import question from '../data/places.json';
  import Modal from './Modal.svelte';
  import 'maplibre-gl/dist/maplibre-gl.css';
  
  export let map;
  let score = 0;
  let count = 0;
  let day = 0;
  let user_answer = '';
  let answer_message = '';
  let answer_result = '';
  let answer_result_color = '#99140b'
  let answer_comment = ''
  let image_status = 'q'
  let next_button_text = 'Give up'
  let showModal = false
  let score_comment = ''
  let display_image = 'none';


	function answerClick() {
    count += 1
    submitBtn.disabled = true
    inputBox.disabled = true
    display_image = 'block'
    next_button_text = 'Next'
    answer_message = "The answer is " + question[day].place + "."
    answer_comment = question[day].place_comment
    if (question[day].accepted_places.split(",").includes(user_answer.toLowerCase())){
      answer_result = 'Correct!'
      score += 1
      answer_result_color = '#0b9917'
    }
    else{
      answer_result = 'Oh no!'
      answer_result_color = '#99140b'
    }

    image_status = 'r'
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

    let place_layer = 'place_'+question[day].day.toString()
    map.addLayer({
      id: place_layer,
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
      id: place_layer + "_label",
      source: place_source,
      type: 'symbol',
      paint: {
        'text-color': "#FFF"
      },
      layout: {
        'text-field': ['get', 'day'],
        'text-size': 14 
      }
    });
		
	}

  function nextClick(){
    if(next_button_text == 'Next'){
      switchNextDay()
    } else if (next_button_text == 'Result'){
      game_over()
    } else {
      answerClick()
    }
    return
  }

  function game_over(){
    submitBtn.disabled = true
    inputBox.disabled = true
    // nextBtn.disabled = true
    if (score == 30) {
      score_comment = 'You are my Master. Unfortunately, I cannot offer you a trip to those places, but a peaceful tatami room is waiting for you in our home at Mashiko in Japan'
    } else if (score == 29) {
      score_comment = 'Almost perfect! Does a typing error makes you miss the last point?'
    } else if (score >= 26) {
      score_comment = 'Great! You know the world like the back of your hand.'
    } else if (score >= 20) {
      score_comment = 'Nice! I guess you are a confirmed geographer.'
    } else if (score >= 15) {
      score_comment = 'Good! You are an initiated geographer.'
    } else if (score >= 10) {
      score_comment = 'Many corners of the world still unexplored.'
    } else if (score >= 5) {
      score_comment = 'Take your bag and go explore the world. Or simply take a map and read it for a while.'
    } else {
      score_comment = 'Either you do not know how to read maps, or I cannot make readable maps.'
    }
    showModal = true
    next_button_text = 'Result'
  }

  function switchNextDay(){
    // map
    map.flyTo({
      center: [0,0], 
      zoom: 1,
      speed: 10
    });

    if (count >= 30){
      game_over()
    } else {
      image_status = 'q'
      next_button_text = 'Give up'
      user_answer = ''
      answer_message = ''
      answer_result = ''
      answer_comment = ''
      day += 1;
      count = day
      submitBtn.disabled = false
      inputBox.disabled = false
      display_image = 'none'
    } 
  }
</script>
 
<div class="Quizzbox"> 
  <Modal bind:showModal>
    <h2 slot="header">
      GAME OVER!
    </h2>
    <div>Your score</div>
    <div class="scorebox">{score}/{count}</div>
    <div class="scorecomment">{score_comment}</div>
  </Modal>
  <div class="quizz">
  <Row>
    <Col xs="8">Day {question[day].day}: {question[day].theme}</Col>
    <Col xs="4">Score</Col>
  </Row>
  <Row>
    <Col xs="8">{question[day].question}</Col>
    <Col xs="4"><div class="scorebox">{score}/{count}</div></Col>
  </Row>
     
  <a href="./img/{image_status}/{question[day].day}.png" target="_blank">
    <img class="quizz-img" src="./img/{image_status}/{question[day].day}.png" alt="map_{question[day].day}" />
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
      <Row>
        <Col xs="8">
          <Input id="inputBox" bind:value={user_answer} placeholder="Your answer" />
        </Col>
        <Col xs="2">
          <Button id="submitBtn" color="light" on:click={answerClick}>Submit!</Button>
        </Col>
        <Col xs="2"><Button id="nextBtn" color="light" outline on:click={nextClick} >{next_button_text}</Button>
        </Col>
      </Row>
    </div>
    <div class="answerbox">
      <Row>
        <div id="resultText" class="result" style="--theme-color: {answer_result_color}">{answer_result}</div>
      </Row>
      <Row>
        <Col xs="3">
          <div style="display: {display_image}">
            <div id="resultText" class="result"><a href="./img/i/{question[day].day}.jpeg" target="_blank">
              <img class="quizz-img" src="./img/i/{question[day].day}.jpeg" alt="illus_{question[day].day}" />
            </a></div>
            <div class="caption">{question[day].photo_source}</div>
          </div>
        </Col>
        <Col xs="9"><div class="answermsg">{answer_message}</div>
          <div><i>{answer_comment}</i></div>
        </Col>
      </Row>
    </div>
    <Button id="submitBtndev" color="light" on:click={switchNextDay}>Next for dev use</Button>
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
  padding-bottom : 10px;
  font-size: 20pt;
  font-weight: bold;
}

.answerbox{
  padding: 5px;
}

.submit{
  padding-top: 10px;
}

.result{
  color: var(--theme-color);
  font-size: 20pt;
  font-weight: bold;
}

.answermsg{
  font-size: 20pt;
}

.scorecomment{
  padding: 10px;
}

.caption{
  font-size: 7pt;
  text-align: left;
}
</style>