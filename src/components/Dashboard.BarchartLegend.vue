<template>
    <transition name="fade">
        <section class="legend">
            <h2>legenda</h2>
            {{ legend }}
        </section>
    </transition>
</template>

<script>
export default {
    name: "dashboard-legend",
    data() {
        return {
            STATE: this.$store.state
        };
    },
    computed: {
        legend() {
            const au = this.STATE.administrative_units.currentItem;
            const d = this.STATE.dates.current;

            if (!au || !d) {
                return false;
            }

            return this.drawLegend(au, this.bartype, this.where);
        }
    },
    methods: {
        drawLegend() {
            const data = this._getBarchartValues("areaRatio"); // hack to get legend keys
            const keys = Object.keys(data).map((elm) => {
                for (let prop in this.$store.state.charts.props) {
                    if (elm.startsWith(prop)) {
                        return this.$store.state.charts.props[prop].label;
                    }
                }
            });

            const barHeight = 20;
            const barPadding = 5;
            const margin = 0;
            const legend = this.$d3.select(".legend");

            legend.selectAll("svg").remove();

            const svg = legend.append("svg")
                .style("height", (keys.length + 1) * (barHeight + (barPadding / 2)));

            const label = svg.selectAll("g")
                .data(keys)
                .enter()
                .append("g");

            label.attr("class", "label")
                .attr("cx", 0)
                .attr("transform", (d, i) => {
                    const y = (i * (barHeight + barPadding)) + barPadding;
                    return `translate(${margin}, ${y})`;
                });

            label.append("text")
                .attr("class", "value")
                .attr("y", barHeight / 2)
                .attr("dy", ".35em") /* vertical align middle */
                .attr("text-anchor", "start")
                .text((d) => {
                    return d;
                });
        },
        _getBarchartValues(type) {
            let _type = this.$store.state.dimensions.list[type];
            let data = this.STATE.administrative_units.currentItem;
            let result = {};

            for (let prop in data) {
                if (!prop.endsWith(_type) || data[prop] == 0 || prop.indexOf("agriculture") > -1) {
                    continue;
                }

                result[prop] = parseFloat(data[prop]).toFixed(2);
            }

            return result;
        }
    }
};
</script>

<style>
.legend svg {
  border-right: 1px solid #1F3C6F;
  margin-right: 5px;
  width: 120px;
}

  .legend h2 {
    visibility: hidden;
  }
</style>
