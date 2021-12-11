#!/bin/sh
set -e

argv0="$0"

# depends on bc(1), printf(1), sed(1), stris(1)

_core(){
	sed 's/\$PAGE/'$PAGE'/g' <"$HEADER"
	[ $PAGE -eq 0 ] \
		&& I=1 \
		|| I=0
	while [ $I -lt $MAX_ON_PAGE ]; do
		printf "\
<TR>
	<TD><H2 ID=\"$I\">$PAGE$I</H2></TD>
	<TD><IMG CLASS=\"comic\" SRC=\"/img/$PAGE$I.png\" /></TD>
</TR>
"
		I=$(printf "$I + 1\n" | bc)
	done
	sed 's/\$PAGE/'$PAGE'/g' <"$FOOTER"
	return 0
}

usage(){
	printf "Usage: %s [latest]\n" "$argv0"
	exit 1
}

# validation
[ -n "$1" ] && [ -z "$2" ] && stris uint "$1" \
	|| usage
[ -n "$HEADER" ] \
	|| HEADER="header.html.txt"
[ -n "$FOOTER" ] \
	|| FOOTER="footer.html.txt"
MAX=$1

PAGE_MAX=$(printf "$MAX / 10\n" | bc)

PAGE=000

MAX_ON_PAGE=10

while [ $PAGE -lt $PAGE_MAX ] || [ $PAGE -eq $PAGE_MAX ]; do
	[ $(printf "($PAGE + 1) * 10\n" | bc) -gt $MAX ] \
		&& MAX_ON_PAGE=$(printf "$MAX - ($PAGE * 10)\n" | bc) \
		|| true
	_core >$PAGE.html
	PAGE=$(printf "$PAGE + 1\n" | bc)
done
