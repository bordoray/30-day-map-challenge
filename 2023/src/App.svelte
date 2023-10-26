<script>
	import Navbar from './components/Navbar.svelte';
	import Map from './components/Map.svelte';
	import Quizzbox from './components/Quizzbox.svelte';
</script>

<div class="app">
	<Navbar />
	<div class="container">
		<Quizzbox />
		<Map />
	</div>
</div>

<style>
.app {
  text-align: center;
}
.container{
	width:100%;
	display: flex;
}
</style>