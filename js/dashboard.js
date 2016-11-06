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
    },
    _redrawSvgChart: function(what, where) {
        const margin = 40;
        const barHeight = 20;
        const barPadding = 5;
        let labelWidth = 0;
        let valueMargin = 4;
        const data = this._getValues(what);
        let scale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, 400]);

        const svg = d3.select(where)
            .append("svg");

        const bar = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g");

        console.log(bar.attr("class", "bar").attr("cx", 0));

        bar.attr("class", "bar")
            .attr("cx",0)
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
        scale = d3.scaleLinear()
                    .domain([0, 100])
                    .range([0, 500 - margin*2 - labelWidth]);

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
                    .attr("dx", -valueMargin + labelWidth) //margin right
                    .attr("dy", ".35em") //vertical align middle
                    .attr("text-anchor", "end")
                    .text(function(d){
                        return `${Monitor.Mapper.getLabel(d[0])}`;
                    })
                    .attr("x", function(d){
                        var width = 500;
                        return Math.max(width + valueMargin, scale(d[1]));
                    });
    },
    _redrawChart: function(what, where) {
        const data = this._getValues(what);
        const scale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, 400]);

        let u = d3.select(where)
            .selectAll("div")
                .data(data);

        u.enter()
            .append("div")
            .merge(u)
            .style("width", function(d) {
                return scale(d[1]) + "px";
            })
            .style("background-color", function(d) {
                return Monitor.Mapper.getColor(d[0]);
            })
            .text(function(d) {
                return `${d[1]} ${Monitor.Mapper.getLabel(d[0])}`;
            });

        u.exit().remove();
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
