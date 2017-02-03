<template>
    <transition name="fade">
        <section class="box similar-administrative-units">
            <h2>{{boxText[1]}} {{ this.$store.getters.resource.plural }} <small>určeno na základě relativního zastoupení jednotlivých druhů pozemku</small></h2>
            <p>
                <template v-if="similar.length === 0">
                    {{boxText.join(" ")}} {{ this.$store.getters.resource.plural }}.
                </template>
                <template v-for="(s, index) in similar">
                    <a @click="select(s)" href="#">{{ s.name }}</a><span v-if="index !== similar.length - 1">, </span>
                </template>
            </p>
        </section>
    </transition>
</template>

<script>
export default {
    name: "similar-administrative-units",
    data() {
        return {
            STATE: this.$store.state,
            similar: []
        }
    },
    computed: {
        currentItem() {
            return this.STATE.administrative_units.currentItem;
        },
        currentDate() {
            return this.STATE.dates.current;
        },
        boxText() {
            return this.$store.getters.resource.plural === "katastrální území"
                ? ["Nebyla nalezena žádná", "podobná"]
                : ["Nebyly nalezeny žádné", "podobné"];
        }
    },
    watch: {
        currentItem() {
            this.getSimilar();
        },
        currentDate() {
            this.getSimilar();
        }
    },
    methods: {
        getSimilar() {
            if (!this.currentItem || !this.currentDate) {
                return;
            }

            let self = this;
            let url = [
                this.$store.getters.resource.url,
                this.currentItem.code,
                this.currentDate.valid_at,
                "alike"].join("/");

            return this.$http.get(url)
                .then((res) => {
                    self.similar = res.data;
                });
        },
        select(item, e) {
            this.$http.get(`${this.$store.getters.resource.url}/${item.code}/${this.currentDate.valid_at}`)
                .then((res) => {
                    this.$store.commit("SET_CURRENT_ADMINISTRATIVE_UNIT", res.data);
                    this.$store.commit("SEARCH_TEXT",`${item.name} / ${item.code}`);
                    this.results = [];
                }).catch((err) => {
                    return false;
                });
        },
    }
};
</script>
