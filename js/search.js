Monitor.Search = {
    _results: [],
    autocomplete: function() {
        const input = document.querySelector("#cadastre-area");

        input.addEventListener("keyup", this._filter.bind(input, this));
    },
    _filter: function(self, evt) {
        let value = this.value.toString().toLowerCase();

        if (value.length < 2) {
            self._removeList();

            return;
        }

        self._results = Monitor.Data.get().filter((elm) => {
            for (prop of ["ku_nazev", "ku_kod"]) {
                if (elm[prop].toString().toLowerCase().startsWith(value)) {
                    return elm;
                }
            }
        });

        if (self._results) {
            self._addList();
        } else {
            self._removeList();
        }
    },
    _addList: function() {
        document.querySelector(".cadastre-search").appendChild(this._createList(this._results));
    },
    _removeList: () => {
        if (!document.querySelector(".cadastre-area-autocomplete")) {
            return;
        }

        document.querySelector(".cadastre-search")
                .removeChild(document.querySelector(".cadastre-area-autocomplete"));
    },
    _createList: function (arr) {
        let list = document.querySelector(".cadastre-area-autocomplete") || document.createElement("ul");
        let listItem;
        let self = this;

        list.className = "cadastre-area-autocomplete";
        list.innerHTML = ""; // reset existing list

        for (let item of arr) {
            listItem = document.createElement("li");
            listItem.innerHTML = `${item.ku_nazev} / ${item.ku_kod}`;
            listItem.addEventListener("click", function(e) {
                self._selectCadastre(item);
            });
            list.appendChild(listItem);
        }

        if (arr.length === 0) {
            listItem = document.createElement("li");
            listItem.innerHTML = 'Nebyly nalezeny žádné záznamy.';
            list.appendChild(listItem);
        }

        return list;
    },
    _selectCadastre: function(d) {
        const input = document.querySelector("#cadastre-area");
        input.value = d.ku_nazev;
        this._removeList();

        return Monitor.Data.setCurrent(d);
    }
}

Monitor.Search.autocomplete();
