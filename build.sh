#!/bin/bash

rm -rf dist/bundle.js
cat lib/mk.js >> dist/manaknight.js
cat lib/mustache.js >> dist/manaknight.js
cat lib/hash-router.min.js >> dist/manaknight.js
cat lib/utility.js >> dist/bundle.js
cat app/iocContainer.js >> dist/bundle.js
for f in "app/plugins/*"
do
    cat $f >> dist/bundle.js
done
for f in "app/modules/*"
do
    cat $f >> dist/bundle.js
done
cat app/app.js >> dist/bundle.js
uglifyjs --compress --mangle -o dist/manaknight.min.js dist/manaknight.js
uglifyjs --compress --mangle -o dist/bundle.min.js dist/bundle.js
gulp