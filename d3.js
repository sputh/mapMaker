// // STEP 1 -- simple polygon
// var width = #,
// 		height = #;

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
		height = window.innerHeight,
    centered;

var projection = d3.geo.albersUsa()
    .scale(1500)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

var colour = d3.scale.category20c();

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);

var g = svg.append("g");

d3.json("states.json", function(error, us) {
  g.append("g")
      .attr("id", "states")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("d", path)
      .on("click", clicked);
});

// d3.json("states.json", function(error, us) {
//   console.log(us);
//   svg.insert("path", ".graticule")
//       .datum(topojson.feature(us, us.objects.states))
//       .attr("class", "land")
//       .attr("d", path)
//       .attr("fill", function(d, i) { return colour(i); });
      
//   svg.insert("path", ".graticule")
//       .datum(topojson.feature(us, us.objects.states, function(a, b) { return a !== b; }))
//       .attr("class", "state-boundary")
//       .attr("d", path)
//       .on("click", clicked);
// });

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}