Monitor.Search = {
    autocomplete: function() {
        const input = document.querySelector("#cadastre-area");
        let results = [];

        input.addEventListener("keyup", this._filter.bind(input, this));
    },
    _filter: function(self, evt) {
        let value = this.value.toString().toLowerCase();

        if (value.length < 2) {
            self._removeList();

            return;
        }

        results = cadastreAreas.filter((elm) => {
            for (prop in elm) {
                if (elm[prop].toString().toLowerCase().startsWith(value)) {
                    return elm;
                }
            }
        });

        if (results) {
            self._addList(results);
        } else {
            self._removeList();
        }
    },
    _addList: function(elm) {
        document.querySelector(".cadastre-search").appendChild(this._createList(results));
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
        let listItem, listItemLink;
        list.className = "cadastre-area-autocomplete";
        list.innerHTML = ""; // reset existing list

        for (let item of arr) {
            listItem = document.createElement("li");
            listItem.innerHTML = `${item.ku_nazev} / ${item.ku_kod}`;
            listItem.addEventListener("click", (e) => {
                this._selectCadastre(item);
            });
            list.appendChild(listItem);
        }

        return list;
    },
    _selectCadastre: function(d) {
        Monitor.Data.setCurrent(d);
    }
}

Monitor.Search.autocomplete();
