mapMaker
========

tutorial on making a D3 map

Packages:
Ubuntu:
	PREP: sudo apt-get install software-properties-common
	GDAL: sudo add-apt-repository ppa:ubuntugis/ppa
 				sudo apt-get update
 				sudo apt-get install gdal-bin
 	TOPOJSON: npm install -g topojson

MAC:
	GDAL: brew install gdal
 	TOPOJSON: npm install -g topojson

Double check that they were installed!

MAP DATA:
	1. physical location: http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_map_subunits.zip

	2. populated places: http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_populated_places.zip

1. Converting data:
ogr2ogr -f GeoJSON countries.json ne_10m_admin_0_countries_lakes.shp

2. PICKING ATTRIBUTES:
ogr2ogr -f GeoJSON -where "gu_a3 = 'USA'" states.json ne_110m_admin_0_countries.shp