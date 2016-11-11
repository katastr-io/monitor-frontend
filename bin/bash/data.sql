DROP TABLE IF EXISTS data_${DATE};
CREATE TABLE data_${DATE} (
ku_kod integer,
ku_nazev text,
celkovy_pocet_parcel integer,
celkova_vymera numeric,
orna_puda_pp integer,
orna_puda_v numeric,
chmelnice_pp integer,
chmelnice_v numeric,
vinice_pp integer,
vinice_v numeric,
zahrada_pp integer,
zahrada_v numeric,
ovocny_sad_pp integer,
ovocny_sad_v numeric,
ttp_pp integer,
ttp_v numeric,
lesni_pozemek_pp integer,
lesni_pozemek_v numeric,
vodni_plocha_pp integer,
vodni_plocha_v numeric,
zastavena_plocha_pp integer,
zastavena_plocha_v numeric,
ostatni_plocha_pp integer,
ostatni_plocha_v numeric
);

\copy data_${DATE} FROM ${DATE}.utf.csv WITH DELIMITER ';'

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
    ostatni_plocha_v_r = round(1.0 * ostatni_plocha_v / celkova_vymera * 100, 2);