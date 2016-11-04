Monitor.Data = {
    setCurrent: function(cadastre) {
        this.current = this.data.find((elm) => {
            return cadastre.ku_nazev = elm.ku_nazev;
        });

        return this.current;
    },
    store: function(data) {
        this.data = data;
    }
}
