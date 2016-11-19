<template>
    <transition name="fade">
      <section class="dashboard">
        <section class="charts">
          <barchart-legend></barchart-legend>
          <barchart where="area" heading="výměra [%]" bartype="areaRatio"></barchart>
          <barchart where="parcel" heading="parcely [%]" bartype="parcelRatio"></barchart>
          <barchart where="parcel-avg-area" heading="průměrná výměra parcely [m2]" bartype="parcelAvgArea"></barchart>
        </section>
          <similar-cadastres></similar-cadastres>
          <linechart></linechart>
      </section>
    </transition>
</template>

<script>
import Barchart from "./Dashboard.Barchart";
import Linechart from "./Dashboard.Linechart";
import BarchartLegend from "./Dashboard.BarchartLegend";
import SimilarCadastres from "./Dashboard.SimilarCadastres";

export default {
    name: "dashboard",
    components: {
        Barchart,
        Linechart,
        "barchart-legend": BarchartLegend,
        "similar-cadastres": SimilarCadastres
    }
};
</script>

<style>
    .dashboard {
      flex-wrap: wrap;
    }

    .dashboard,
    .charts,
    .barchart {
      display: flex;
    }

    .barchart section,
    .linechart {
      flex: 1 0 auto; /* 33 % */
    }

    .linechart,
    .linechart section {
      display: flex;
    }

    .linechart {
      flex-wrap: wrap;
    }

    section.line-chart-header {
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      padding-top: 1rem;
      width: 100%;
    }

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

    .barchart div {
        color: #1F3C6F;
        font-size: .8rem;
        font-weight: 400;
        margin: 3px;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: right;
        white-space: nowrap;
        }

    .barchart svg {
      width: 400px;
    }

    svg text {
      fill: #1F3C6F;
      font-family: 'Roboto', sans-serif;
      font-size: .8rem;
      font-weight: 300;
    }
</style>
