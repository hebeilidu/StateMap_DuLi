<template>
  <div >
    <div id="map"></div>
  </div>
</template>
<script>
export default {
  name: "USAMap",
  props: ['city'],
  data: () => {
    return {
      oldMarker: null,
      map: null
    }
  },
  watch: {
    city(newVal){

      fetch(`
        https://maps.googleapis.com/maps/api/geocode/json?address=${newVal}&key=AIzaSyDfW11fnVMuVb5HiTvF0ryjcDWppdVVApU`
      ).then(res => res.json())
      .then(data => {
        if (this.oldMarker) {
          this.oldMarker.setMap(null);
        }
        if (data && data.results[0]) {
          const {lat, lng} = data.results[0].geometry.location;
          const p = { lat, lng };
          // eslint-disable-next-line no-undef
          this.oldMarker = new google.maps.Marker({
            position: p,
            map: this.map,
          });
        }
      })
    }
  },
  mounted() {
    // The location of Uluru
    const center = { lat: 	44.500000, lng: -89.500000 };
    // The map, centered at Uluru
    // eslint-disable-next-line no-undef
    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: center,
    });


  }
}
</script>

<style>
#map {
  width: 800px;
  height: 500px;
}
</style>