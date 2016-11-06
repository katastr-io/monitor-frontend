Monitor.Data = {
    setCurrent: function(cadastre) {
        let _new = this.data.find((elm) => {
            return cadastre.ku_nazev === elm.ku_nazev;
        });

        if (this.current !== _new) {
            this.current = _new;
            let evt = new CustomEvent("datachange");
            document.querySelector(".chart").dispatchEvent(evt);
            document.querySelector(".info").dispatchEvent(evt);
        }

        return this.current;
    },
    getCurrent: function() {
        return this.current;
    },
    store: function(data) {
        this.data = data;

        return this.data;
    },
    get: function() {
        return this.data;
    }
}
