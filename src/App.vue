<template>
  <div id="app">
    <loader v-show="!ready"></loader>
    <search v-show="ready"></search>
    <info v-show="visible"></info>
    <dashboard v-show="visible"></dashboard>
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
    name: 'app',
    components: {
        Dashboard, Info, Loader, Search,
    },
    mounted() {
        this.$store.dispatch("initialize");
    },
    computed: {
        ready() {
            console.log()
            return this.$store.getters.ready;
        },
        visible: function() {
        return !!(this.$store.state.cadastres.currentCadastre && this.$store.state.dates.currentDate);
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

h2 {
  font-weight: 300;
}

input,
input:active,
input:focus,
select {
  border: none;
  border-bottom: 1px solid #1F3C6F;
  font-family: inherit;
  margin-top: 2px;
  outline: none;
  width: auto;
}
</style>
