<template>
    <transition name="fade">
        <section class="linechart">
            <section class="line-chart-header">
                <h2>vývoj v období {{ period }}</h2>
                <form>
                    <select v-model.lazy="currentType">
                        <option :value="prop" v-for="(type, prop) in types">{{ type }}</option>
                    </select>
                </form>
            </section>
            <section class="line-chart-plot">
            {{ chart }}
            </section>
        </section>
    </transition>
</template>

<script>
export default {
    name: "linechart",
    methods: {
        drawSvgChart: function(_values) {
            this.getValues(this.currentType)
                .then((data) => {
                const values = Object.values(data);
                const keys = Object.keys(data);

                const d3 = this.$d3;
                let self = this;
                let dates = this.$store.state.dates;

                let getDomain = function(data, type) {
                    return d3[type](data, (d) => {
                        return d3[type](d);
                    });
                }

                let drawYAxis = function() {
                    let axis = d3.axisLeft(scale);
                    axis.tickSize(-width+140);

                    svg.append("g")
                        .attr("class", "y-axis")
                        .attr("transform", "translate(60, 0)")
                        .call(axis);
                }

                let drawXAxis = function() {
                    let range = d3.range(dates.list.length).map(positionX);
                    let scale = d3.scaleOrdinal()
                        .domain(self.stringDates)
                        .range(range);
                    let axis = d3.axisBottom(scale);

                    svg.append("g")
                        .attr("class", "x-axis")
                        .attr("transform", `translate(60, ${height-40})`)
                        .call(axis);
                }

                let positionX = function(i) {
                    return (width/dates.list.length) * i;
                }

                const domain = [getDomain(values, "min"), getDomain(values, "max")];

                if (domain[0] === domain[1]) { // adjust the Y axis if the values don't change over time
                    domain[0] -= 2;
                    domain[1] += 2;
                }

                const height = 400;
                const width = document.body.clientWidth - 90;
                const range = [360, 10];
                const scale = this.$d3.scaleLinear()
                    .domain(domain)
                    .range(range);
                const lineChart = d3.select(".line-chart-plot");
                const tooltip = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

                lineChart.selectAll("svg").remove();

                const svg = lineChart.append("svg")
                    .attr("height", height)
                    .attr("width", width)
                    .style("height", height)
                    .style("width", width);

                drawYAxis();
                drawXAxis();
                drawPlot();

                function drawPlot() {
                    const line = svg.selectAll(".line")
                        .data(values)
                        .enter()
                        .append("g")
                        .attr("class", "line")
                        .attr("transform", "translate(60, 0)")
                        .style("stroke-width", 2)
                        .style("fill", "white")
                        .style("stroke", function(d) {
                            for (let prop in self.$store.state.charts.props) {
                                if (keys[values.indexOf(d)].indexOf(prop) > -1) {
                                    return self.$store.state.charts.props[prop]["color"];
                                }
                            }
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
                                tooltip.transition()
                                    .duration(200)
                                    .style("opacity", 1);
                                tooltip.html(e.toFixed(2))
                                    .style("left", `${d3.event.pageX}px`)
                                    .style("top", `${d3.event.pageY - 35}px`);
                            })
                            .on("mouseout", () => {
                                tooltip.transition()
                                    .duration(200)
                                    .style("opacity", 0);
                            });
                    }
                }
            });
        },
        getValues(type) {
            let c = this.$store.state.administrative_units.currentItem;
            let dates = this.$store.state.dates.list;
            let result = {};

            return this.$http.post(`${this.$store.getters.resource.url}/${c.code}/progress`, {
                start: dates[0].valid_at,
                end: dates[dates.length - 1].valid_at
            }).then((res) => {
                return this.filter(res.data, type)
            });
        },
        filter(data, type) {
            delete data.code;
            delete data.name;

            let values = Object.values(data);
            let keys = Object.keys(data);
            let result = {};

            switch(type) {
                case "areaAbsolute":
                    keys = keys.map(elm => elm.endsWith("_area") && !elm.startsWith("total_") && elm.indexOf("agricultur") === -1 && elm);
                    break;
                case "agrAreaAbsolute":
                    keys = keys.map(elm => elm === "agriculture_land_area" && elm);
                    break;
                case "areaRatio":
                    keys = keys.map(elm => elm.endsWith("_area_ratio") && !elm.startsWith("total_") && elm.indexOf("agricultur") === -1 && elm);
                    break;
                case "parcelAbsolute":
                    keys = keys.map(elm => elm.endsWith("_count") && !elm.startsWith("total_") && elm.indexOf("agricultur") === -1 && elm);
                    break;
                case "agrParcelAbsolute":
                    keys = keys.map(elm => elm === "agriculture_land_count" && elm);
                    break;
                case "parcelRatio":
                    keys = keys.map(elm => elm.endsWith("_count_ratio") && !elm.startsWith("total_") && elm.indexOf("agricultur") === -1 && elm);
                    break;
                case "parcelAvgArea":
                    keys = keys.map(elm => elm.endsWith("_area_average") && !elm.startsWith("total_") && elm.indexOf("agricultur") === -1 && elm);
                    break;
            }

            keys.forEach((elm, idx) => {
                if (!elm) {
                    return;
                }

                result[elm] = values[idx];
            });

            return result;
        }
    },
    computed: {
        chart() {
            let au = this.$store.state.administrative_units.currentItem;
            let d = this.$store.state.dates.current;

            if (au && d) {
                return this.drawSvgChart(this.values);
            }
        },
        period() {
            let dates = this.$store.getters.reverseDates;

            if (dates.length === 0) {
                return;
            }

            return `${dates[dates.length -1].repr}-${dates[0].repr}`;
        },
        stringDates() {
            return this.$store.getters.stringDates;
        }
    },
    data() {
        return {
            currentType: "areaAbsolute",
            types: {
                "areaAbsolute": "výměra [ha]",
                "agrAreaAbsolute": "výměra zemědělské půdy [ha]",
                "areaRatio": "výměra [%]",
                "parcelAbsolute": "parcely",
                "agrParcelAbsolute": "parcely zemědělské půdy",
                "parcelRatio": "parcely [%]",
                "parcelAvgArea": "průměrná výměra parcely [m2]"
            }
        }
    }
};
</script>

<style>
    .linechart h2 {
      width: 35%;
    }

    .linechart form {
      border-bottom: 1px solid #1F3C6F;
    }

    .linechart select,
    .linechart option {
      font-size: 1.5rem;
    }

    .linechart {
      width: 100%;
    }

      .linechart svg {
        padding-left: 60px;
      }

    path.domain {
      stroke: #1F3C6F;
    }

    .tick line {
      stroke: #ddd;
      stroke-dasharray: 5,5;
      stroke-width: 1px;
      shape-rendering: crispEdges;
    }

    circle,
    path {
      cursor: pointer;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: center;
      -moz-transform-origin: center;
      -ms-transform-origin: center;
      -o-transform-origin: center;
      transform-origin: center;
      -webkit-transition: fill, -webkit-transform;
      -moz-transition: fill, -webkit-transform;
      -ms-transition: fill, -webkit-transform;
      -o-transition: fill, -webkit-transform;
      transition: fill, -webkit-transform;
      -webkit-transition-duration: .25;
      -moz-transition-duration: .25;
      -ms-transition-duration: .25;
      -o-transition-duration: .25;
      transition-duration: .25;
    }

    div.tooltip {
        background: #EDEDF3;
        border:1px solid #C7C7CD;
        position: absolute;
        text-align: center;
        padding: 7px 5px;
        font: 12px sans-serif;
        pointer-events: none;
    }
</style>
