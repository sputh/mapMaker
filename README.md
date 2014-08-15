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
	1. physical location: http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_map_subunits.zip

	2. populated places: http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_populated_places.zip

2. Converting & filtering data:
	A. convert both files into GeoJSON
			ogr2ogr -f GeoJSON\
			-where "ADM0_A3 IN('USA')"\
			subunits.json\
			ne_10m_admin_0_subunits.shp
			
			ogr2ogr -f GeoJSON\ 
			-where "ADM0_A3 = 'USA' and SCALERANK <8"\
			states.json\
		ne_10m_populated_places.shp

	B. Merge Files
		move files into the same folder
		topojson -0 usa.json\
		--id-property SU_A3\
		--properties name=NAME\
		-- subunits.json places.json	
