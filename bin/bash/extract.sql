DROP TABLE IF EXISTS data_${DATE};
CREATE TABLE data_${DATE} (
ku_kod integer,
ku_nazev text,
celkovy_pocet_parcel integer,
celkova_vymera numeric,
orna_puda_pp integer,
orna_puda_v integer,
chmelnice_pp integer,
chmelnice_v integer,
vinice_pp integer,
vinice_v integer,
zahrada_pp integer,
zahrada_v integer,
ovocny_sad_pp integer,
ovocny_sad_v integer,
ttp_pp integer,
ttp_v integer,
lesni_pozemek_pp integer,
lesni_pozemek_v integer,
vodni_plocha_pp integer,
vodni_plocha_v integer,
zastavena_plocha_pp integer,
zastavena_plocha_v integer,
ostatni_plocha_pp integer,
ostatni_plocha_v integer
);

\copy data_${DATE} FROM ${DATE}.utf.csv WITH DELIMITER ';'

/**
 * Deliberately suffxing these columns with `1`
 * so they don't apper on charts.
 */
ALTER TABLE data_${DATE} ADD COLUMN zemedelska_puda_pp1 integer;
ALTER TABLE data_${DATE} ADD COLUMN zemedelska_puda_v1 integer;
ALTER TABLE data_${DATE} ADD COLUMN zemedelska_puda_pp_r1 numeric;
ALTER TABLE data_${DATE} ADD COLUMN zemedelska_puda_v_r1 numeric;
---
ALTER TABLE data_${DATE} ADD COLUMN orna_puda_pp_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN chmelnice_pp_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN vinice_pp_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN zahrada_pp_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN ovocny_sad_pp_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN ttp_pp_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN lesni_pozemek_pp_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN vodni_plocha_pp_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN zastavena_plocha_pp_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN ostatni_plocha_pp_r numeric;
---
ALTER TABLE data_${DATE} ADD COLUMN orna_puda_v_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN chmelnice_v_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN vinice_v_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN zahrada_v_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN ovocny_sad_v_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN ttp_v_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN lesni_pozemek_v_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN vodni_plocha_v_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN zastavena_plocha_v_r numeric;
ALTER TABLE data_${DATE} ADD COLUMN ostatni_plocha_v_r numeric;
---
ALTER TABLE data_${DATE} ADD COLUMN orna_puda_v_avg numeric;
ALTER TABLE data_${DATE} ADD COLUMN chmelnice_v_avg numeric;
ALTER TABLE data_${DATE} ADD COLUMN vinice_v_avg numeric;
ALTER TABLE data_${DATE} ADD COLUMN zahrada_v_avg numeric;
ALTER TABLE data_${DATE} ADD COLUMN ovocny_sad_v_avg numeric;
ALTER TABLE data_${DATE} ADD COLUMN ttp_v_avg numeric;
ALTER TABLE data_${DATE} ADD COLUMN lesni_pozemek_v_avg numeric;
ALTER TABLE data_${DATE} ADD COLUMN vodni_plocha_v_avg numeric;
ALTER TABLE data_${DATE} ADD COLUMN zastavena_plocha_v_avg numeric;
ALTER TABLE data_${DATE} ADD COLUMN ostatni_plocha_v_avg numeric;
---
UPDATE data_${DATE}
SET orna_puda_pp_r = round(1.0 * orna_puda_pp / celkovy_pocet_parcel * 100, 2),
    chmelnice_pp_r = round(1.0 * chmelnice_pp / celkovy_pocet_parcel * 100, 2),
    vinice_pp_r = round(1.0 * vinice_pp / celkovy_pocet_parcel * 100, 2),
    zahrada_pp_r = round(1.0 * zahrada_pp / celkovy_pocet_parcel * 100, 2),
    ovocny_sad_pp_r = round(1.0 * ovocny_sad_pp / celkovy_pocet_parcel * 100, 2),
    ttp_pp_r = round(1.0 * ttp_pp / celkovy_pocet_parcel * 100, 2),
    lesni_pozemek_pp_r = round(1.0 * lesni_pozemek_pp / celkovy_pocet_parcel * 100, 2),
    vodni_plocha_pp_r = round(1.0 * vodni_plocha_pp / celkovy_pocet_parcel * 100, 2),
    zastavena_plocha_pp_r = round(1.0 * zastavena_plocha_pp / celkovy_pocet_parcel * 100, 2),
    ostatni_plocha_pp_r = round(1.0 * ostatni_plocha_pp / celkovy_pocet_parcel * 100, 2),
    ---
    orna_puda_v_r = round(1.0 * orna_puda_v / celkova_vymera * 100, 2),
    chmelnice_v_r = round(1.0 * chmelnice_v / celkova_vymera * 100, 2),
    vinice_v_r = round(1.0 * vinice_v / celkova_vymera * 100, 2),
    zahrada_v_r = round(1.0 * zahrada_v / celkova_vymera * 100, 2),
    ovocny_sad_v_r = round(1.0 * ovocny_sad_v / celkova_vymera * 100, 2),
    ttp_v_r = round(1.0 * ttp_v / celkova_vymera * 100, 2),
    lesni_pozemek_v_r = round(1.0 * lesni_pozemek_v / celkova_vymera * 100, 2),
    vodni_plocha_v_r = round(1.0 * vodni_plocha_v / celkova_vymera * 100, 2),
    zastavena_plocha_v_r = round(1.0 * zastavena_plocha_v / celkova_vymera * 100, 2),
    ostatni_plocha_v_r = round(1.0 * ostatni_plocha_v / celkova_vymera * 100, 2),
    ---
    orna_puda_v_avg = round(COALESCE((orna_puda_v::numeric / NULLIF(orna_puda_pp, 0)), 0)::numeric),
    chmelnice_v_avg = round(COALESCE((chmelnice_v::numeric / NULLIF(chmelnice_pp, 0)), 0)::numeric),
    vinice_v_avg = round(COALESCE((vinice_v::numeric / NULLIF(vinice_pp, 0)), 0)::numeric),
    zahrada_v_avg = round(COALESCE((zahrada_v::numeric / NULLIF(zahrada_pp, 0)), 0)::numeric),
    ovocny_sad_v_avg = round(COALESCE((ovocny_sad_v::numeric / NULLIF(ovocny_sad_pp, 0)), 0)::numeric),
    ttp_v_avg = round(COALESCE((ttp_v::numeric / NULLIF(ttp_pp, 0)), 0)::numeric),
    lesni_pozemek_v_avg = round(COALESCE((lesni_pozemek_v::numeric / NULLIF(lesni_pozemek_pp, 0)), 0)::numeric),
    vodni_plocha_v_avg = round(COALESCE((vodni_plocha_v::numeric / NULLIF(vodni_plocha_pp, 0)), 0)::numeric),
    zastavena_plocha_v_avg = round(COALESCE((zastavena_plocha_v::numeric / NULLIF(zastavena_plocha_pp, 0)), 0)::numeric),
    ostatni_plocha_v_avg = round(COALESCE((ostatni_plocha_v::numeric / NULLIF(ostatni_plocha_pp, 0)), 0)::numeric);

