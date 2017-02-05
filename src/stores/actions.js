import axios from "axios";

axios.defaults.baseURL = "https://monitor.katastr.io";

export default {
    getAdministrativeUnits(context) {
        return axios.get("administrative_units")
            .then((res) => {
                context.commit("LOAD_ADMINISTRATIVE_UNITS", res.data);
                return res.data;
            }).catch((err) => {
                return;
            });
    },

    getDates(context) {
        return axios.get("dates")
            .then((res) => {
                context.commit("LOAD_DATES", res.data);
                return res.data;
            }).catch((err) => {
                return;
            });
    },

    loadGeometry(context) {
        const cur = context.state.administrative_units.currentItem;

        if (!cur) {
            context.commit("SET_CURRENT_GEOMETRY", null);
            return;
        }

        return axios.get(`${context.getters.resource.url}/${cur.code}/geometry`)
            .then((res) => {
                context.commit("SET_CURRENT_GEOMETRY", res.data);
                return res.data;
            })
            .catch((err) => {
                return false;
            });
    }
};
