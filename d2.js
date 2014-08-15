var width = window.innerWidth,
height = window.innerHeight;

var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height)
.append('g')
.attr("transform", "translate(" + 20 + "," + 20 +")");

queue()
	.defer(d3.tsv, "merged-multirace.txt")
  .defer(d3.json, "ca-counties.json")
  .await(ready);

// d3.json("usOfA.json", function(error, usa) {
//   svg.append("path")
//   	.datum(topojson.feature(usa, usa.objects.subunits))
//   	.attr("d", path);
// });
// // d3.json("usOfA.json", function(error, usa) {
function ready(error, data, ca) {

  var counties = topojson.feature(ca, ca.objects.counties);

  // convert our data into numbers
  data.forEach(function(d) {
    d.year = +d.year;
    d.fips = +d.fips;
    d.pctasian = +d.pctasian;
  });

  // d3.nest the data by county then by year
  var dataByCountyByYear = d3.nest()
    .key(function(d) { return d.fips; })
    .key(function(d) { return d.year; })
    .map(data);

  // merge geo data with our census data
  counties.features.forEach(function(county) {
    county.properties.years = dataByCountyByYear[+county.id]
  });

  var color = d3.scale.linear()
    .domain([0, 1])
    .range(["orange", "blue"]);

  var projection = d3.geo.albers()
    .translate([width / 2, height / 2 - 100])
    .parallels([34, 40.5])
    .rotate([120, 0])
    .scale(3000);

  var path = d3.geo.path()
    .projection(projection);

  var countyShapes = svg.selectAll(".county")
      .data(counties.features)
    .enter().append("path")
      .attr("class", "county")
      .attr("d", path);

  function update(year){
    slider.property("value", year);
    d3.select(".year").text(year);
    countyShapes.style("fill", function(d) {
      return color(d.properties.years[year][0].pctasian)
    });
  }

  var slider = d3.select(".slider").append("input")
      .attr("type", "range")
      .attr("min", 1980)
      .attr("max", 2020)
      .attr("step", 10)
      .on("change", function() {
        var year = this.value;
        update(year);
      });

  update(1980);
}