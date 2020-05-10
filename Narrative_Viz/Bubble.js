class Bubble {

    constructor(state, setGlobalState) {
      
      this.width = 500;
      this.height = 500;

      this.svg = d3.select("#bubble")
      .append("svg")
      .attr("height", this.height)
      .attr("width", this.width)
      
    }
  
    draw(state, setGlobalState) {

      var radiusScale = d3.scaleSqrt().domain([1,300]).range([10,80])

      var node = this.svg.append("g")
      .attr("transform", "translate(0,0)")
      .selectAll("circle")
      .data(state.tableData)
      .enter()
      .append("circle")
      .attr("r", function(d){
        return radiusScale(d.count)
      })
      .attr("cx", this.width / 2)
      .attr("cy", this.height / 2)
      .style("fill", "#69b3a2")
      .style("fill-opacity", 0.3)
      .attr("stroke", "#69a2b2")
      .style("stroke-width", 4)

      

      var simulation = d3.forceSimulation()
     .force("center", d3.forceCenter().x(this.width / 2).y(this.height / 2)) // Attraction to the center of the svg area
     .force("charge", d3.forceManyBody().strength(0.05)) // Nodes are attracted one each other of value is > 0
     .force("collide", d3.forceCollide(function(d) { radiusScale(d.count)})) // Force that avoids circle overlapping

     simulation
     .nodes(state.tableData)
     .on("tick", function(d){
      node
          .attr("cx", function(d){ return d.x; })
          .attr("cy", function(d){ return d.y; })
    });
      
    }
  }
  
  export { Bubble };