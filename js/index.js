const delimiter = ";"
const parser = d3.dsvFormat(delimiter);

const Monitor = {};

function addStats(row) {
    for (let prop in row) {
        if (!prop.endsWith("_v") && !prop.endsWith("_pp")) {
            continue;
        }

        row[prop + "_r"] = _ratio(prop);

        if (prop.endsWith("_v")) {
            row[prop + "_avg"] = _avg(prop); // calculate avg parcel area per landuse type
        }
    }

    function _avg(d) {
        let result = parseFloat(row[d] / row[d.replace("_v", "_pp")]) / 10000;
        if (isNaN(result)) {
            result = 0;
        }
        return result.toFixed(4);
    }

    function _ratio(d) {
        let ratio = d.endsWith("_v")
            ? parseInt(row[d]) / parseInt(row.celkova_vymera)
            : parseInt(row[d]) / parseInt(row.celkovy_pocet_parcel);

        return (isNaN(ratio) ? 0 : ratio * 100).toFixed(2);
    }

    return row;
}

d3.request("./data/UHDP-20150101.utf2.csv")
    .mimeType("text/csv")
    .response((xhr) => {
        return parser.parse(xhr.responseText, addStats);
    })
    .get((data) => {
        Monitor.Data.store(data);
    });

function accessor(d) {
    return d.orna_puda_v_r;
}