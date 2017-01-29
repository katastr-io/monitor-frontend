<template>
    <transition name="fade">
        <section class="info">
            <p>
                <small>výměra: {{ item.area }} ha / počet parcel: {{ item.parcelCount }} / průměrná výměra parcely: {{ item.averageArea }} m<sup>2</sup></small>
            </p>
        </section>
    </transition>
</template>

<script>
export default {
    name: "info",
    computed: {
        item() {
            let c = this.$store.state.administrative_units.currentItem;
            if (!c) {
                return {};
            }

            return {
                area: (c.total_area / 10000).toFixed(2),
                parcelCount: c.total_count,
                averageArea: parseInt(c.total_area / c.total_count)
            }
        }
    }
};
</script>
