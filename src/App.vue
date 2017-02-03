<template>
    <div id="app">
        <main>
            <loader transition="slow-fade" v-show="!loaded"></loader>
            <search id="search" v-show="loaded"></search>
            <info v-show="visible"></info>
            <dashboard v-show="visible"></dashboard>
            <transition appear name="slow-fade">
                <h1 v-show="!visible">Monitor využití pozemků v KN sleduje vývoj v&nbsp;katastrálních územích, obcích, okresech a&nbsp;krajích České republiky.</h1>
            </transition>
        </main>
        <footer class="box">
            <small><a href="//www.katastr.io">www.katastr.io</a></small>
        </footer>
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
    data() {
        return {
            loaded: false
        }
    },
    mounted() {
        this.loaded = true;
    },
    created() {
        this.$store.dispatch("getAdministrativeUnits");
        this.$store.dispatch("getDates");
    },
    computed: {
        visible() {
            return !!(this.$store.state.administrative_units.currentItem && this.$store.state.dates.current);
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
    margin: 0;
    padding: 0;
}

div#app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}

#search {
    margin-top: 1.5rem;
}

main {
    flex: 1 0 auto;
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

.box {
    background: #EDEDF3;
    border-bottom: 1px solid #C7C7CD;
    border-top: 1px solid #C7C7CD;
    flex-basis: 100%;
    margin-top: 2rem;
    padding: .5rem;
}

.box a {
    color: #091B3C;
}

.box a:hover,
.box a:active,
.box a:focus {
    color: #1F3C6F;
}

.box h2 small {
    font-size: 0.8rem;
}

footer {
    margin-bottom: .5rem;
    text-align: center;
}
</style>
