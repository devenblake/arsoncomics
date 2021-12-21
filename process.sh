#!/bin/sh
set -ex

command -v convert >/dev/null
command -v mogrify >/dev/null

set +x

for file in *; do
	# thanks again to WeedSmokingJew
	convert "$file" -monochrome "$file".1
	mogrify -strip "$file".1 -write "$file".2
done
