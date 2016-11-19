import Dexie from "dexie";

export default {
    initialize(context) { // this is really ugly!
        if (!database.exists()) {
        loadExternalData()
            .then((res) => {
                context.commit("LOAD_DATA", res);
                database.write(res);
            });
        } else {
            database.isOutdated(context)
                .then((outdated) => {
                    database.read()
                        .then((res) => {
                            context.commit("LOAD_DATA", res.map(elm => elm.value))
                            if (!outdated) {
                                return;
                            }

                            loadExternalData()
                                .then((res) => {
                                    context.commit("LOAD_DATA", res);
                                    database.write(res);
                                });
                        })
                });
        }
    }
};

function loadExternalData() {
    return fetch("./static/data.js")
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        });
}

const database = {
    exists() {
        return window.localStorage.getItem("db");
    },
    isOutdated(ctx) {
        return this.open()
            .then((db) => {
                return db.cadastres.toCollection()
                    .first()
                    .then((item) => {
                        return item && ctx.state.dates.list.length !== item.value.celkova_vymera.length;
                    }).catch((err) => {
                        console.error(err);
                    })
            });
    },
    open() {
        const db = new Dexie("database");
        db.version(1).stores({
            cadastres: "code, value"
        });

        window.localStorage.setItem("db", true);

        return db.open();
    },
    read() {
        return this.open().then(res => res.cadastres.toArray());
    },
    write(data) {
        let keys = data.map(elm => elm.ku_kod);
        let obj = keys.map((elm, idx) => ({code: elm, value: data[idx]}));

        return this.open()
            .then((res) => {
                res.cadastres.clear();
                return res.cadastres.bulkAdd(obj);
            }).catch((err) => {
                console.log(err);
            });
    }
};
