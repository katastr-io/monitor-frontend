<template>
    <transition name="fade">
        <section class="info">
            <p>
                <small>výměra: {{ cadastreInfo.area }} ha / počet parcel: {{ cadastreInfo.parcelCount }} / průměrná výměra parcely: {{ cadastreInfo.averageArea }} m<sup>2</sup></small>
            </p>
        </section>
    </transition>
</template>

<script>
export default {
    name: "info",
    computed: {
        cadastreInfo() {
            let c = this.$store.state.cadastres.currentCadastre;

            if (!c) {
                return {};
            }

            let dateIndex = this.$store.state.dates.list.indexOf(this.$store.state.dates.currentDate);
            let area = (c.celkova_vymera[dateIndex]/10000).toFixed(2);
            let parcelCount = c.celkovy_pocet_parcel[dateIndex];
            let averageArea = parseInt(c.celkova_vymera[dateIndex] / c.celkovy_pocet_parcel[dateIndex]);

            return {
                area: area,
                parcelCount: parcelCount,
                averageArea: averageArea
            };
        }
    }
};
</script>
