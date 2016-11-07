Monitor.Dashboard = {
    init: function() {
        this._listenDatachange();
    },
    _listenDatachange: function() {
        document.querySelector(".chart").addEventListener("datachange", this._redraw.bind(this));
    },
    _redraw: function() {
        this._redrawSvgChart("areaRatio", ".chart .area");
        this._redrawSvgChart("parcelRatio", ".chart .parcel");
        this._redrawSvgChart("parcelAvgArea", ".chart .parcel-avg-area");
    },
    _redrawSvgChart: function(what, where) {
        const data = this._getValues(what);
        const barHeight = 20;
        const barPadding = 5;
        const margin = 40;
        let labelWidth = 0;
        let scale = d3.scaleLinear()
            // ugly hack
            .domain([0, what.indexOf("Avg") === -1 ? 100 : d3.max(data, (d) => {
                return d[1];
            })])
            .range([0, 400 - margin*2 - labelWidth]); // hard-coded width

        d3.select(where).selectAll("svg").remove(); // ugly hack? see https://bl.ocks.org/mbostock/3808218

        const svg = d3.select(where)
            .append("svg")
            .style("height", data.length * (barHeight + (barPadding / 2)));

        const bar = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g");

        bar.attr("class", "bar")
            .attr("cx", 0)
            .attr("transform", function(d, i) {
                return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
            });

        bar.append("text")
            .attr("class", "label")
            .attr("y", barHeight / 2)
            .attr("dy", ".35em") //vertical align middle
            .attr("text-anchor", "end")
            .text(function(d){
                return `${d[1]}`;
            }).each(function() {
                labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
            });

        bar.append("rect")
                .attr("transform", "translate(5, 0)")
                .attr("fill", function(d) {
                    return Monitor.Mapper.getColor(d[0]);
                })
                .attr("height", barHeight)
                .attr("width", function(d){
                    return scale(d[1]);
                });

        bar.append("text")
                .attr("class", "value")
                .attr("y", barHeight / 2)
                .attr("dx", function(d) {
                    return scale(d3.max(data, (d) => {
                        return parseFloat(d[1]) + labelWidth + margin / 2;
                    }));
                }) //margin right
                .attr("dy", ".35em") //vertical align middle
                .attr("text-anchor", "end")
                .text(function(d){
                    return `${Monitor.Mapper.getLabel(d[0])}`;
                })
                .attr("x", 0);
    },
    /**
     * Gets values for each type of chart.
     * @param  {string} type
     * @return {array}
     */
    _getValues(type) {
        if (type === "areaRatio") {
            type = "v_r";
        } else if (type === "parcelRatio") {
            type = "pp_r";
        } else if (type === "parcelAvgArea") {
            type = "v_avg";
        }

        let c = Monitor.Data.getCurrent();
        let arr = Object.entries(c);

        arr = arr.filter((elm) => {
            return elm[0].indexOf(type) > -1 && parseFloat(elm[1]) > 0;
        });


        return arr;
    }
}

Monitor.Dashboard.init();
