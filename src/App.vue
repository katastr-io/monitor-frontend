<template>
  <div id="app">
    <loader v-show="!ready"></loader>
    <search></search>
    <info v-show="visible"></info>
    <dashboard v-show="visible"></dashboard>
    <h1 v-show="!visible">Monitor využití pozemků v KN sleduje vývoj v&nbsp;katastrálních územích, obcích, okresech a&nbsp;krajích České republiky.</h1>
  </div>
</template>

<script>
import Dashboard from "./components/Dashboard";
import Info from "./components/Info";
import Loader from "./components/Loader";
import Search from "./components/Search";
import store from "./stores/store";

export default {
    store,
    name: "app",
    components: {
        Dashboard, Info, Loader, Search
    },
    mounted() {
        this.$store.dispatch("getAdministrativeUnits");
        this.$store.dispatch("getDates");
    },
    computed: {
        ready() {
            return this.$store.state.administrative_units.currentType && this.$store.state.dates.current;
        }
    }
};
</script>

<style>
body {
    background: white;
    color: #1F3C6F;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    margin: 2rem 1.5rem;
}

[v-cloak] {
  display: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}

.slow-fade-enter-active, .slow-fade-leave-active {
    transition: opacity 1.5s;
}

.fade-enter, .fade-leave-active,
.slow-fade-enter, .slow-fade-leave-active {
  opacity: 0
}

.line-break {
  width: 100%;
}

input {
  padding-bottom: 2px;
  padding-top: 2px;
}

select {
  background: white;
  border: none;
  margin-top: -2px !important;
  padding-left: 1rem;
}

h1 {
  font-weight: 300;
  margin: 4rem auto;
  width: 50%;
}

h2 {
  font-weight: 300;
}

input,
input:active,
input:focus,
select {
  border: none;
  font-family: inherit;
  margin-top: 2px;
  outline: none;
  width: auto;
}

rect {
  shape-rendering: crispEdges;
}
</style>
