<script>
	import { onMount, onDestroy } from 'svelte'
	import { Map, NavigationControl} from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { Button} from 'sveltestrap';
	export let showModal; // boolean

	let dialog; // HTMLDialogElement
	export let mapresult;
	let mapContainer;

	$: if (dialog && showModal) dialog.showModal();

	onMount(() => {

	const { env } = _process;
	const apiKey = env.API_KEY;

	if (!apiKey) {
	throw new Error("You need to configure env API_KEY first, see README");
	}

	const initialState = { lng: 0, lat: 10, zoom: 0.1 };

	mapresult = new Map({
	container: mapContainer,
	style: `https://api.maptiler.com/maps/jp-mierune-streets/style.json?key=${apiKey}`,
	center: [initialState.lng, initialState.lat],
	zoom: initialState.zoom
	});
	// mapresult.addControl(new NavigationControl(), 'top-right');


	});

	onDestroy(() => {
		mapresult.remove();
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<slot />
		<div class="map-wrap">
			<a href="https://www.maptiler.com" class="watermark"><img
				src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"/></a>
			<div class="map" id="map" bind:this={mapContainer}></div>
		  </div>
		<div class="close-modal-button">
		<!-- svelte-ignore a11y-autofocus -->
			<Button autofocus on:click={() => dialog.close()}>close</Button>
		</div>
	</div>
</dialog>

<style>
	dialog {
		max-width: 400px;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	
	.close-modal-button{
		margin-top: 10px;
	}

	.map-wrap {
		position: relative;
		width: 100%;
		height: 40vh; /* calculate height of the screen minus the heading */
}

	.map {
	width: 100%;
	height: 100%;
	align-self: flex-start;
	}

	.watermark {
	position: absolute;
	left: 10px;
	bottom: 10px;
	z-index: 999;
	
	}
</style>
