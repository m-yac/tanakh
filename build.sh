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
cp -R hebcal-es6/LICENSE dist/hebcal-es6/LICENSE
cp -R hebcal-es6/README.md dist/hebcal-es6/README.md

# Build hebcal-leyning's json files for web
cd hebcal-leyning
mkdir dist
echo "var hebcal__leyning__aliyot =" > dist/aliyot.js
cat src/aliyot.json >> dist/aliyot.js
echo "var hebcal__leyning__holiday_readings =" > dist/holiday-readings.js
cat src/holiday-readings.json >> dist/holiday-readings.js
echo "var hebcal__leyning__numverses =" > dist/numverses.js
cat src/numverses.json >> dist/numverses.js
cd ..

# Build hebcal-leyning and move its outputs
cd hebcal-leyning
npm install
cd ..
mkdir dist/hebcal-leyning
cp -R hebcal-leyning/dist dist/hebcal-leyning/dist
cp -R hebcal-leyning/LICENSE dist/hebcal-leyning/LICENSE
cp -R hebcal-leyning/README.md dist/hebcal-leyning/README.md
