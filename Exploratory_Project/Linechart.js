class Linechart{
    
    constructor(state, setGlobalState) {  
       // global variables

        const width = this.width = window.innerWidth * 0.5;
        const height = this.height = window.innerHeight * 0.3;
        const margin = this.margin = { top: 20, bottom: 50, left: 60, right: 40 };
        let filteredData = [];
        let parser = this.parser = d3.timeParse("%m/%d/%Y");
        if (state.selectedOperator !== null) {
        filteredData = this.filteredData = state.airplaneData.filter(d=> d.Operator === state.selectedOperator);

    }   
        let svg =  this.svg = d3.select("#linechart").append("svg")
        .attr("width", width)
        .attr("height", height);  

        // scales

        let xScale = this.xScale = d3
        .scaleLinear()
        .domain(d3.extent(filteredData, d => parser(d.Date)))
        .range([margin.left, width - margin.right]);

        let yScale = this.yScale = d3
        .scaleLinear()
        .domain(d3.extent(filteredData, d => d.Fatalities))
        .range([height - margin.bottom, margin.top]);
          
        // + x and y axes

        const xAxis = this.xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.timeFormat("%Y"));
        const yAxis = this.yAxis = d3.axisLeft(yScale);

         //gridline

        let gridline = this.gridline = d3.axisBottom()
         .tickFormat("")
         .tickSize(height-40)
         .scale(xScale); 
         // svg x axis
         svg
         .append("g")
         .attr("class", "axis-x-axis")
         .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
         .call(xAxis)
         .append("text")
         .attr("class", "axis-label")
         .attr("x", "50%")
         .attr("dy", "3em")
         .text("Year");

         // svg y axis
         svg
         .append("g")
         .attr("class", "axis-y-axis")
         .attr("transform", `translate(${this.margin.left},0)`)
         .call(yAxis)
         .append("text")
         .attr("class", "axis-label")
         .attr("y", "50%")
         .attr("dx", "-3em")
         .attr("writing-mode", "vertical-rl")
         .text("No. of Fatalities");

          // svg gridlines
         svg
         .append("g")
         .attr("class", "grid")
         .call(gridline);
          // line variable
         const line = d3.line()
         .x(d => this.xScale(this.parser(d.Date)))
         .y(d => this.yScale(d.Fatalities))
         .curve(d3.curveMonotoneX);
          // sbg path
         svg.append("path")
         .data([this.filteredData])
         .join(
               enter =>
                enter
             .attr("d", line), 
              update =>
                update
         .attr("fill", "none")
         .attr("stroke", "steelblue")
         .attr("stroke-width", 1.5)
         .attr("stroke-linejoin", "round")
         .attr("stroke-linecap", "round")
         .attr("d", line), 
         exit => exit.remove())
              
         // draw() function       
    }
     draw (state, setGlobalState){      
         
          let xScale = this.xScale;
          let yScale = this.yScale;
          let xAxis = this.xAxis;
          let yAxis = this.yAxis;
          let gridline = this.gridline;

          const linechart = this.svg;

           
              // variable focus for tooltips
              var focus = this.svg.append("g")
             .attr("class", "focus")
             .style("display", "none");
     
              focus.append("circle")
             .attr("r", 7.5);
     
              focus.append("text")
             .attr("x", 15)
             .attr("dy", ".31em")
             .style("fill", "yellow")
             
              // rect for tooltip
             var rect = this.svg.append("rect")
             .attr("class", "overlay")
             .attr("width", this.width - this.margin.right)
             .attr("height", this.height - this.margin.bottom)
             .on("mouseover", function() { focus.style("display", null); })
             .on("mouseout", function() { focus.style("display", "none"); })
             .on("mousemove", mousemove);
              // mouse over for tooltip
             function mousemove() {
               
              let mydata = this.filteredData = state.airplaneData.filter(d=> d.Operator === state.selectedOperator);
              let parser = this.parser = d3.timeParse("%m/%d/%Y");
              let bisectDate = d3.bisector(function(d) { return parser(d.Date); }).left;
              let data = mydata.sort(function(a,b){ return parser(a.Date) - parser(b.Date)});
              
              console.log("mydata: ", data);

              let xPosition = xScale.invert(d3.mouse(this)[0]),
                  closestElement = bisectDate(data, xPosition, 1), 
                  d0 = data[closestElement - 1],
                  d1 = data[closestElement],
                  d = xPosition - parser(d0.Date) > parser(d1.Date) - xPosition ? d1 : d0;
                  console.log("mydata: ", closestElement, xPosition, d);
    
              focus.attr("transform", "translate(" + xScale(parser(d.Date)) + "," + yScale(d.Fatalities) + ")");
              focus.select("text").html("Deaths: " + d.Fatalities + "<br>" + " Date: " + d.Date);
      };         
    }
  }
export {Linechart};
