export default {
    state: {
        list: [
            "1. 1. 2015",
            "1. 4. 2015",
            "1. 7. 2015",
            "1. 10. 2015",
            "1. 1. 2016",
            "1. 4. 2016",
            "1. 7. 2016",
            "1. 10. 2016"
        ],
        currentDate: null
    },
    mutations: {
        selectDate(state, date) {
            state.currentDate = date;
        }
    }
};