UPDATE data_${DATE}
SET zemedelska_puda_v1 = (ovocny_sad_v + ttp_v + vinice_v + chmelnice_v + orna_puda_v + zahrada_v + lesni_pozemek_v) / 10000,
    zemedelska_puda_pp1 = ovocny_sad_pp + ttp_pp + vinice_pp + chmelnice_pp + orna_puda_pp + zahrada_pp + lesni_pozemek_pp,
    orna_puda_v = (orna_puda_v/10000)::integer,
    chmelnice_v = (chmelnice_v/10000)::integer,
    vinice_v = (vinice_v/10000)::integer,
    zahrada_v = (zahrada_v/10000)::integer,
    ovocny_sad_v = (ovocny_sad_v/10000)::integer,
    ttp_v = (ttp_v/10000)::integer,
    lesni_pozemek_v = (lesni_pozemek_v/10000)::integer,
    vodni_plocha_v = (vodni_plocha_v/10000)::integer,
    zastavena_plocha_v = (zastavena_plocha_v/10000)::integer,
    ostatni_plocha_v = (ostatni_plocha_v/10000)::integer;

UPDATE data_${DATE}
SET zemedelska_puda_v_r1 = round(1.0 * zemedelska_puda_v1 / celkova_vymera * 100, 2),
    zemedelska_puda_pp_r1 = round(1.0 * zemedelska_puda_pp1 / celkovy_pocet_parcel * 100, 2);
