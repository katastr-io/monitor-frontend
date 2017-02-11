<template>
    <transition name="slow-fade">
        <header>
            <div class="search-unit-box">
              <form>
                  <select @change="changeAdministrativeUnit">
                      <option :value="au.name" v-for="au in this.$store.state.administrative_units.list">{{ au.repr }}</option>
                  </select>
              </form>
            </div>
            <div class="search-name-box">
                <form autocomplete="off">
                  <input @input="autocomplete" @blur="reset" :value="this.$store.state.administrative_units.searchText" type="text" id="search-name" placeholder="jméno nebo kód" autofocus>
                </form>
                <div>
                    <loader transition="fade" v-show="requested"></loader>
                     <ul v-show="results.length" class="search-name-autocomplete">
                        <li @click="select(result, $event)" v-for="result in results">{{ result.name }} / {{result.code }}</li>
                    </ul>
                    <p v-if="notFound">Nenašli jsme žádné výsledky</p>
                </div>
            </div>
            <div class="search-date-box">
              <form>
                  <select @change="setDate">
                      <option :value="date.valid_at" v-for="date in this.reverseDates">{{ date.repr }}</option>
                  </select>
              </form>
            </div>
        </header>
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
      reset() {
        this.$store.commit("SEARCH_TEXT", this.currentSearch);
        /* wait before resetting the search results, selection is not possible otherwise */
        debounce(function() { this.results = [];}, 100)();
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

<style>
    header {
      align-items: baseline;
      border-bottom: 2px solid #1F3C6F;
      flex-wrap: wrap;
      display: flex;
      position: relative;
      width: 100%;
    }

      header h1,
      header div {
        flex-grow: 1;
      }

      header h1,
      input,
      select,
      option {
        color: #1F3C6F;
        font-size: 2.6rem;
        font-weight: 300;
      }

      header h1 {
          color: #1F3C6F;
          font-size: 2.6rem;
          font-weight: 300;
          text-transform: uppercase;
          width: auto;
      }

      input {
        padding-bottom: 2px;
        padding-top: 2px;
      }

        header .search-date-box form:before {
            content: "stav k";
        }

    ul.search-name-autocomplete {
      border-bottom: 1px solid #1F3C6F;
      border-top: 1px solid #1F3C6F;
      list-style: none;
      padding-left: 0px;
    }

      ul.search-name-autocomplete li {
        cursor: pointer;
        padding-bottom: 8px;
        padding-top: 8px;
      }

    select {
    background: white;
    border: none;
    margin-top: -2px !important;
    padding-left: 1rem;
    }

    .search-name-box .showbox {
        top: 40px;
    }
</style>
