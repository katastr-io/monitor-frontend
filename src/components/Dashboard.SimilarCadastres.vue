<template>
    <transition name="fade">
        <section class="similar-cadastres">
            <h2>podobná katastrální území <small>určeno na základě relativního zastoupení jednotlivých druhů pozemku</small></h2>
            <p>
                <template v-for="(s, index) in similar">
                    <a @click="selectCadastre(s)" href="#">{{ s.ku_nazev }}</a><span v-if="index !== similar.length - 1">, </span>
                </template>
            </p>
        </section>
    </transition>
</template>

<script>
export default {
    name: "similar-cadastres",
    data() {
        return {
            similar: [],
        }
    },
    watch: {
        currentCadastre() {
            this.similar = this.getSimilarCadastres();
        },
        currentDate() {
            this.similar = this.getSimilarCadastres();
        }
    },
    computed: {
        currentCadastre() {
            return this.$store.state.cadastres.currentCadastre;
        },
        currentDate() {
            return this.$store.state.dates.currentDate;
        }
    },
    methods: {
        selectCadastre(cadastre) {
            this.$store.commit("selectCadastre", cadastre);
            this.$store.commit("SEARCH_TEXT",`${cadastre.ku_nazev} / ${cadastre.ku_kod}`);
        },
        getSimilarCadastres() {
            const cur = this.$store.state.cadastres.currentCadastre;
            const date = this.$store.state.dates.currentDate;
            const dateIndex = this.$store.state.dates.list.indexOf(date);

            if (!cur) {
                return;
            }

            return this.$store.state.cadastres.list
                .filter(elm => elm.ku_nazev !== cur.ku_nazev)
                .map((elm) => {
                    elm.similarity = 0;

                    for (let prop in elm) {
                        if (!prop.endsWith("_v_r")) {
                            continue;
                        }

                        elm.similarity += Math.pow(cur[prop][dateIndex] - elm[prop][dateIndex], 2);
                    }

                    return elm;
                }).sort((a, b) => a.similarity - b.similarity)
                .slice(0, 10);
        }
    }
};
</script>

<style>
section.similar-cadastres {
  background: #EDEDF3;
  border-bottom: 1px solid #C7C7CD;
  border-top: 1px solid #C7C7CD;
  flex-basis: 100%;
  margin-top: 2rem;
  padding: .5rem;
}

section.similar-cadastres a {
  color: #091B3C;
}

section.similar-cadastres a:hover,
section.similar-cadastres a:active,
section.similar-cadastres a:focus
 {
  color: #1F3C6F;
}

section.similar-cadastres h2 small {
    font-size: 0.8rem;
}
</style>
