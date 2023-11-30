<script>
	import { Styles } from 'sveltestrap';

	import Navbar from './components/Navbar.svelte';
	import Map from './components/Map.svelte';
	import Quizzbox from './components/Quizzbox.svelte';
	let map;
	let theme = 'auto';
</script>
<Styles {theme} />
<div class="app">
	<Navbar />
	<div class="container">
		<Quizzbox bind:map/>
		<Map bind:map/>
	</div>
	<div class="container link">
		<a href="https://bordoray.github.io/30-day-map-challenge/2023/" target="_blank">See 2023 gallery</a>
	</div>
	<div class="container footering">
		&copy; bordoray #30DayMapChallenge 2023. All rights reserved.
	</div>
</div>

<style>
.app {
  text-align: center;
  /* font-family: "Lucida Grande",monospace; */
}
.container{
	width:100%;
	display: flex;
}
.footering{
	text-align: center;
	padding: 10px;
}
.link{
    text-align: right;
}
a{
	color: inherit;
  	text-decoration: inherit;
}
</style>