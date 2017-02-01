<template>
    <transition name="slow-fade">
        <header>
            <div class="search-unit-box">
              <form>
                  <select @change="changeAdministrativeUnit">
                      <option :value="au.name" v-for="au in this.STATE.administrative_units.list">{{ au.repr }}</option>
                  </select>
              </form>
            </div>
            <div class="search-name-box">
                <form autocomplete="off">
                  <input @keyup="autocomplete" @blur="reset" :value="this.STATE.administrative_units.searchText" type="text" id="search-name" placeholder="jméno nebo kód" autofocus>
                </form>
                <div>
                    <loader v-show="requested"></loader>
                    <ul v-show="results.length" class="search-name-autocomplete">
                        <li @click="select(result, $event)" v-for="result in results">{{ result.name }} / {{result.code }}</li>
                        <li v-if="notFound">Nenašli jsme žádné výsledky</li>
                    </ul>
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

export default {
    name: "search",
    components: {
        Loader
    },
    data() {
      return {
        results: [],
        requested: false,
        STATE: this.$store.state
      };
    },
    computed: {
      reverseDates() {
        return this.$store.getters.reverseDates;
      },
      currentDate() {
        return this.STATE.dates.current;
      },
      currentSearch() {
        if (!this.STATE.administrative_units.currentItem) {
            return;
        }

        return `${this.STATE.administrative_units.currentItem.name} / ${this.STATE.administrative_units.currentItem.code}`;
      },
      notFound() {
        return this.STATE.administrative_units.searchText && this.results.length === 0 && !this.requested;
      }
    },
    watch: {
      currentDate() {
        let au = this.STATE.administrative_units.currentItem;

        if (!au) {
          return;
        }

        this.select(this.STATE.administrative_units.currentItem);
      }
    },
    methods: {
      autocomplete(e) {
        let value = e.target.value;
        let elm = document.querySelector(".search-name-autocomplete");

        this.$store.commit("SEARCH_TEXT", value);

        if (!value) {
            this.$store.commit("SET_CURRENT_ADMINISTRATIVE_UNIT", null);
        }

        if (value.length < 2) {
          this.results = [];
          elm.style.display = "none";

          return;
        }

        elm.style.display = "block";

        /* if ctrl or any other `meta` key except delete and backspace */
        if (this.requested || e.ctrlKey || (e.keyCode < 50 && e.keyCode != 8 && e.keyCode != 46)) {
          return;
        }

        this.requested = true;
        this.$http.post(`${this.$store.getters.resource.url}/lookup`, {
          query: value,
          valid_at: this.currentDate.valid_at
        }).then((res) => {
            this.results = res.data;
            this.requested = false;
            return res.data;
          }).catch((err) => {
            this.requested = false;
            return false;
          });
      },
      reset() {
        this.$store.commit("SEARCH_TEXT", this.currentSearch);
      },
      select(item, e) {
        this.$http.get(`${this.$store.getters.resource.url}/${item.code}/${this.currentDate.valid_at}`)
          .then((res) => {
            this.$store.commit("SET_CURRENT_ADMINISTRATIVE_UNIT", res.data);
            this.$store.commit("SEARCH_TEXT",`${item.name} / ${item.code}`);
            this.results = [];
            e.target.parentNode.style.visibility = "hidden";
          }).catch((err) => {
            return false;
          });
      },
        changeAdministrativeUnit(e) {
            if (this.STATE.administrative_units.currentType.name !== e.target.value) {
                this.$store.commit("SET_CURRENT_ADMINISTRATIVE_UNIT", null);
                this.$store.commit("SEARCH_TEXT", null);
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
