#!/bin/bash

psql -qAt --no-psqlrc -f transform.sql | psql -qAt --no-psqlrc
