<script>
	import Navbar from './components/Navbar.svelte';
	import Map from './components/Map.svelte';
	import Quizzbox from './components/Quizzbox.svelte';
	let map;
</script>

<div class="app">
	<Navbar />
	<div class="container">
		<Quizzbox bind:map/>
		<Map bind:map/>
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
</style>