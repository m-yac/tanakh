#!/bin/bash

# Download jquery
curl -o jquery.min.js https://code.jquery.com/jquery-3.6.0.min.js

# Clear out the `dist` directory
rm -rf dist
mkdir dist

# Move the source files
cp *.js dist
cp *.html dist
cp *.css dist
cp *.ttf dist
cp favicons/* dist
cp .nojekyll dist

# Build hebcal-es6 and move its outputs
cd hebcal-es6
npm install
cd ..
mkdir dist/hebcal-es6
cp -R hebcal-es6/dist dist/hebcal-es6/dist
cp -R hebcal-es6/README.md dist/hebcal-es6/README.md

# Build hebcal-leyning and move its outputs
cd hebcal-leyning
npm install
cd ..
mkdir dist/hebcal-leyning
cp -R hebcal-leyning/dist dist/hebcal-leyning/dist
cp -R hebcal-leyning/README.md dist/hebcal-leyning/README.md
