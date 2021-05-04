#!/usr/bin/bash
shopt -s nullglob
numfiles=(*)
numfiles=${#numfiles[@]}
OUTPUTFILE="dayblazer-calendar.min.js"

uglifyjs src/js/*.js -c -m --output ${OUTPUTFILE}
if [[ ${?} -eq 0 ]]
then
    echo "Compiled ${numfiles} js files to: ${OUTPUTFILE}"
    exit 0
else
    echo "Error: Could not compile js files." >&2
    exit 1
fi
