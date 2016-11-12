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
    },
    setCurrentDate: function(d) {
        this.date = d;

        let evt = new CustomEvent("datechange");
        document.querySelector(".chart").dispatchEvent(evt);
        document.querySelector(".info").dispatchEvent(evt);


        return this.date;
    },
    getCurrentDate: function() {
        return this.date || Monitor.Mapper._dates[0];
    },
    setCurrentLineType: function(d) {
        this.lineType = d;

        let evt = new CustomEvent("linetypechange");
        document.querySelector(".line-chart").dispatchEvent(evt);

        return this.lineType;
    },
    getCurrentLineType: function() {
        return this.lineType || Object.keys(Monitor.Mapper._lineTypes)[0];
    }
}
