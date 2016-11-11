#!/bin/bash

touch ../../data/data.js
echo "let data =" > ../../data/data.js

(
cat << EOF | psql -qAt --no-psqlrc
    SELECT
    array_to_json(array_agg(row_to_json(r)))
    FROM (
        SELECT *
        FROM data LIMIT 10
    ) r
EOF
) >> ../../data/data.js