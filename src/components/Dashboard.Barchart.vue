<template>
    <transition name="fade">
        <section class="barchart">
            <section :class="where">
                <h2>{{ heading }}</h2>
                {{ chart }}
            </section>
        </section>
    </transition>
</template>

<script>
export default {
    name: "barchart",
    props: ["bartype", "heading", "where"],
    computed: {
        chart() {
            if (this.$store.state.cadastres.currentCadastre && this.$store.state.dates.currentDate) {
                return this.drawSvgChart(this.$store.state.cadastres.currentCadastre, this.bartype, this.where);
            }
        }
    },
    methods: {
        drawSvgChart: function(_data, bartype, where) {
            const data = this._getBarchartValues(_data);
            const values = Object.values(data);
            const keys = Object.keys(data);
            const barHeight = 20;
            const barPadding = 5;
            const margin = 40;
            let labelWidth = 0;
            let self = this;

            let scale = this.$d3.scaleLinear()
                // ugly hack
                .domain([0, bartype.indexOf("Avg") === -1 ? 100 : this.$d3.max(values, (d) => {
                    return d;
                })])
                .range([0, 400 - margin*2 - labelWidth]); // hard-coded width

            this.$d3.select(`.${where}`).selectAll("svg").remove(); // ugly hack? see https://bl.ocks.org/mbostock/3808218

            const svg = this.$d3.select(`.${where}`)
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
                .text(function(d) {
                    return d;
                }).each(function() {
                    labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
                });

            bar.append("rect")
                    .attr("transform", "translate(5, 0)")
                    .attr("fill", function(d, i) {
                        let value = keys[i]
                            .replace("_v_r", "")
                            .replace("_pp_r", "")
                            .replace("_v_avg", "");

                        return self.$store.state.charts.props[value]["color"];
                    })
                    .attr("height", barHeight)
                    .attr("width", function(d){
                        return scale(d);
                    });
        },
        _getBarchartValues(data) {
            let _type = this.$store.state.dimensions.list[this.bartype];
            let dateIndex = this.$store.state.dates.list.indexOf(this.$store.state.dates.currentDate);

            console.log(_type, dateIndex, data);

            return Object.entries(data)
                .filter(byType)
                .map(format)
                .reduce(toObject, {});

            function format(elm) {
                return [elm[0], elm[1][dateIndex]];
            }

            function byType(elm) {
                return elm[0].endsWith(_type);
            }

            function toObject(prev, cur) {
                if (!parseFloat(cur[1]) > 0) {
                    return prev;
                }
                prev[cur[0]] = _type === "v_avg"
                    ? cur[1]
                    : cur[1].toFixed(2);
                return prev;
            }
        }
    }
};
</script>
