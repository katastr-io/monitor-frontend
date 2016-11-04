const delimiter = ";"
const parser = d3.dsvFormat(delimiter);

const Monitor = {};

let cadastreAreas = [];

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


function getCadastreInfo(d) {
    return {
        ku_nazev: d.ku_nazev,
        ku_kod: d.ku_kod
    };
}


d3.request("./data/UHDP-20150101.utf.csv")
    .mimeType("text/csv")
    .response((xhr) => {
        cadastreAreas = parser.parse(xhr.responseText, getCadastreInfo);
        return parser.parse(xhr.responseText, addStats);
    })
    .get((data) => {
        Monitor.Data.store(data);
        // console.log(cadastreAreas[0]);
        // console.log(data[0]);

        /*let x = d3.scaleLinear()
            .domain([0, d3.max(data, accessor)])
            .range([0, 400]);

        d3.select(".chart")
          .selectAll("div")
            .data(data)
          .enter().append("div")
            .style("width", function(d) {
                return x(d.orna_puda_v_r) + "px";
            })
            .text(function(d) {
                return d.ku_nazev;
            });*/
    });

function accessor(d) {
    return d.orna_puda_v_r;
}