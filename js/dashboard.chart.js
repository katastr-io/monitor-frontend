Monitor.Dashboard.Chart = {
    drawLegend: function() {
        const data = this._getBarchartValues("areaRatio"); // hack to get legend keys
        const keys = Object.keys(data).map((elm) => {
            return Monitor.Mapper.getLabel(elm);
        });

        const barHeight = 20;
        const barPadding = 5;
        const margin = 0;
        const legend = d3.select(".legend");

        legend.selectAll("svg").remove();

        const svg = legend.append("svg")
            .style("height", (keys.length + 1) * (barHeight + (barPadding / 2)));

        const label = svg.selectAll("g")
            .data(keys)
            .enter()
            .append("g");

        label.attr("class", "label")
            .attr("cx", 0)
            .attr("transform", function(d, i) {
                return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
            });

        label.append("text")
            .attr("class", "value")
            .attr("y", barHeight / 2)
            .attr("dy", ".35em") //vertical align middle
            .attr("text-anchor", "start")
            .text((d) => {
                return d;
            });
    },
    drawSvgLineChart: function() {
        const data = this._getLinechartValues(Monitor.Data.getCurrentLineType());
        const values = Object.values(data);
        const keys = Object.keys(data);
        console.log(keys, values);
        const domain = [getDomain(values, "min"), getDomain(values, "max")];
        const height = 400;
        const width = document.body.clientWidth - 60;
        const range = [360, 10];
        const scale = d3.scaleLinear()
            .domain(domain)
            .range(range);
        const lineChart = d3.select(".line-chart-plot");

        lineChart.selectAll("svg").remove();

        const svg = lineChart.append("svg")
            .style("height", height)
            .style("width", width);

        _drawYAxis();
        _drawXAxis();
        _drawPlot();

        function _drawYAxis() {
            let axis = d3.axisLeft(scale);

            svg.append("g")
                .attr("class", "y-axis")
                .call(axis);
        }

        function _drawXAxis() {
            let range = d3.range(Monitor.Mapper._dates.length).map(positionX);
            let scale = d3.scaleOrdinal()
                .domain(Monitor.Mapper._dates)
                .range(range);
            let axis = d3.axisBottom(scale);

            svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", `translate(0,${height-40})`)
                .call(axis);
        }

        function _drawPlot() {
            const line = svg.selectAll(".line")
                .data(values)
                .enter()
                .append("g")
                .attr("class", "line")
                .style("stroke-width", 2)
                .style("fill", "white")
                .style("stroke", function(d) {
                    return Monitor.Mapper.getColor(keys[values.indexOf(d)]);
                });

            _drawLines();
            _drawCircles();

            function _drawLines() {
                line.append("path")
                    .attr("d", function(d) {
                       return d.reduce((prev, cur, idx) => {
                            let x = positionX(idx);
                            let y = scale(cur);

                            return prev + `L${x} ${y}`;
                        }, `M${positionX(0)} ${scale(d[0])}`);
                    })
                    .style("fill", "none");
            }

            function _drawCircles() {
                line.selectAll(".line")
                    .data(function(d) {
                        return d;
                    })
                    .enter()
                    .append("circle")
                    .attr("cy", scale)
                    .attr("cx", function(d, i) {
                        return positionX(i);
                    })
                    .attr("r", 3)
                    .style("stroke-width", 2)
                    .on("mouseover", function(e) {
                        console.log(e);
                    });
            }
        }

        function getDomain(data, type) {
            return d3[type](data, (d) => {
                return d3[type](d);
            });
        }

        function positionX(i) {
            return (width/Monitor.Mapper._dates.length) * i;
        }
    },
    /**
     * @todo move to Monitor.Dashboard.Chart
     * @todo solve avg/ratio somehow
     */
    drawSvgChart: function(what, where) {
        const data = this._getBarchartValues(what);
        const values = Object.values(data);
        const keys = Object.keys(data);
        const barHeight = 20;
        const barPadding = 5;
        const margin = 40;
        let labelWidth = 0;

        let scale = d3.scaleLinear()
            // ugly hack
            .domain([0, what.indexOf("Avg") === -1 ? 100 : d3.max(values, (d) => {
                return d;
            })])
            .range([0, 400 - margin*2 - labelWidth]); // hard-coded width

        d3.select(where).selectAll("svg").remove(); // ugly hack? see https://bl.ocks.org/mbostock/3808218

        const svg = d3.select(where)
            .append("svg")
            .style("height", (values.length + 1) * (barHeight + (barPadding / 2)));

        const bar = svg.selectAll("g")
            .data(values)
            .enter()
            .append("g");

        bar.attr("class", "bar")
            .attr("cx", 0)
            .attr("transform", function(d, i) {
                return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
            });

        bar.append("text")
            .attr("class", "value")
            .attr("y", barHeight / 2)
            .attr("dy", ".35em") //vertical align middle
            .attr("text-anchor", "end")
            .text(function(d){
                return d;
            }).each(function() {
                labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
            });

        bar.append("rect")
                .attr("transform", "translate(5, 0)")
                .attr("fill", function(d) {
                    return Monitor.Mapper.getColor(keys[values.indexOf(d)]);
                })
                .attr("height", barHeight)
                .attr("width", function(d){
                    return scale(d);
                });
    },
    _getLinechartValues(type) {
        let _type = Monitor.Mapper.getDimension(type);
        let c = Monitor.Data.getCurrent();
        let result = {};

        for (let prop in c) {
            if (!prop.endsWith(_type)) {
                continue;
            }

            if (c[prop].some((elm) => {
                return elm !== 0;
            })) {
                result[prop] = c[prop];
            }
        }

        return result;
    },
    /**
     * Gets values for each type of chart.
     * @param  {string} type
     * @return {array}
     */
    _getBarchartValues(type) {
        let _type = Monitor.Mapper.getDimension(type);
        let cadastre = Monitor.Data.getCurrent();
        let dateIndex = Monitor.Mapper.getDatePosition(Monitor.Data.getCurrentDate());

        return arr = Object.entries(cadastre)
            .filter(byType)
            .map(format)
            .reduce(toObject, {});

        function format(elm) {
            let value = _type === "v_avg"
                ? parseInt(elm[1][dateIndex])
                : elm[1][dateIndex].toFixed(2);

            return [elm[0], value];
        }

        function byType(elm) {
            return elm[0].endsWith(_type);
        }

        function toObject(prev, cur) {
            if (!parseFloat(cur[1]) > 0) {
                return prev;
            }
            prev[cur[0]] = cur[1];
            return prev;
        }
    }
}
