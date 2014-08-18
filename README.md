mapMaker
========

tutorial on initializing a D3 map

1. Install Packages:
---------------------
Ubuntu:
	PREP: sudo apt-get install software-properties-common
	GDAL: sudo add-apt-repository ppa:ubuntugis/ppa
 				sudo apt-get update
 				sudo apt-get install gdal-bin
 	TOPOJSON: npm install -g topojson

MAC:
	GDAL: homebrew install gdal
 	TOPOJSON: npm install -g topojson

Double check that they were installed!

2. Grabbing geological datum 
-----------------------------
MAP DATA:
	Resources for data:
	a. Natural Earth
	b. U.S. Census Bureau -- the best for US topography

	What I'm Using
	1. physical location: http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_map_subunits.zip

	2. populated places: http//www.naturalearthdata.com/download/10m/cultural/ne_10m_populated_places.zip

3. Converting & filtering data:
----------------------------------
	mapshaper.org
	1. Drag and Drop Original Shape File
	2. Save new file 
	3. Convert both .shp and .shx of desired region to topoJSON

4. Starting up a Server
----------------------------------
		-- http-server
		- http-server -p 8008 &