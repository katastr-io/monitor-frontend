#!/bin/bash

cat << EOF | psql -qAt --no-psqlrc
DROP TABLE IF EXISTS data;
CREATE TABLE data AS
SELECT
    d1.ku_kod,
    d1.ku_nazev,
    ARRAY[d1.celkovy_pocet_parcel, d2.celkovy_pocet_parcel, d3.celkovy_pocet_parcel, d4.celkovy_pocet_parcel, d5.celkovy_pocet_parcel, d6.celkovy_pocet_parcel, d7.celkovy_pocet_parcel, d8.celkovy_pocet_parcel] celkovy_pocet_parcel,
    ARRAY[d1.celkova_vymera, d2.celkova_vymera, d3.celkova_vymera, d4.celkova_vymera, d5.celkova_vymera, d6.celkova_vymera, d7.celkova_vymera, d8.celkova_vymera] celkova_vymera,
    ARRAY[d1.orna_puda_pp, d2.orna_puda_pp, d3.orna_puda_pp, d4.orna_puda_pp, d5.orna_puda_pp, d6.orna_puda_pp, d7.orna_puda_pp, d8.orna_puda_pp] orna_puda_pp,
    ARRAY[d1.orna_puda_v, d2.orna_puda_v, d3.orna_puda_v, d4.orna_puda_v, d5.orna_puda_v, d6.orna_puda_v, d7.orna_puda_v, d8.orna_puda_v] orna_puda_v,
    ARRAY[d1.chmelnice_pp, d2.chmelnice_pp, d3.chmelnice_pp, d4.chmelnice_pp, d5.chmelnice_pp, d6.chmelnice_pp, d7.chmelnice_pp, d8.chmelnice_pp] chmelnice_pp,
    ARRAY[d1.chmelnice_v, d2.chmelnice_v, d3.chmelnice_v, d4.chmelnice_v, d5.chmelnice_v, d6.chmelnice_v, d7.chmelnice_v, d8.chmelnice_v] chmelnice_v,
    ARRAY[d1.vinice_pp, d2.vinice_pp, d3.vinice_pp, d4.vinice_pp, d5.vinice_pp, d6.vinice_pp, d7.vinice_pp, d8.vinice_pp] vinice_pp,
    ARRAY[d1.vinice_v, d2.vinice_v, d3.vinice_v, d4.vinice_v, d5.vinice_v, d6.vinice_v, d7.vinice_v, d8.vinice_v] vinice_v,
    ARRAY[d1.zahrada_pp, d2.zahrada_pp, d3.zahrada_pp, d4.zahrada_pp, d5.zahrada_pp, d6.zahrada_pp, d7.zahrada_pp, d8.zahrada_pp] zahrada_pp,
    ARRAY[d1.zahrada_v, d2.zahrada_v, d3.zahrada_v, d4.zahrada_v, d5.zahrada_v, d6.zahrada_v, d7.zahrada_v, d8.zahrada_v] zahrada_v,
    ARRAY[d1.ovocny_sad_pp, d2.ovocny_sad_pp, d3.ovocny_sad_pp, d4.ovocny_sad_pp, d5.ovocny_sad_pp, d6.ovocny_sad_pp, d7.ovocny_sad_pp, d8.ovocny_sad_pp] ovocny_sad_pp,
    ARRAY[d1.ovocny_sad_v, d2.ovocny_sad_v, d3.ovocny_sad_v, d4.ovocny_sad_v, d5.ovocny_sad_v, d6.ovocny_sad_v, d7.ovocny_sad_v, d8.ovocny_sad_v] ovocny_sad_v,
    ARRAY[d1.ttp_pp, d2.ttp_pp, d3.ttp_pp, d4.ttp_pp, d5.ttp_pp, d6.ttp_pp, d7.ttp_pp, d8.ttp_pp] ttp_pp,
    ARRAY[d1.ttp_v, d2.ttp_v, d3.ttp_v, d4.ttp_v, d5.ttp_v, d6.ttp_v, d7.ttp_v, d8.ttp_v] ttp_v,
    ARRAY[d1.lesni_pozemek_pp, d2.lesni_pozemek_pp, d3.lesni_pozemek_pp, d4.lesni_pozemek_pp, d5.lesni_pozemek_pp, d6.lesni_pozemek_pp, d7.lesni_pozemek_pp, d8.lesni_pozemek_pp] lesni_pozemek_pp,
    ARRAY[d1.lesni_pozemek_v, d2.lesni_pozemek_v, d3.lesni_pozemek_v, d4.lesni_pozemek_v, d5.lesni_pozemek_v, d6.lesni_pozemek_v, d7.lesni_pozemek_v, d8.lesni_pozemek_v] lesni_pozemek_v,
    ARRAY[d1.vodni_plocha_pp, d2.vodni_plocha_pp, d3.vodni_plocha_pp, d4.vodni_plocha_pp, d5.vodni_plocha_pp, d6.vodni_plocha_pp, d7.vodni_plocha_pp, d8.vodni_plocha_pp] vodni_plocha_pp,
    ARRAY[d1.vodni_plocha_v, d2.vodni_plocha_v, d3.vodni_plocha_v, d4.vodni_plocha_v, d5.vodni_plocha_v, d6.vodni_plocha_v, d7.vodni_plocha_v, d8.vodni_plocha_v] vodni_plocha_v,
    ARRAY[d1.zastavena_plocha_pp, d2.zastavena_plocha_pp, d3.zastavena_plocha_pp, d4.zastavena_plocha_pp, d5.zastavena_plocha_pp, d6.zastavena_plocha_pp, d7.zastavena_plocha_pp, d8.zastavena_plocha_pp] zastavena_plocha_pp,
    ARRAY[d1.zastavena_plocha_v, d2.zastavena_plocha_v, d3.zastavena_plocha_v, d4.zastavena_plocha_v, d5.zastavena_plocha_v, d6.zastavena_plocha_v, d7.zastavena_plocha_v, d8.zastavena_plocha_v] zastavena_plocha_v,
    ARRAY[d1.ostatni_plocha_pp, d2.ostatni_plocha_pp, d3.ostatni_plocha_pp, d4.ostatni_plocha_pp, d5.ostatni_plocha_pp, d6.ostatni_plocha_pp, d7.ostatni_plocha_pp, d8.ostatni_plocha_pp] ostatni_plocha_pp,
    ARRAY[d1.ostatni_plocha_v, d2.ostatni_plocha_v, d3.ostatni_plocha_v, d4.ostatni_plocha_v, d5.ostatni_plocha_v, d6.ostatni_plocha_v, d7.ostatni_plocha_v, d8.ostatni_plocha_v] ostatni_plocha_v,
    ARRAY[d1.orna_puda_pp_r, d2.orna_puda_pp_r, d3.orna_puda_pp_r, d4.orna_puda_pp_r, d5.orna_puda_pp_r, d6.orna_puda_pp_r, d7.orna_puda_pp_r, d8.orna_puda_pp_r] orna_puda_pp_r,
    ARRAY[d1.chmelnice_pp_r, d2.chmelnice_pp_r, d3.chmelnice_pp_r, d4.chmelnice_pp_r, d5.chmelnice_pp_r, d6.chmelnice_pp_r, d7.chmelnice_pp_r, d8.chmelnice_pp_r] chmelnice_pp_r,
    ARRAY[d1.vinice_pp_r, d2.vinice_pp_r, d3.vinice_pp_r, d4.vinice_pp_r, d5.vinice_pp_r, d6.vinice_pp_r, d7.vinice_pp_r, d8.vinice_pp_r] vinice_pp_r,
    ARRAY[d1.zahrada_pp_r, d2.zahrada_pp_r, d3.zahrada_pp_r, d4.zahrada_pp_r, d5.zahrada_pp_r, d6.zahrada_pp_r, d7.zahrada_pp_r, d8.zahrada_pp_r] zahrada_pp_r,
    ARRAY[d1.ovocny_sad_pp_r, d2.ovocny_sad_pp_r, d3.ovocny_sad_pp_r, d4.ovocny_sad_pp_r, d5.ovocny_sad_pp_r, d6.ovocny_sad_pp_r, d7.ovocny_sad_pp_r, d8.ovocny_sad_pp_r] ovocny_sad_pp_r,
    ARRAY[d1.ttp_pp_r, d2.ttp_pp_r, d3.ttp_pp_r, d4.ttp_pp_r, d5.ttp_pp_r, d6.ttp_pp_r, d7.ttp_pp_r, d8.ttp_pp_r] ttp_pp_r,
    ARRAY[d1.lesni_pozemek_pp_r, d2.lesni_pozemek_pp_r, d3.lesni_pozemek_pp_r, d4.lesni_pozemek_pp_r, d5.lesni_pozemek_pp_r, d6.lesni_pozemek_pp_r, d7.lesni_pozemek_pp_r, d8.lesni_pozemek_pp_r] lesni_pozemek_pp_r,
    ARRAY[d1.vodni_plocha_pp_r, d2.vodni_plocha_pp_r, d3.vodni_plocha_pp_r, d4.vodni_plocha_pp_r, d5.vodni_plocha_pp_r, d6.vodni_plocha_pp_r, d7.vodni_plocha_pp_r, d8.vodni_plocha_pp_r] vodni_plocha_pp_r,
    ARRAY[d1.zastavena_plocha_pp_r, d2.zastavena_plocha_pp_r, d3.zastavena_plocha_pp_r, d4.zastavena_plocha_pp_r, d5.zastavena_plocha_pp_r, d6.zastavena_plocha_pp_r, d7.zastavena_plocha_pp_r, d8.zastavena_plocha_pp_r] zastavena_plocha_pp_r,
    ARRAY[d1.ostatni_plocha_pp_r, d2.ostatni_plocha_pp_r, d3.ostatni_plocha_pp_r, d4.ostatni_plocha_pp_r, d5.ostatni_plocha_pp_r, d6.ostatni_plocha_pp_r, d7.ostatni_plocha_pp_r, d8.ostatni_plocha_pp_r] ostatni_plocha_pp_r,
    ARRAY[d1.orna_puda_v_r, d2.orna_puda_v_r, d3.orna_puda_v_r, d4.orna_puda_v_r, d5.orna_puda_v_r, d6.orna_puda_v_r, d7.orna_puda_v_r, d8.orna_puda_v_r] orna_puda_v_r,
    ARRAY[d1.chmelnice_v_r, d2.chmelnice_v_r, d3.chmelnice_v_r, d4.chmelnice_v_r, d5.chmelnice_v_r, d6.chmelnice_v_r, d7.chmelnice_v_r, d8.chmelnice_v_r] chmelnice_v_r,
    ARRAY[d1.vinice_v_r, d2.vinice_v_r, d3.vinice_v_r, d4.vinice_v_r, d5.vinice_v_r, d6.vinice_v_r, d7.vinice_v_r, d8.vinice_v_r] vinice_v_r,
    ARRAY[d1.zahrada_v_r, d2.zahrada_v_r, d3.zahrada_v_r, d4.zahrada_v_r, d5.zahrada_v_r, d6.zahrada_v_r, d7.zahrada_v_r, d8.zahrada_v_r] zahrada_v_r,
    ARRAY[d1.ovocny_sad_v_r, d2.ovocny_sad_v_r, d3.ovocny_sad_v_r, d4.ovocny_sad_v_r, d5.ovocny_sad_v_r, d6.ovocny_sad_v_r, d7.ovocny_sad_v_r, d8.ovocny_sad_v_r] ovocny_sad_v_r,
    ARRAY[d1.ttp_v_r, d2.ttp_v_r, d3.ttp_v_r, d4.ttp_v_r, d5.ttp_v_r, d6.ttp_v_r, d7.ttp_v_r, d8.ttp_v_r] ttp_v_r,
    ARRAY[d1.lesni_pozemek_v_r, d2.lesni_pozemek_v_r, d3.lesni_pozemek_v_r, d4.lesni_pozemek_v_r, d5.lesni_pozemek_v_r, d6.lesni_pozemek_v_r, d7.lesni_pozemek_v_r, d8.lesni_pozemek_v_r] lesni_pozemek_v_r,
    ARRAY[d1.vodni_plocha_v_r, d2.vodni_plocha_v_r, d3.vodni_plocha_v_r, d4.vodni_plocha_v_r, d5.vodni_plocha_v_r, d6.vodni_plocha_v_r, d7.vodni_plocha_v_r, d8.vodni_plocha_v_r] vodni_plocha_v_r,
    ARRAY[d1.zastavena_plocha_v_r, d2.zastavena_plocha_v_r, d3.zastavena_plocha_v_r, d4.zastavena_plocha_v_r, d5.zastavena_plocha_v_r, d6.zastavena_plocha_v_r, d7.zastavena_plocha_v_r, d8.zastavena_plocha_v_r] zastavena_plocha_v_r,
    ARRAY[d1.ostatni_plocha_v_r, d2.ostatni_plocha_v_r, d3.ostatni_plocha_v_r, d4.ostatni_plocha_v_r, d5.ostatni_plocha_v_r, d6.ostatni_plocha_v_r, d7.ostatni_plocha_v_r, d8.ostatni_plocha_v_r] ostatni_plocha_v_r,
    ARRAY[d1.orna_puda_v_avg, d1.orna_puda_v_avg, d3.orna_puda_v_avg, d4.orna_puda_v_avg, d5.orna_puda_v_avg, d6.orna_puda_v_avg, d7.orna_puda_v_avg, d8.orna_puda_v_avg] orna_puda_v_avg,
    ARRAY[d1.chmelnice_v_avg, d1.chmelnice_v_avg, d3.chmelnice_v_avg, d4.chmelnice_v_avg, d5.chmelnice_v_avg, d6.chmelnice_v_avg, d7.chmelnice_v_avg, d8.chmelnice_v_avg] chmelnice_v_avg,
    ARRAY[d1.vinice_v_avg, d1.vinice_v_avg, d3.vinice_v_avg, d4.vinice_v_avg, d5.vinice_v_avg, d6.vinice_v_avg, d7.vinice_v_avg, d8.vinice_v_avg] vinice_v_avg,
    ARRAY[d1.zahrada_v_avg, d1.zahrada_v_avg, d3.zahrada_v_avg, d4.zahrada_v_avg, d5.zahrada_v_avg, d6.zahrada_v_avg, d7.zahrada_v_avg, d8.zahrada_v_avg] zahrada_v_avg,
    ARRAY[d1.ovocny_sad_v_avg, d1.ovocny_sad_v_avg, d3.ovocny_sad_v_avg, d4.ovocny_sad_v_avg, d5.ovocny_sad_v_avg, d6.ovocny_sad_v_avg, d7.ovocny_sad_v_avg, d8.ovocny_sad_v_avg] ovocny_sad_v_avg,
    ARRAY[d1.ttp_v_avg, d1.ttp_v_avg, d3.ttp_v_avg, d4.ttp_v_avg, d5.ttp_v_avg, d6.ttp_v_avg, d7.ttp_v_avg, d8.ttp_v_avg] ttp_v_avg,
    ARRAY[d1.lesni_pozemek_v_avg, d1.lesni_pozemek_v_avg, d3.lesni_pozemek_v_avg, d4.lesni_pozemek_v_avg, d5.lesni_pozemek_v_avg, d6.lesni_pozemek_v_avg, d7.lesni_pozemek_v_avg, d8.lesni_pozemek_v_avg] lesni_pozemek_v_avg,
    ARRAY[d1.vodni_plocha_v_avg, d1.vodni_plocha_v_avg, d3.vodni_plocha_v_avg, d4.vodni_plocha_v_avg, d5.vodni_plocha_v_avg, d6.vodni_plocha_v_avg, d7.vodni_plocha_v_avg, d8.vodni_plocha_v_avg] vodni_plocha_v_avg,
    ARRAY[d1.zastavena_plocha_v_avg, d1.zastavena_plocha_v_avg, d3.zastavena_plocha_v_avg, d4.zastavena_plocha_v_avg, d5.zastavena_plocha_v_avg, d6.zastavena_plocha_v_avg, d7.zastavena_plocha_v_avg, d8.zastavena_plocha_v_avg] zastavena_plocha_v_avg,
    ARRAY[d1.ostatni_plocha_v_avg, d1.ostatni_plocha_v_avg, d3.ostatni_plocha_v_avg, d4.ostatni_plocha_v_avg, d5.ostatni_plocha_v_avg, d6.ostatni_plocha_v_avg, d7.ostatni_plocha_v_avg, d8.ostatni_plocha_v_avg] ostatni_plocha_v_avg
FROM data_20150101 d1
FULL OUTER JOIN data_20150104 d2 ON (d1.ku_kod = d2.ku_kod)
FULL OUTER JOIN data_20150701 d3 ON (d1.ku_kod = d3.ku_kod)
FULL OUTER JOIN data_20151001 d4 ON (d1.ku_kod = d4.ku_kod)
FULL OUTER JOIN data_20160101 d5 ON (d1.ku_kod = d5.ku_kod)
FULL OUTER JOIN data_20160401 d6 ON (d1.ku_kod = d6.ku_kod)
FULL OUTER JOIN data_20160701 d7 ON (d1.ku_kod = d7.ku_kod)
FULL OUTER JOIN data_20161001 d8 ON (d1.ku_kod = d8.ku_kod);

EOF
