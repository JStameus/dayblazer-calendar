#!/usr/bin/bash

# This script uses uglifyjs to combine and compress JavaScript files in the
# src/js directory into a single file. Also rebuilds ctags file.
# NOTE: Requires npm package "uglifyjs" to be installed globally.

SOURCEDIR="src/js"
OUTPUTFILE="dayblazer-calendar.min.js"

ctags -R ${SOURCEDIR}/*.js
uglifyjs ${SOURCEDIR}/*.js -c -m --output ${OUTPUTFILE}
if [[ ${?} -eq 0 ]]
then
    echo "Successfully compiled js files to: ${OUTPUTFILE}"
    exit 0
else
    echo "Error: Could not compile js files." >&2
    exit 1
fi
