const delimiter = ";"
const parser = d3.dsvFormat(delimiter);

const Monitor = {};

function addStats(row) {
    for (let prop in row) {
        if (!prop.endsWith("_v") && !prop.endsWith("_pp")) {
            continue;
        }

        row[prop + "_r"] = _ratio(prop);
    }

    function _ratio(d) {
        let ratio = d.endsWith("_v")
            ? parseInt(row[d]) / parseInt(row.celkova_vymera)
            : parseInt(row[d]) / parseInt(row.celkovy_pocet_parcel);

        return (ratio * 100).toFixed(2);
    }

    return row;
}

d3.request("./data/UHDP-20150101.utf.csv")
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