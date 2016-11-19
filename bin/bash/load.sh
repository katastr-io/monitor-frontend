#!/bin/bash

rm -f ../../static/data.js

(
cat << EOF | psql -qAt --no-psqlrc
    SELECT
    array_to_json(array_agg(row_to_json(r)))
    FROM (
        SELECT *
        FROM data
    ) r
EOF
) > ../../static/data.js