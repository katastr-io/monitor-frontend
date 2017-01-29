export default {
    state: {
        list: [],
        currentType: null,
        currentItem: null,
        searchText: ""
    },
    getters: {
        resource(state) {
            let resource = {
                url: null,
                plural: null
            };

            switch (state.currentType && state.currentType.name) {
                case "area":
                    resource.url = "/cadastral_areas";
                    resource.plural = "katastrální území";
                    break;
                case "municipality":
                    resource.url = "/municipalities";
                    resource.plural = "obce";
                    break;
                case "county":
                    resource.url = "/counties";
                    resource.plural = "okresy";
                    break;
                case "region":
                    resource.url = "/regions";
                    resource.plural = "kraje";
                    break;
            }

            return resource;
        }
    },
    mutations: {
        LOAD_ADMINISTRATIVE_UNITS(state, data) {
            state.list = data;
            state.currentType = data[0];
        },
        SET_CURRENT_ADMINISTRATIVE_UNIT_TYPE(state, name) {
            state.currentType = state.list.find((elm) => elm.name === name);
        },
        SET_CURRENT_ADMINISTRATIVE_UNIT(state, item) {
            state.currentItem = item;
        },
        SEARCH_TEXT(state, text) {
            state.searchText = text;
        }
    }
};
