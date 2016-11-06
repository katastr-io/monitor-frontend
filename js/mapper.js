Monitor.Mapper = {};

Monitor.Mapper._colors = {
    orna_puda: "#FBB829",
    chmelnice: "black",
    vinice: "#AB565F",
    zahrada: "black",
    ovocny_sad: "black",
    ttp: "#7FAF1B",
    lesni_pozemek: "#003000",
    vodni_plocha: "#21AABD",
    zastavena_plocha: "#948C75",
    ostatni_plocha: "black"
};

Monitor.Mapper._labels = {
    orna_puda: "orná půda",
    chmelnice: "chmelnice",
    vinice: "vinice",
    zahrada: "zahrada",
    ovocny_sad: "ovocný sad",
    ttp: "trvalý travní porost",
    lesni_pozemek: "lesní pozemek",
    vodni_plocha: "vodní plocha",
    zastavena_plocha: "zastavěná plocha",
    ostatni_plocha: "ostatní plocha"
};

Monitor.Mapper.getLabel = function(str) {
    for (let label in this._labels) {
        if (str.indexOf(label) > -1) {
            return this._labels[label];
        }
    }
}

Monitor.Mapper.getColor = function(str) {
    for (let color in this._colors) {
        if (str.indexOf(color) > -1) {
            return this._colors[color];
        }
    }
};
