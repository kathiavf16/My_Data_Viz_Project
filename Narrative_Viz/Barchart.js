class Barchart{

    constructor(state, setGlobalState){
 
   /** CONSTANTS */
    
    
    /** SCALES */
    // reference for d3.scales: https://github.com/d3/d3-scale
    const margin = {top: 10, right: 20, bottom: 120, left: 220},
    width = 1500 - margin.left - margin.right,
    height =650 - margin.top - margin.bottom;

// set the ranges
      let data = state.barchart;
      let x = d3.scaleBand()
                .range([0, width])
                .padding(0.1);
      let y = d3.scaleLinear()
                .range([height, 0]);
              
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
      let svg = d3.select("#bar").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");

        // Scale the range of the data in the domains
        x.domain(data.map(function(d) { return d.location; }));
        y.domain([0, d3.max(data, function(d) { return d.occurrences; })]);
        const tooltip = d3.select("body").append("div").attr("class", "toolTip");

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "rect")
            .attr("x", function(d) { return x(d.location); })
            .attr("width", x.bandwidth()+2)
            .attr("y", function(d) { return y(d.occurrences); })
            .attr("height", function(d) { return height - y(d.occurrences); })
            .attr("fill", "rgb(112, 143, 230)")
            .on("mousemove", function(d){
            tooltip
            .style("left", d3.event.pageX - 50 + "px")
            .style("top", d3.event.pageY - 70 + "px")
            .style("display", "inline-block")
            .html((d.occurrences) + " "+ "accidents in " + (d.location)+ " from 1950 to 2008");
             })
            .on("mouseout", function(d){ tooltip.style("display", "none");});

            const text = svg
            .selectAll("text")
            .data(data)
            .join("text")
            .attr("class", "label")
            // this allows us to position the text in the center of the bar
            .attr("x", d => x(d.location) + (x.bandwidth() / 19))
            .attr("y", d => y(d.occurrences))
            .text(d => d.occurrences)
            .attr("dy", ".9em");

            svg.selectAll("image")
            .data(data)
            .enter()
            .append('image')
            .attr('xlink:href', function(d) {return d.path})
            .attr("width", x.bandwidth())
            .attr("height", "30px")
            .attr("x", d => x(d.location) + (x.bandwidth() / 19))
            .attr("y", d => y(d.occurrences)+12)
            .on("mousemove", function(d){
              tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.occurrences) + " "+ "accidents in " + (d.location)+ " from 1950 to 2008");
               })
              .on("mouseout", function(d){ tooltip.style("display", "none");});
  
            //.attr("preserveAspectRatio", "none");

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "axis-x-axis")
            .call(d3.axisBottom(x))
            .selectAll("text")	
            .attr("opacity", 0)
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)" 
                });

        // add the y Axis
        svg.append("g")
           .attr("class", "axis-y-axis")
           .call(d3.axisLeft(y));
    }
       
        draw(state) {}
        //draw
        
}

export {Barchart}
