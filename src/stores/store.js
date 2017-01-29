import Vue from "vue";
import Vuex from "vuex";
import administrative_units from "./administrative_units";
import cadastres from "./cadastres";
import charts from "./charts";
import dates from "./dates";
import dimensions from "./dimensions";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        administrative_units: administrative_units,
        cadastres: cadastres,
        charts: charts,
        dates: dates,
        dimensions: dimensions
    },
    actions
});
