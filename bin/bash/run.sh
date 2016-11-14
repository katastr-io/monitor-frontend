#!/bin/bash
#

dates=( "20150101" "20150104" "20150701" "20151001" "20160101" "20160401" "20160701" "20161001")

for d in "${dates[@]}"; do
    ./extract.sh -f $d;
done

./transform.sh
./load.sh
