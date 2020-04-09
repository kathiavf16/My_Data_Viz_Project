class Linechart{
    
    constructor(state, setGlobalState) {  
    const width = window.innerWidth * 0.5;
    const height = window.innerHeight * 0.3;
    const margin = { top: 20, bottom: 50, left: 60, right: 40 };
    
   
 
    
        
      /* INITIALIZING FUNCTION */
      // this will be run *one time* when the data finishes loading in
        // + SCALES
          let xScale = this.xScale = d3
          .scaleLinear()
          .domain(d3.extent(state.airplaneData, d => d.Year))
          .range([margin.left, width - margin.right]);
      
          let yScale = this.yScale = d3
          .scaleLinear()
          .domain(d3.extent(state.airplaneData, d => d.Fatalities))
          .range([height - margin.bottom, margin.top]);
      
        // + AXES
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
      
        //gridline
      
        let gridline = d3.axisBottom()
                         .tickFormat("")
                         .tickSize(height-40)
                         .scale(xScale);            ;
      
         
        // + CREATE SVG ELEMENT
      const mysvg =  this.svg = d3.select("#linechart").append("svg")
          .attr("width", width)
          .attr("height", height);
      
           mysvg
          .append("g")
          .attr("class", "grid")
          .call(gridline);
            
        // + CALL AXES
      
        // xAxis
           mysvg
          .append("g")
          .attr("class", "axis-x-axis")
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(xAxis)
          .append("text")
          .attr("class", "axis-label")
          .attr("x", "50%")
          .attr("dy", "3em")
          .text("Year");
      
        //  yAxis
           mysvg
          .append("g")
          .attr("class", "axis-y-axis")
          .attr("transform", `translate(${margin.left},0)`)
          .call(yAxis)
          .append("text")
          .attr("class", "axis-label")
          .attr("y", "50%")
          .attr("dx", "-3em")
          .attr("writing-mode", "vertical-rl")
          .text("% of Grads");
    
    }
     draw (state, setGlobalState){
            
        const filteredData = state.airplaneData;
        
        const margin = { top: 30, right: 120, bottom: 30, left: 50 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        tooltip = { width: 100, height: 100, x: 10, y: -30 };

        
        const bisectDate = d3.bisector(function(d) { return d.Date; }).left,
        formatValue = d3.format(",");
    

        
        const line = d3.line()
            .x(d => this.xScale(new Date( d.Year)))
            .y(d => this.yScale(d.Fatalities))
            .curve(d3.curveMonotoneX);

              this.svg.append("path")
             .data([filteredData])
             .attr("fill", "none")
             .attr("stroke", "steelblue")
             .attr("stroke-width", 1.5)
             .attr("stroke-linejoin", "round")
             .attr("stroke-linecap", "round")
             .attr("d", line);
             
             const focus = this.svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

            focus.append("circle")
            .attr("r", 5);

             focus.append("rect")
            .attr("class", "tooltip")
            .attr("width", 100)
            .attr("height", 50)
            .attr("x", 10)
            .attr("y", -22)
            .attr("rx", 4)
            .attr("ry", 4);

            focus.append("text")
            .attr("class", "tooltip-date")
            .attr("x", 18)
            .attr("y", -2);

            focus.append("text")
            .attr("x", 18)
            .attr("y", 18)
            .text("Likes:");

            focus.append("text")
            .attr("class", "tooltip-likes")
            .attr("x", 60)
            .attr("y", 18);

            this.svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);

            function mousemove() {
            const x0 = this.xScale;
            x0
            .invert(d3.mouse(this)[0]),
                i = bisectDate(state.airplaneData, x0, 1),
                d0 = state.airplaneData[i - 1],
                d1 = state.airplaneData[i],
                d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + x(d.Date) + "," + y(d.Fatalities) + ")");
            focus.select(".tooltip-date").text(dateFormatter(d.Date));
            focus.select(".tooltip-likes").text(formatValue(d.Fatalities));


         }
     }
}
export {Linechart};