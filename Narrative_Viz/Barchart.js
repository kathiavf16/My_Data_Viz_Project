class Barchart{

    constructor(state, setGlobalState){
 
   /** CONSTANTS */
    
    // constants help us reference the same values throughout our code
     const width = 1500,
           height = 1100,
           paddingInner = 0,
           margin = { top: -15, bottom: 35, left: 160, right: 100  };
    
    /** SCALES */
    // reference for d3.scales: https://github.com/d3/d3-scale

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(state.barchart, d => d.occurrences))
      .range([margin.left, width - margin.right])
      //.rangeBands([0,100]);
       console.log(xScale.domain());
       console.log(xScale.range());

    const yScale = d3
      .scaleBand()
      .domain(state.barchart.map(d => d.location))
      .range([margin.left, height]) 
      .paddingInner(paddingInner);
  
    // reference for d3.axis: https://github.com/d3/d3-axis
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const tooltip = d3.select("body").append("div").attr("class", "toolTip");
  
    /** MAIN CODE */
    const svg = d3
      .select("#bar")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // append rects
    const rect = svg
      .selectAll("rect")
      .data(state.barchart)
      .join("rect")
      .attr("y", d => yScale(d.location)-20)
      .attr("x", d => xScale(20))
      .attr("width", d => xScale(d.occurrences))
      .attr("height", yScale.bandwidth())
      .attr("fill", "orange")
      .attr("stroke", "black")
      .attr("stroke-width", 4)
      .on("mousemove", function(d){
        tooltip
          .style("left", d3.event.pageX - 50 + "px")
          .style("top", d3.event.pageY - 70 + "px")
          .style("display", "inline-block")
          .html("Crashes in "+ (d.location) + "<br>" + (d.occurrences) + " " + "Ocurrences");
    })
    .on("mouseout", function(d){ tooltip.style("display", "none");});
  
    // append text
    const text = svg
      .selectAll("text")
      .data(state.barchart)
      .join("text")
      .attr("class", "label-bar")
      //this allows us to position the text in the center of the bar
      .attr("x", d => xScale(d.occurrences))
      .text(d => d.occurrences)
      .attr("y", d => yScale(d.location) + yScale.bandwidth() / 2 - margin.bottom - margin.top)
      .text(d => d.occurrences)
      .attr("text-anchor", "middle")
      .attr("dy", "0.4em");
  
     svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0, ${height - margin.bottom - margin.top})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(0)")
      .style("text-anchor", "start");

      svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate( ${margin.left}, ${margin.top})`)
      .call(yAxis);
    }
       

        draw(state) {}
        //draw
        
    
}

export {Barchart}
