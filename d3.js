// // STEP 1 -- simple poly
// var width = 960,
// 		height = 1160;

// var svg = d3.select("body").append("svg")
// 	.attr("width", width)
// 	.attr("height", height);

// d3.json("FILE.JSON", function(error, COUNTRY) {
//   if (error) return console.error(error);
//   console.log(COUNTRY);

//   svg.append("path")
//   	.datum(topojson.feature(COUNTRY, COUNTRY.objects.SUBUNIT(S)))
//   	.attr("d", d3.geo.path().PROJECTION);
// });

var width = window.innerWidth,
		height = window.innerHeight;

var projection = d3.geo.albersUsa()
    .scale(1500)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

d3.json("usOfA.json", function(error, usa) {
  svg.append("path")
  	.datum(topojson.feature(usa, usa.objects.subunits))
  	.attr("d", path);
});

d3.json("statesList.json", function(error, state) {
	svg.insert("path", ".graticule")
    .datum(topojson.feature(state, state.d)) 
    .attr("class", "state-boundary")
    .attr("d", path);
 });