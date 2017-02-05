<template>
    <v-map v-if="center" id="map" :zoom=13 :center="center">
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        <v-marker v-if="center" :visible="true" :lat-lng="center"></v-marker>
    </v-map>
</template>

<script>
import L from "leaflet";

export default {
    name: "map",
    computed: {
        geojson() {
            return this.$store.state.administrative_units.currentGeometry;
        },
        center() {
            return this.geojson && L.geoJSON(this.geojson).getBounds().getCenter();
        }
    },
    watch: {
        geojson() {
            return this.geojson;
        },
        center() {
            return this.center;
        }
    }
}
</script>

<style>
div#map {
    border: 1px solid #c7c7cd;
    height: 400px;
    width: 100%;
}
</style>