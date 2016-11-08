Monitor.Mapper = {};

Monitor.Mapper._colors = {
    orna_puda: "#543511",
    chmelnice: "#CFF09E",
    vinice: "#AB565F",
    zahrada: "#FF9900",
    ovocny_sad: "#F02311",
    ttp: "#7FAF1B",
    lesni_pozemek: "#003000",
    vodni_plocha: "#21AABD",
    zastavena_plocha: "#7F828C",
    ostatni_plocha: "#4E5054"
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

Monitor.Mapper.getLabels = function() {
    let result = [];

    for (let label in this._labels) {
        result.push(this._labels[label]);
    }

    return result;
}