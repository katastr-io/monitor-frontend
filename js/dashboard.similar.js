Monitor.Dashboard.Similar = {
    init: function() {
        this._listenDatachange();
    },
    _listenDatachange: function() {
        document.querySelector(".similar-cadastres").addEventListener("datachange", this._redraw.bind(this));
        document.querySelector(".similar-cadastres").addEventListener("datechange", this._redraw.bind(this));
    },
    _redraw: function() {
        const items = this._findSimilar(10);
        const parent = document.querySelector(".similar-cadastres");
        const list = document.querySelector(".similar-cadastres p") || parent.appendChild(document.createElement("p"));

        list.innerHTML = "";
        parent.style.visibility = "visible";

        items.forEach(_createLink);

        function _createLink(elm, idx, arr) {
            const len = arr.length - 1;
            const link = document.createElement("a");
            link.href = "#";
            link.innerHTML = elm.ku_nazev;

            link.addEventListener("click", (e) => {
                Monitor.Search._selectCadastre(elm);
            });

            list.appendChild(link);

            if (idx < len) {
                list.appendChild(document.createTextNode(", "));
            }
        }
    },
    _findSimilar: function(howMany) {
        const cur = Monitor.Data.getCurrent();
        const date = Monitor.Data.getCurrentDate();
        const dateIdx = Monitor.Mapper.getDatePosition(date);
        let lookup = {};

        Monitor.Data.get().forEach((elm) => {
            lookup[elm.ku_kod] = elm;
        });


        let tmp = Monitor.Data.get().filter((elm) => {
            return elm.ku_nazev !== cur.ku_nazev;
        }).map((elm) => {
            let keys = Object.keys(elm);
            let values = Object.values(elm);
            let result = {}

            result[keys.shift()] = values.shift(); // ku_kod
            result[keys.shift()] = values.shift(); // ku_nazev

            values.reduce((prev, next, idx) => {
                prev[keys[idx]] = next[dateIdx];
                return prev;
            }, result);

            return result;
        });

        tmp.forEach((elm) => {
            elm.similarity = 0;

            for (let prop in elm) {
                if (!prop.endsWith("_v_r")) {
                    continue;
                }

                elm.similarity += Math.pow(cur[prop][dateIdx] - elm[prop], 2);
            }
        });

        tmp = tmp.sort((a, b) => {
            return a.similarity - b.similarity;
        })
        .slice(0,howMany)
        .map((elm) => {
            return elm.ku_kod;
        });

        let results = [];

        tmp.forEach((elm) => {
            results.push(lookup[elm]);
        });

        return results;
    }
}

Monitor.Dashboard.Similar.init();
