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
    data() {
        return {
            STATE: this.$store.state
        };
    },
    computed: {
        chart() {
            const au = this.STATE.administrative_units.currentItem;
            const d = this.STATE.dates.current;

            if (!au || !d) {
                return;
            }

            this.drawSvgChart(au, this.bartype, this.where);
        }
    },
    methods: {
        drawSvgChart(_data, bartype, where) {
            const data = this._getBarchartValues(_data);
            const values = Object.values(data).map(parseFloat);
            const keys = Object.keys(data);
            const barHeight = 20;
            const barPadding = 5;
            const margin = 40;
            const self = this;
            let labelWidth = 0;

            const scale = this.$d3.scaleLinear()
                // ugly hack
                .domain([0, bartype.indexOf("Avg") === -1 ? 100 : this.$d3.max(values, (d) => {
                    return d;
                })])
                .range([0, 400 - (margin * 2) - labelWidth]); // hard-coded width

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
                .attr("transform", (d, i) => {
                    const y = (i * (barHeight + barPadding)) + barPadding;
                    return `translate(${margin}, ${y})`;
                });

            bar.append("text")
                .attr("class", "value")
                .attr("y", barHeight / 2)
                .attr("dy", ".35em") /* vertical align middle */
                .attr("text-anchor", "end")
                .text(d => d)
                .each(function() {
                    labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
                });

            bar.append("rect")
                .attr("transform", "translate(5, 0)")
                .attr("fill", (d, i) => {
                    const value = keys[i]
                        .replace("_area_ratio", "")
                        .replace("_count_ratio", "")
                        .replace("_area_average", "");

                    return self.STATE.charts.props[value].color;
                })
                .attr("height", barHeight)
                .attr("width", (d) => {
                    return scale(d);
                });
        },
        _getBarchartValues(data) {
            const _type = this.$store.state.dimensions.list[this.bartype];
            const result = {};

            for (let prop in data) {
                if (!prop.endsWith(_type) || data[prop] == 0 || prop.indexOf("agriculture") > -1) {
                    continue;
                }

                _type.indexOf(this.$store.state.dimensions.list.parcelAvgArea) > -1
                    ? result[prop] = parseFloat(data[prop]).toFixed(0)
                    : result[prop] = parseFloat(data[prop]).toFixed(2);
            }

            return result;
        }
    }
};
</script>

<style>
    rect {
        -webkit-transition: all 0.30s ease-in-out;
        -moz-transition: all 0.30s ease-in-out;
        -ms-transition: all 0.30s ease-in-out;
        -o-transition: all 0.30s ease-in-out;
    }
</style>
