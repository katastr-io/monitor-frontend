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

URL=http://services.cuzk.cz/sestavy/UHDP/UHDP-
CSVFILE=$FILE.csv
CSVUTF8FILE=${CSVFILE%.*}.utf.csv
URL+=$CSVFILE

echo "downloading $URL"
wget -q $URL -O $CSVFILE

if [[ $? != 0 ]]; then
    rm -f $CSVFILE
    echo "download failed"
    exit
fi

echo "converting to utf-8"
iconv -f WINDOWS-1250 -t UTF-8 $CSVFILE -o $CSVUTF8FILE && \
echo "modifying ${FILE}"
sed -i 's/^M$//' $CSVUTF8FILE && \
sed -i 's/\r$//' $CSVUTF8FILE && \
sed -i 's/;*$//g' $CSVUTF8FILE && \
sed -i '1d' $CSVUTF8FILE

rm $CSVFILE
