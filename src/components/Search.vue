<template>
    <transition name="slow-fade">
        <header>
            <h1>Katastrální území</h1>
            <div class="cadastre-search">
                <input @keyup="autocomplete" :value="this.STATE.cadastres.searchText" type="text" id="cadastre-area" placeholder="jméno nebo kód" autofocus>
                <div v-show="searchResults.length">
                    <ul class="cadastre-area-autocomplete">
                        <li @click="selectCadastre(result, $event)" v-for="result in searchResults">{{ result.ku_nazev }} / {{result.ku_kod }}</li>
                    </ul>
                </div>
            </div>
            <div class="cadastre-date">
            <form>
                <select :value="currentDate" @change="selectDate">
                    <option :value="date" v-for="date in this.STATE.dates.list">{{ date }}</option>
                </select>
            </form>
            </div>
        </header>
    </transition>
</template>

<script>
export default {
    name: "search",
    data() {
        return {
            searchResults: [],
            STATE: this.$store.state
        };
    },
    computed: {
        currentDate() {
            return this.STATE.dates.currentDate;
        }
    },
    mounted() {
        this.$store.commit("selectDate", this.STATE.dates.list[0]);
    },
    methods: {
        autocomplete(e) {
            let value = e.target.value;
            let elm = document.querySelector(".cadastre-area-autocomplete");

            this.$store.commit("SEARCH_TEXT", value);

            if (value.length < 2) {
                this.searchResults = [];
                elm.style.visibility = "hidden";

                return;
            }

            elm.style.visibility = "visible";

            this.searchResults = this.$store.state.cadastres.list.filter((elm) => {
                for (let prop of ["ku_nazev", "ku_kod"]) {
                    if (elm[prop].toString().toLowerCase().startsWith(value)) {
                        return elm;
                    }
                }
            });
        },
        selectCadastre(cadastre, e) {
            this.$store.commit("selectCadastre", cadastre);
            this.$store.commit("SEARCH_TEXT",`${cadastre.ku_nazev} / ${cadastre.ku_kod}`);
            this.searchResults = [];

            if (e) {
                e.target.parentNode.style.visibility = "hidden";
            }

            this.$emit("test");
        },
        selectDate(e) {
            this.currentDate = e.target.value;
            this.$store.commit("selectDate", e.target.value);

            if (this.STATE.cadastres.currentCadastre) {
                this.selectCadastre(this.STATE.cadastres.currentCadastre);
            }
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

      header form {
          border-bottom: 1px solid #1F3C6F;

      }

        header form:before {
            content: "stav k";
        }

    ul.cadastre-area-autocomplete {
      border-bottom: 1px solid #1F3C6F;
      list-style: none;
      padding-left: 0px;
    }

      ul.cadastre-area-autocomplete li {
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
</style>
