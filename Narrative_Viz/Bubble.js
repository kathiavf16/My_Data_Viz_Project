class Bubble {

    constructor(state, setGlobalState) {
      
      this.width = 700;
      this.height = 700;

      this.svg = d3.select("#bubble")
      .append("svg")
      .attr("height", this.height)
      .attr("width", this.width)

      this.defs = this.svg.append("defs");

      this.defs.append("pattern")
      .attr('id', 'logo')
      .attr('patternContentUnits', 'objectBoundingBox')
      .attr('width', '100%')
      .attr('height', '100%')
      .append('image')
      .attr('xlink:href', "images/ED.PNG")
      .attr("preserveAspectRadio", "none")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr('width', 1)
      .attr('height', 1)
      
    }
  
    draw(state, setGlobalState) {

      var size = d3.scaleLinear().domain(d3.extent(state.topAirlines, d => d.fatalities)).range([10,180]);
      console.log("size", size.domain())

      this.defs.selectAll(".logo-pattern")
      .data(state.topAirlines)
      .enter().append("pattern")
      .attr("class", "logo-pattern")
      .attr('id', function(d){return d.id})
      .attr('patternContentUnits', 'objectBoundingBox')
      .attr('width', '100%')
      .attr('height', '100%')
      .append('image')
      .attr('xlink:href', function(d) {return d.path})
      .attr("preserveAspectRadio", "none")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr('width', 1)
      .attr('height', 1)

      var node = this.svg.append("g")
      .attr("transform", "translate(0,0)")
      .selectAll("circle")
      .data(state.topAirlines)
      .enter()
      .append("circle")
      .attr("r", function(d){ return size(d.fatalities)})
      .attr("cx", this.width / 2)
      .attr("cy", this.height / 2)
      .style("fill", function(d) { return "url(#" + d.id + ")"})
      //.style("fill-opacity", 0.3)
      .attr("stroke", "#69a2b2")
      .style("stroke-width", 4)

      var simulation = d3.forceSimulation()
     .force("center", d3.forceCenter().x(this.width / 2).y(this.height / 2)) // Attraction to the center of the svg area
     .force("charge", d3.forceManyBody().strength(0.05)) // Nodes are attracted one each other of value is > 0
     .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return size(d.fatalities)}).iterations(3)); // Force that avoids circle overlapping

     simulation
     .nodes(state.topAirlines)
     .on("tick", function(d){
      node
          .attr("cx", function(d){ return d.x; })
          .attr("cy", function(d){ return d.y; })
    });
      
    }
  }
  
  export { Bubble };