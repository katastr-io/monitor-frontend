Monitor.Mapper = {};

Monitor.Mapper._dates = [
    "1. 1. 2015",
    "1. 4. 2015",
    "1. 7. 2015",
    "1. 10. 2015",
    "1. 1. 2016",
    "1. 4. 2016",
    "1. 7. 2016",
    "1. 10. 2016"
];

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

Monitor.Mapper._dimensions = {
    "areaRatio": "v_r",
    "parcelRatio": "pp_r",
    "parcelAvgArea": "v_avg"
};

Monitor.Mapper._lineTypes = {
    "areaRatio": "výměra [%]",
    "parcelRatio": "parcely [%]",
    "parcelAvgArea": "průměrná výměra parcely"
};

Monitor.Mapper.getDimension = function(d) {
    return this._dimensions[d];
}

Monitor.Mapper.getDatePosition = function(date) {
    return this._dates.indexOf(date);
}

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

Monitor.Mapper.getColorByIndex = function(idx) {
    return Object.entries(Monitor.Mapper._colors)[idx][1];
};

Monitor.Mapper.getLabels = function() {
    return Object.values(this._labels);
}

/**
 * @todo move to init.js file (?)
 */
d3.select(".cadastre-date")
    .append("form")
    .append("select")
    .on("change", updateCurrentDate)
    .selectAll("option")
    .data(Monitor.Mapper._dates)
    .enter()
    .append("option")
    .attr("value", (d) => {
        return d;
    })
    .text((d) => {
        return d;
    });

function updateCurrentDate() {
    return Monitor.Data.setCurrentDate(document.querySelector(".cadastre-date select").value);
}

d3.select(".line-chart-header")
    .append("h2")
    .text(`vývoj v období ${Monitor.Mapper._dates[0]}-${Monitor.Mapper._dates[Monitor.Mapper._dates.length - 1]}`);

d3.select(".line-chart section")
    .append("form")
    .append("select")
    .on("change", updateCurrentLineType)
    .selectAll("option")
    .data(Object.entries(Monitor.Mapper._lineTypes))
    .enter()
    .append("option")
    .attr("value", (d) => {
        return d[0];
    })
    .text((d) => {
        return d[1];
    });

function updateCurrentLineType() {
    console.log(document.querySelector(".line-chart section select").value);
    return Monitor.Data.setCurrentLineType(document.querySelector(".line-chart section select").value);
}
