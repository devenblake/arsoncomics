#!/bin/sh

if ! command -v convert >/dev/null 2>&1; then
	printf "This script depends on ImageMagick.\n" 1>&2
	exit 69 # sysexits(3) EX_UNAVAILABLE
fi

# thanks again to WeedSmokingJew
conversion(){ convert /dev/stdin -monochrome /dev/stdout; }

for file in $(ls .)
do conversion <"$file" >"$file".out
done
