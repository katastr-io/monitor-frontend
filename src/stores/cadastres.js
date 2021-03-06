export default {
    state: {
        list: [],
        currentCadastre: null,
        searchText: ""
    },
    getters: {
        ready(state) {
            return state.list.length !== 0;
        }
    },
    mutations: {
        selectCadastre(state, cadastre) {
            state.currentCadastre = cadastre;
        },
        LOAD_DATA(state, data) {
            state.list = data;
        }
    }
};
