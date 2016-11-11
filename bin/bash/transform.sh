#!/bin/bash

while [[ $# -gt 1 ]]
do
key="$1"

case $key in
    -f|--file)
    FILE="$2"
    shift # past argument
    ;;
    *)
            # unknown option
    ;;
esac
shift # past argument or value
done

echo "importing to database"
sed -e "s/\${DATE}/$FILE/g" data.sql | psql -qAt --no-psqlrc

cat << EOF | psql -qAt --no-psqlrc
DROP TABLE IF EXISTS data;
CREATE TABLE data AS
SELECT
    d1.ku_kod,
    d1.ku_nazev,
    ARRAY[d1.celkovy_pocet_parcel, d2.celkovy_pocet_parcel] celkovy_pocet_parcel,
    ARRAY[d1.celkova_vymera, d2.celkova_vymera] celkova_vymera,
    ARRAY[d1.orna_puda_pp, d2.orna_puda_pp] orna_puda_pp,
    ARRAY[d1.orna_puda_v, d2.orna_puda_v] orna_puda_v,
    ARRAY[d1.chmelnice_pp, d2.chmelnice_pp] chmelnice_pp,
    ARRAY[d1.chmelnice_v, d2.chmelnice_v] chmelnice_v,
    ARRAY[d1.vinice_pp, d2.vinice_pp] vinice_pp,
    ARRAY[d1.vinice_v, d2.vinice_v] vinice_v,
    ARRAY[d1.zahrada_pp, d2.zahrada_pp] zahrada_pp,
    ARRAY[d1.zahrada_v, d2.zahrada_v] zahrada_v,
    ARRAY[d1.ovocny_sad_pp, d2.ovocny_sad_pp] ovocny_sad_pp,
    ARRAY[d1.ovocny_sad_v, d2.ovocny_sad_v] ovocny_sad_v,
    ARRAY[d1.ttp_pp, d2.ttp_pp] ttp_pp,
    ARRAY[d1.ttp_v, d2.ttp_v] ttp_v,
    ARRAY[d1.lesni_pozemek_pp, d2.lesni_pozemek_pp] lesni_pozemek_pp,
    ARRAY[d1.lesni_pozemek_v, d2.lesni_pozemek_v] lesni_pozemek_v,
    ARRAY[d1.vodni_plocha_pp, d2.vodni_plocha_pp] vodni_plocha_pp,
    ARRAY[d1.vodni_plocha_v, d2.vodni_plocha_v] vodni_plocha_v,
    ARRAY[d1.zastavena_plocha_pp, d2.zastavena_plocha_pp] zastavena_plocha_pp,
    ARRAY[d1.zastavena_plocha_v, d2.zastavena_plocha_v] zastavena_plocha_v,
    ARRAY[d1.ostatni_plocha_pp, d2.ostatni_plocha_pp] ostatni_plocha_pp,
    ARRAY[d1.ostatni_plocha_v, d2.ostatni_plocha_v] ostatni_plocha_v,
    ARRAY[d1.orna_puda_pp_r, d2.orna_puda_pp_r] orna_puda_pp_r,
    ARRAY[d1.chmelnice_pp_r, d2.chmelnice_pp_r] chmelnice_pp_r,
    ARRAY[d1.vinice_pp_r, d2.vinice_pp_r] vinice_pp_r,
    ARRAY[d1.zahrada_pp_r, d2.zahrada_pp_r] zahrada_pp_r,
    ARRAY[d1.ovocny_sad_pp_r, d2.ovocny_sad_pp_r] ovocny_sad_pp_r,
    ARRAY[d1.ttp_pp_r, d2.ttp_pp_r] ttp_pp_r,
    ARRAY[d1.lesni_pozemek_pp_r, d2.lesni_pozemek_pp_r] lesni_pozemek_pp_r,
    ARRAY[d1.vodni_plocha_pp_r, d2.vodni_plocha_pp_r] vodni_plocha_pp_r,
    ARRAY[d1.zastavena_plocha_pp_r, d2.zastavena_plocha_pp_r] zastavena_plocha_pp_r,
    ARRAY[d1.ostatni_plocha_pp_r, d2.ostatni_plocha_pp_r] ostatni_plocha_pp_r,
    ARRAY[d1.orna_puda_v_r, d2.orna_puda_v_r] orna_puda_v_r,
    ARRAY[d1.chmelnice_v_r, d2.chmelnice_v_r] chmelnice_v_r,
    ARRAY[d1.vinice_v_r, d2.vinice_v_r] vinice_v_r,
    ARRAY[d1.zahrada_v_r, d2.zahrada_v_r] zahrada_v_r,
    ARRAY[d1.ovocny_sad_v_r, d2.ovocny_sad_v_r] ovocny_sad_v_r,
    ARRAY[d1.ttp_v_r, d2.ttp_v_r] ttp_v_r,
    ARRAY[d1.lesni_pozemek_v_r, d2.lesni_pozemek_v_r] lesni_pozemek_v_r,
    ARRAY[d1.vodni_plocha_v_r, d2.vodni_plocha_v_r] vodni_plocha_v_r,
    ARRAY[d1.zastavena_plocha_v_r, d2.zastavena_plocha_v_r] zastavena_plocha_v_r,
    ARRAY[d1.ostatni_plocha_v_r, d2.ostatni_plocha_v_r] ostatni_plocha_v_r,
    ARRAY[d1.orna_puda_v_avg, d1.orna_puda_v_avg] orna_puda_v_avg,
    ARRAY[d1.chmelnice_v_avg, d1.chmelnice_v_avg] chmelnice_v_avg,
    ARRAY[d1.vinice_v_avg, d1.vinice_v_avg] vinice_v_avg,
    ARRAY[d1.zahrada_v_avg, d1.zahrada_v_avg] zahrada_v_avg,
    ARRAY[d1.ovocny_sad_v_avg, d1.ovocny_sad_v_avg] ovocny_sad_v_avg,
    ARRAY[d1.ttp_v_avg, d1.ttp_v_avg] ttp_v_avg,
    ARRAY[d1.lesni_pozemek_v_avg, d1.lesni_pozemek_v_avg] lesni_pozemek_v_avg,
    ARRAY[d1.vodni_plocha_v_avg, d1.vodni_plocha_v_avg] vodni_plocha_v_avg,
    ARRAY[d1.zastavena_plocha_v_avg, d1.zastavena_plocha_v_avg] zastavena_plocha_v_avg,
    ARRAY[d1.ostatni_plocha_v_avg, d1.ostatni_plocha_v_avg] ostatni_plocha_v_avg
FROM data_20150101 d1
FULL OUTER JOIN data_20150104 d2 ON (d1.ku_kod = d2.ku_kod);
EOF

rm -f $FILE.utf.csv
