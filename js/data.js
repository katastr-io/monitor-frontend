Monitor.Data = {
    _loadExternalData: function() {
        return new Promise((resolve, reject) => {
            let s = document.createElement("script");
            s.setAttribute("src", "../data/data.js");
            s.setAttribute("async", true);

            s.addEventListener("load", function() {
                resolve(data);
            });

            s.addEventListener("error", function() {
                reject(`Data from failed to load.`);
            });

            document.body.appendChild(s);
        });
    },
    load: function() {
        if (!this.IndexedDB.exists()) { // if not:
            this._loadExternalData() //      load the data/data.js file asynchronously
                .then((res) => {
                    return this.store(res);
                }).then((res) => {
                    return this.IndexedDB.write(Monitor.Data.get()); // store the data in the database
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            this.IndexedDB.outdated()
                .then((outdated) => {
                    this.IndexedDB.read()
                        .then((res) => {
                            Monitor.Data.store(res.map(elm => elm.value));
                        });

                    if (!outdated) {
                        return;
                    }

                    this._loadExternalData()
                        .then((res) => {
                            return this.store(res);
                        }).then((res) => {
                            return this.IndexedDB.write(Monitor.Data.get());
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                });
        }
    },
    setCurrent: function(cadastre) {
        let _new = this.data.find((elm) => {
            return cadastre.ku_nazev === elm.ku_nazev;
        });

        document.querySelector("#cadastre-area").value = `${_new.ku_nazev} / ${_new.ku_kod}`;

        if (this.current !== _new) {
            this.current = _new;
            let evt = new CustomEvent("datachange");
            document.querySelector(".chart").dispatchEvent(evt);
            document.querySelector(".info").dispatchEvent(evt);
            document.querySelector(".similar-cadastres").dispatchEvent(evt);
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
        document.querySelector(".similar-cadastres").dispatchEvent(evt);

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
