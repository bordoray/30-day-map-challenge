<script>
  import { onMount, onDestroy } from 'svelte'
  import { Map, NavigationControl} from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';

  export let map;
  let mapContainer;


  onMount(() => {

    const { env } = _process;
    const apiKey = env.API_KEY;

    if (!apiKey) {
      throw new Error("You need to configure env API_KEY first, see README");
    }

    const initialState = { lng: 0, lat: 0, zoom: 1 };
  
    map = new Map({
      container: mapContainer,
      style: {
            'version': 8,
            "glyphs": "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
            'sources': {
                'raster-tiles': {
                    'type': 'raster',
                    'tiles': [
                        'https://api.maptiler.com/maps/jp-mierune-streets/{z}/{x}/{y}.png?key=' + apiKey
                    ],
                    'tileSize': 256,
                    'attribution':
                        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a> <a href="https://maptiler.jp/" target="_blank">&copy; MIERUNE</a>'
                }
            },
            'layers': [
                {
                    'id': 'simple-tiles',
                    'type': 'raster',
                    'source': 'raster-tiles',
                    'minzoom': 0,
                    'maxzoom': 22
                }
            ]
        },
      // style: `https://api.maptiler.com/maps/jp-mierune-streets/style.json?key=${apiKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
    map.addControl(new NavigationControl(), 'top-right');


  });

  onDestroy(() => {
		map.remove();
	});

</script>

<div class="map-wrap">
  <a href="https://www.maptiler.com" class="watermark"><img
      src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"/></a>
  <div class="map" id="map" bind:this={mapContainer}></div>
</div>

<style>

.map-wrap {
  position: relative;
  width: 100%;
  height: calc(100vh - 77px); /* calculate height of the screen minus the heading */
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
