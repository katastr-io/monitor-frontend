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
        drawSvgChart: function() {
            const data = this.getValues(this.currentType);
            const values = Object.values(data);
            const keys = Object.keys(data);
            const d3 = this.$d3;
            let self = this;
            let store = self.$store.state.dates;

            let getDomain = function(data, type) {
                return d3[type](data, (d) => {
                    return d3[type](d);
                });
            }

            let drawYAxis = function() {
                let axis = d3.axisLeft(scale);
                svg.append("g")
                    .attr("class", "y-axis")
                    .call(axis);
            }

            let drawXAxis = function() {
                let range = d3.range(store.list.length).map(positionX);
                let scale = d3.scaleOrdinal()
                    .domain(store.list)
                    .range(range);
                let axis = d3.axisBottom(scale);

                svg.append("g")
                    .attr("class", "x-axis")
                    .attr("transform", `translate(0,${height-40})`)
                    .call(axis);
            }

            let positionX = function(i) {
                return (width/store.list.length) * i;
            }

            const domain = [getDomain(values, "min"), getDomain(values, "max")];

            if (domain[0] === domain[1]) { // adjust the Y axis if the values don't change over time
                domain[0] -= 2;
                domain[1] += 2;
            }

            const height = 400;
            const width = document.body.clientWidth - 60;
            const range = [360, 10];
            const scale = this.$d3.scaleLinear()
                .domain(domain)
                .range(range);
            const lineChart = d3.select(".line-chart-plot");

            lineChart.selectAll("svg").remove();

            const svg = lineChart.append("svg")
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
                            console.log(e);
                        });
                }
            }
        },
        getValues(type) {
            let _type = this.$store.state.dimensions.list[type];
            let c = this.$store.state.cadastres.currentCadastre;
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
    },
    computed: {
        chart() {
            if (this.$store.state.cadastres.currentCadastre && this.$store.state.dates.currentDate) {
                return this.drawSvgChart(this.$store.state.cadastres.currentCadastre);
            }
        },
        period() {
            let dates = this.$store.state.dates.list;
            return `${dates[0]}-${dates[dates.length -1]}`;
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

    path.domain,
    .tick line {
      stroke: #1F3C6F;
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

    circle:hover{
      -webkit-transform: scale(1.5);
      -moz-transform: scale(1.5);
      -ms-transform: scale(1.5);
      -o-transform: scale(1.5);
      transform: scale(1.5);
      -webkit-transition: fill, -webkit-transform;
      -moz-transition: fill, -webkit-transform;
      -ms-transition: fill, -webkit-transform;
      -o-transition: fill, -webkit-transform;
      transition: fill, -webkit-transform;
      -moz-transition-duration: .25;
      -ms-transition-duration: .25;
      -o-transition-duration: .25;
      transition-duration: .25;
    }
</style>
