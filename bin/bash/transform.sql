WITH tables AS (
    SELECT
        table_name,
        table_schema,
        'd' || id tbl,
        CASE WHEN id = 1
            THEN table_schema || '.' || table_name || ' d' || id
            ELSE 'FULL OUTER JOIN ' || table_schema || '.' || table_name || ' d' || id || ' ON (d1.ku_kod = d' || id || '.ku_kod)'
        END tbl_join
    FROM (
        SELECT
            table_name,
            table_schema,
            row_number() OVER (ORDER BY table_name) id
        FROM information_schema.tables
        WHERE table_name LIKE 'data_%'
            AND table_type = 'BASE TABLE'
            AND table_schema = 'public'
    ) a
)

SELECT 'DROP TABLE IF EXISTS data;
        CREATE TABLE data AS
        SELECT d1.ku_kod, d2.ku_nazev,'
UNION ALL
SELECT
    array_to_string(array_agg(r), ', ') r
FROM (
    SELECT
        'ARRAY[' || array_to_string(array_agg(tables.tbl || '.' || columns.column_name ORDER BY tables.table_name), ', ') || ']' || ' ' || columns.column_name r
    FROM tables
    JOIN (
        SELECT
            table_schema,
            table_name,
            column_name
        FROM information_schema.columns
        WHERE column_name NOT LIKE 'ku_%'
        ORDER BY ordinal_position
    ) columns
        ON (tables.table_name = columns.table_name AND columns.table_schema = tables.table_schema)
    GROUP BY columns.column_name
) a
UNION ALL
SELECT 'FROM'
UNION ALL
SELECT tbl_join FROM tables;
ROLLBACK;
