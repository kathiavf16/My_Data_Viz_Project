class Linechart{
    
    constructor(state, setGlobalState) {  
    const width = window.innerWidth * 0.5;
    const height = window.innerHeight * 0.3;
    const margin = { top: 20, bottom: 50, left: 60, right: 40 };
    let filteredData = this.filteredData = state.airplaneData;
    let parser = this.parser = d3.timeParse("%m/%d/%Y");

      /* INITIALIZING FUNCTION */
      // this will be run *one time* when the data finishes loading in
        // + SCALES
          let xScale = this.xScale = d3
          .scaleLinear()
          .domain(d3.extent(filteredData, d => parser(d.Date)))
          .range([margin.left, width - margin.right]);
      
          let yScale = this.yScale = d3
          .scaleLinear()
          .domain(d3.extent(filteredData, d => d.Fatalities))
          .range([height - margin.bottom, margin.top]);
      
        // + AXES
        const xAxis = d3.axisBottom(xScale)
                      .tickFormat(d3.timeFormat("%Y"));
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
            
        const bisectDate = d3.bisector(function(d) { return d.year; }).left;

        const width = window.innerWidth * 0.5;
        const height = window.innerHeight * 0.3;
        const margin = { top: 20, bottom: 50, left: 60, right: 40 };
         
        const line = d3.line()
            .x(d => this.xScale(this.parser(d.Date)))
            .y(d => this.yScale(d.Fatalities))
            .curve(d3.curveMonotoneX);

              this.svg.append("path")
             .data([this.filteredData])
             .attr("fill", "none")
             .attr("stroke", "steelblue")
             .attr("stroke-width", 1.5)
             .attr("stroke-linejoin", "round")
             .attr("stroke-linecap", "round")
             .attr("d", line);
             
             var focus = this.svg.append("svg")
             .attr("class", "focus")
             .style("display", "none");
     
              focus.append("line")
             .attr("class", "x-hover-line hover-line")
             .attr("y1", 0)
             .attr("y2", height);
     
              focus.append("line")
             .attr("class", "y-hover-line hover-line")
             .attr("x1", width)
             .attr("x2", width);
     
              focus.append("circle")
             .attr("r", 7.5);
     
              focus.append("text")
             .attr("x", 15)
             .attr("dy", ".31em");
     
              this.svg.append("rect")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
             .attr("class", "overlay")
             .attr("width", width)
             .attr("height", height)
             .on("mouseover", function() { focus.style("display", null); })
             .on("mouseout", function() { focus.style("display", "none"); })
             .on("mousemove", mousemove);
     
             function mousemove() {

              let myData = this.filteredData || [];
              let bisectDate = d3.bisector(function(d) { return parser(d.Date); }).left;
              let data = myData.sort(function(a,b){ return this.parser(a.Date) - this.parser(b.Date)});

              let xScale = this.xScale = d3
              .scaleLinear()
              .domain(d3.extent(data, d => parser(d.Date)))
              .range([margin.left, width - margin.right]);
          
              let yScale = this.yScale = d3
              .scaleLinear()
              .domain(d3.extent(data, d => d.Fatalities))
              .range([height - margin.bottom, margin.top]); 

              let xPosition = xScale.invert(d3.mouse(this)[0]),
                  closestElement = bisectDate(data, xPosition, 1), 
                  d0 = data[closestElement - 1],
                  d1 = data[closestElement],
                  d = xPosition - this.parser(d0.Date) > this.parser(d1.Date) - xPosition ? d1 : d0;
    
              focus.attr("transform", "translate(" + xScale(parser(d.Date)) + "," + yScale(d.Fatalities) + ")");
              focus.select("text").text("Amount: " + d.Fatalities + " Date: " + parser(d.Date));

          };
                
    }
     
}
export {Linechart};

/* function mousemove() {
  var x0 = xScale.invert(d3.mouse(this)[0]),
     i = bisectDate(filteredData, x0, 1),
     d0 = filteredData[i - 1],
     d1 = state.airplaneData[i],
     d = x0 - d0.year > d1.year - x0 ? d1 : d0;
    focus.attr("transform", "translate(" + xScale(d.Year) + "," + yScale(d.Fatalities) + ")");
    focus.select("text").text(function() { return d.Fatalities; });
    focus.select(".x-hover-line").attr("y2", height - yScale(d.Fatalities));
    focus.select(".y-hover-line").attr("x2", width + width); */

  /*   var xScale = d3.scaleTime()
    .domain([d3.min(this.filteredData, function(d) { return this.parser(d.Date); }), d3.max(this.filteredData, function(d) { this.parser(d.Date); })])
    .range([margin.left, width - margin.right]);

    var yScale = d3.scale.linear()
    .domain(d3.extent(this.filteredData, d => d.Fatalities))
    .range([height - margin.bottom, margin.top])
    .nice(); */