var chart = d3.select("#graph").append("svg").attr("width", "600").attr("height", "400");

var rects = chart.selectAll('rect')
      .data([0, 0, 0])
      .enter().append('rect')
      .attr("stroke", "none").attr("fill", "rgb(7, 130, 180)")
      .attr("x", 25)
      .attr("y", function(d, i) { return 25 * i; } )
      .attr("width", function(d) { return 20 * d; } )
      .attr("height", "20");

chart.selectAll("text.name")
  .data(["A", "B", "C"])
  .enter().append("text")
  .attr("x", 5)
  .attr("y", function(d, i) { return 25 * i; } )
  .attr("dy", ".86em")
  .attr("text-anchor", "middle")
  .attr('class', 'name')
  .text(String);

var updateGraph = function(newData) {
  rects.data(newData)
    .transition().duration(1000).delay(200)
    .attr("width", function(d) { return d * 20; } );
};
