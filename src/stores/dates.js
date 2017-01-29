export default {
    state: {
        list: [],
        current: null
    },
    getters: {
        reverseDates: state => {
            return [].concat(state.list).reverse(); // avoid in place reversion
        },
        stringDates: state => {
            return state.list.map(elm => elm.repr);
        }
    },
    mutations: {
        LOAD_DATES(state, data) {
            state.list = data;
            state.current = data[data.length - 1];
        },
        SET_CURRENT_DATE(state, date) {
            state.current = state.list.find((elm) => elm.valid_at === date);
        }
    }
};
