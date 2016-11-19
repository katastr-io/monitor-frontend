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
    computed: {
        legend() {
            if (this.$store.state.cadastres.currentCadastre && this.$store.state.dates.currentDate) {
                return this.drawLegend(this.$store.state.cadastres.currentCadastre, this.bartype, this.where);
            }
        }
    },
    methods: {
        drawLegend: function() {
            const data = this._getBarchartValues("areaRatio"); // hack to get legend keys
            const keys = Object.keys(data).map((elm) => {
                for (let prop in this.$store.state.charts.props) {
                    if (elm.startsWith(prop)) {
                        return this.$store.state.charts.props[prop]["label"];
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
        _getBarchartValues(type) {
            let _type = this.$store.state.dimensions.list[type];
            let data = this.$store.state.cadastres.currentCadastre;
            let dateIndex = this.$store.state.dates.list.indexOf(this.$store.state.dates.currentDate);


            return Object.entries(data)
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
