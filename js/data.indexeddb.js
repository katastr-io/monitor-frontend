"use strict";

Monitor.Data.IndexedDB = {
    exists: function() {
        return window.localStorage.getItem("db");
    },
    outdated: function() {
        return this._open()
            .then((db) => {
                return db.cadastres.toCollection()
                    .first()
                    .then((item) => {
                        return item && Monitor.Mapper._dates.length !== item.value.celkova_vymera.length;
                    });
            });
    },
    _open: function(data) {
        const db = new Dexie("database");
        db.version(1).stores({
            cadastres: "code, value"
        });

        window.localStorage.setItem("db", true);

        return db.open();
    },
    read: function() {
        return this._open().then((res) => {
            return res.cadastres.toArray()
        });
    },
    write: function(data) {
        let keys = data.map(elm => elm.ku_kod);
        let obj = keys.map((elm, idx) => ({code: elm, value: data[idx]}));

        return this._open().then((res) => {
            res.cadastres.clear();
            return res.cadastres.bulkAdd(obj);
        });
    }
};
