<template>
    <transition name="slow-fade">
        <section>
            <form autocomplete="off">
                <select @change="changeAdministrativeUnit" v-bind:class="{border: this.results.length}">
                    <option :value="au.name" v-for="au in this.$store.state.administrative_units.list">{{ au.repr }}</option>
                </select>
                <div>
                    <input @input="autocomplete" :value="this.$store.state.administrative_units.searchText" type="text" id="search-name" placeholder="jméno nebo kód" autofocus>
                    <loader transition="fade" v-show="requested"></loader>
                    <ul v-show="results.length">
                        <li @click="select(result, $event)" v-for="result in results">{{ result.name }} / {{result.code }}</li>
                    </ul>
                    <p v-if="notFound">Nenašli jsme žádné výsledky</p>
                </div>
                <select @change="setDate" v-bind:class="{border: this.results.length}">
                    <option :value="date.valid_at" v-for="date in this.reverseDates">{{ date.repr }}</option>
                </select>
            </form>
        </section>
    </transition>
</template>

<script>
import Loader from "./Loader";
import debounce from "lodash/debounce";

export default {
    name: "search",
    components: {
        Loader
    },
    data() {
      return {
        results: [],
        requested: false
      };
    },
    computed: {
      reverseDates() {
        return this.$store.getters.reverseDates;
      },
      currentDate() {
        return this.$store.state.dates.current;
      },
      currentSearch() {
        if (!this.$store.state.administrative_units.currentItem) {
            return;
        }

        return `${this.$store.state.administrative_units.currentItem.name} / ${this.$store.state.administrative_units.currentItem.code}`;
      },
      notFound() {
        return this.$store.state.administrative_units.searchText &&
            !this.$store.state.administrative_units.currentItem &&
            this.$store.state.administrative_units.searchText.length > 2 &&
            this.results.length === 0 &&
            !this.requested;
      }
    },
    watch: {
      currentDate() {
        let au = this.$store.state.administrative_units.currentItem;

        if (!au) {
          return;
        }

        this.select(this.$store.state.administrative_units.currentItem);
      }
    },
    methods: {
      autocomplete(e) {
        let self = this;
        let value = e.target.value;

        this.$store.commit("SEARCH_TEXT", value);

        if (!value) {
            this.$store.commit("SET_CURRENT_ADMINISTRATIVE_UNIT", null);
            this.$store.dispatch("loadGeometry");
        }

        if (value.length < 2) {
          this.results = [];
          return;
        }

        /* if ctrl or any other `meta` key except delete and backspace */
        if (e.ctrlKey || (e.keyCode < 50 && e.keyCode != 8 && e.keyCode != 46)) {
          return;
        }

        const lookup = debounce(
            function() {
                self.$http.post(`${self.$store.getters.resource.url}/lookup`, {
                  query: value,
                  valid_at: self.currentDate.valid_at
                }).then((res) => {
                    self.results = res.data;
                    self.requested = false;
                    return res.data;
                  }).catch((err) => {
                    self.requested = false;
                    return false;
                  });
            }, 500);

        this.requested = true;
        lookup();
      },
      select(item, e) {
        this.$http.get(`${this.$store.getters.resource.url}/${item.code}/${this.currentDate.valid_at}`)
          .then((res) => {
            this.$store.commit("SET_CURRENT_ADMINISTRATIVE_UNIT", res.data);
            this.$store.commit("SEARCH_TEXT",`${item.name} / ${item.code}`);
            this.$store.dispatch("loadGeometry");
            this.results = [];
          }).catch((err) => {
            return false;
          });
      },
        changeAdministrativeUnit(e) {
            if (this.$store.state.administrative_units.currentType.name !== e.target.value) {
                this.$store.commit("SET_CURRENT_ADMINISTRATIVE_UNIT", null);
                this.$store.commit("SEARCH_TEXT", null);
                this.$store.dispatch("loadGeometry");
            }

            this.$store.commit("SET_CURRENT_ADMINISTRATIVE_UNIT_TYPE", e.target.value);
        },
      setDate(e) {
        this.$store.commit("SET_CURRENT_DATE", e.target.value);
      }
    }
};
</script>

<style scoped>
    section {
        padding-top: 1.5rem;
        width: 100%;
    }

    form {
        align-items: baseline;
        border-bottom: 1px solid #1F3C6F;
        display: flex;
    }

    div {
        flex-grow: 3;
        display: flex;
        flex-wrap: wrap;
        margin-left: 15px;
        margin-right: 15px;
        position: relative;
    }

    input, select {
        margin-left: .5rem;
        margin-right: .5rem;
    }

    input {
        padding-bottom: 1px;
    }

    select {
        flex-grow: 1;
    }

    select.border {
        border-bottom: 1px solid #1F3C6F;
    }

    ul {
        max-height: 20rem;
        overflow: auto;
    }

    ul, p {
        border-top: 1px solid #1F3C6F;
        flex-basis: 100%;
        margin: 0;
        padding: 0;
        padding-left: .4rem;
    }

    li, p {
        padding-bottom: .4rem;
        padding-top: .4rem;
    }

    ul li {
        border-bottom: 1px solid #efefef;
        cursor: pointer;
        list-style: none;
    }

    /* loader */
    .showbox {
        top: 40px;
        margin-right: auto;
        margin-left: auto;
        width: 60px;
    }
</style>
