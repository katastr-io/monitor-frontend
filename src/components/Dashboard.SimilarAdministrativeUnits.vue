<template>
    <transition name="fade">
        <section class="similar-administrative-units">
            <h2>{{boxText[1]}} {{ this.$store.getters.resource.plural }} <small>určeno na základě relativního zastoupení jednotlivých druhů pozemku</small></h2>
            <p>
                <template v-show="!similar.length">
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
        }
    }
};
</script>

<style>
section.similar-administrative-units {
  background: #EDEDF3;
  border-bottom: 1px solid #C7C7CD;
  border-top: 1px solid #C7C7CD;
  flex-basis: 100%;
  margin-top: 2rem;
  padding: .5rem;
}

section.similar-administrative-units a {
  color: #091B3C;
}

section.similar-administrative-units a:hover,
section.similar-administrative-units a:active,
section.similar-administrative-units a:focus
 {
  color: #1F3C6F;
}

section.similar-administrative-units h2 small {
    font-size: 0.8rem;
}
</style>
