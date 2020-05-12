// source: http://bl.ocks.org/wayneminton/a12b563819b04a3555aa
//pie chart with legend

class Pie{
    constructor(state, setGlobalState) { 

        let width = 960,
        height = 500,
        radius = Math.min(width, height) / 2;
    
    let color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    
    let arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
    
    let pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.population; });
    
    let svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    d3.csv("data.csv", function(error, data) {
    
      data.forEach(function(d) {
        d.population = +d.population;
      });
    
      let g = svg.selectAll(".arc")
          .data(pie(data))
          .enter().append("g")
          .attr("class", "arc");
    
      g.append("path")
          .attr("d", arc)
          .attr("data-legend", function(d) { return d.data.age; })
          .attr("data-legend-pos", function(d, i) { return i; })
          .style("fill", function(d) { return color(d.data.age); });
    
      g.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .style("text-anchor", "middle");
    
      let padding = 20,
        legx = radius + padding,
        legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + legx + ", 0)")
        .style("font-size", "12px")
        .call(d3.legend);

    }
// legend

// d3.legend.js 
// (C) 2012 ziggy.jonsson.nyc@gmail.com
// MIT licence

(function() {
    d3.legend = function(g) {
      g.each(function() {
        var g= d3.select(this),
            items = {},
            svg = d3.select(g.property("nearestViewportElement")),
            legendPadding = g.attr("data-style-padding") || 5,
            lb = g.selectAll(".legend-box").data([true]),
            li = g.selectAll(".legend-items").data([true])
    
        lb.enter().append("rect").classed("legend-box",true)
        li.enter().append("g").classed("legend-items",true)
    
        svg.selectAll("[data-legend]").each(function() {
            var self = d3.select(this)
            items[self.attr("data-legend")] = {
              pos : self.attr("data-legend-pos") || this.getBBox().y,
              color : self.attr("data-legend-color") != undefined ? self.attr("data-legend-color") : self.style("fill") != 'none' ? self.style("fill") : self.style("stroke") 
            }
          })
    
        items = d3.entries(items).sort(function(a,b) { return a.value.pos-b.value.pos})
    
        
        li.selectAll("text")
            .data(items,function(d) { return d.key})
            .call(function(d) { d.enter().append("text")})
            .call(function(d) { d.exit().remove()})
            .attr("y",function(d,i) { return i+"em"})
            .attr("x","1em")
            .text(function(d) { ;return d.key})
        
        li.selectAll("circle")
            .data(items,function(d) { return d.key})
            .call(function(d) { d.enter().append("circle")})
            .call(function(d) { d.exit().remove()})
            .attr("cy",function(d,i) { return i-0.25+"em"})
            .attr("cx",0)
            .attr("r","0.4em")
            .style("fill",function(d) { console.log(d.value.color);return d.value.color})  
        
        // Reposition and resize the box
        var lbbox = li[0][0].getBBox()  
        lb.attr("x",(lbbox.x-legendPadding))
            .attr("y",(lbbox.y-legendPadding))
            .attr("height",(lbbox.height+2*legendPadding))
            .attr("width",(lbbox.width+2*legendPadding))
      })
      return g
    
    }
 











    





