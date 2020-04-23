class Linechart{
    
    constructor(state, setGlobalState) {  
       // global variables

        this.width = window.innerWidth * 0.5;
        this.height = window.innerHeight * 0.3;
        this.margin = { top: 20, bottom: 50, left: 60, right: 40 };
        //let filteredData = [];
        this.parser = d3.timeParse("%m/%d/%Y");
       
        this.svg = d3.select("#linechart").append("svg")
        .attr("width", this.width)
        .attr("height", this.height);  

        // scales

         this.xScale = d3
        .scaleLinear()
        .domain(d3.extent(state.filteredData, d => this.parser(d.Date)))
        .range([this.margin.left, this.width - this.margin.right]);

        this.yScale = d3
        .scaleLinear()
        .domain(d3.extent(state.filteredData, d => d.Fatalities))
        .range([this.height - this.margin.bottom, this.margin.top]);
          
        // + x and y axes

        this.xAxis = d3.axisBottom(this.xScale)
                .tickFormat(d3.timeFormat("%Y"));
        this.yAxis = d3.axisLeft(this.yScale);

         //gridline

         this.gridline = d3.axisBottom()
         .tickFormat("")
         .tickSize(this.height-40)
         .scale(this.xScale); 

         // svg x axis
         this.svg
         .append("g")
         .attr("class", "axis-x-axis")
         .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
         .call(this.xAxis)
         .append("text")
         .attr("class", "axis-label")
         .attr("x", "50%")
         .attr("dy", "3em")
         .text("Year");

         // svg y axis
         this.svg
         .append("g")
         .attr("class", "axis-y-axis")
         .attr("transform", `translate(${this.margin.left},0)`)
         .call(this.yAxis)
         .append("text")
         .attr("class", "axis-label")
         .attr("y", "50%")
         .attr("dx", "-3em")
         .attr("writing-mode", "vertical-rl")
         .text("No. of Fatalities");

          // svg gridlines
         this.svg
         .append("g")
         .attr("class", "grid")
         .call(this.gridline);
          // line variable
          
         // draw() function       
    }
     draw(state){      

          //const linechart = this.svg;
          console.log("In draw:");

           let parser = d3.timeParse("%m/%d/%Y");
           const tooltip = d3.select("body").append("div").attr("class", "focus");
            // scales
    
             let xScale = d3
            .scaleLinear()
            .domain(d3.extent(state.filteredData, d => parser(d.Date)))
            .range([this.margin.left, this.width - this.margin.right]);
    
             let yScale = d3
            .scaleLinear()
            .domain(d3.extent(state.filteredData, d => d.Fatalities))
            .range([this.height - this.margin.bottom, this.margin.top]);
            console.log("scale: ", yScale.domain(), yScale.range(), xScale.domain());

            const line = d3.line()
            .x(d => xScale(parser(d.Date)))
            .y(d => yScale(d.Fatalities))
            .curve(d3.curveMonotoneX);
              
              // variable focus for tooltips
              var focus = this.svg.append("g")
             .attr("class", "focus")
             .style("display", "none");
     
              focus.append("circle")
             .attr("r", 7.5);
     
              focus.append("text")
             .attr("x", 15)
             .attr("dy", ".31em")
             .style("fill", "white")
             
              // svg path
              this.svg.selectAll("path.path-line")
              .data([state.filteredData])
              .join(
                    enter =>
                    enter
               .append("path"),     
                  update =>
                    update, 
              exit => exit.remove()
              ).attr("fill", "none")
              .attr("class", "path-line")
              .attr("stroke", "RED")
              .attr("stroke-width", 3)
              .attr("stroke-linejoin", "round")
              .attr("stroke-linecap", "round")
              .attr("d", line)
              .select(".axis-x-axi").call(this.xAxis)
              .select(".axis-y-axi").call(this.yAxis);

              this.yScale.domain(d3.extent(state.filteredData, d => d.Fatalities));
              this.xScale.domain(d3.extent(state.filteredData, d => this.parser(d.Date))); 
              tooltip.style("display", "none");

              
              d3.select("g.axis-y-axis")
                .transition()
                .duration(1000)
                .call(this.yAxis.scale(this.yScale)); 

              d3.select("g.axis-x-axis")
                .transition()
                .duration(1000)
                .call(this.xAxis.scale(this.xScale));

                  
              // rect for tooltip
             var rect = this.svg.append("rect")
             .attr("class", "overlay")
             .attr("width", this.width - this.margin.right)
             .attr("height", this.height - this.margin.bottom)
             .on("mouseover", function() { focus.style("display", null); })
             .on("mouseout", function() { focus.style("display", "none"), tooltip.style("display", "none");})
             .on("mousemove", mousemove);
              // mouse over for tooltip
             function mousemove() {

              state.filteredData = state.airplaneData.filter(d=> d.Operator === state.selectedOperator);
              let bisectDate = d3.bisector(function(d) { return parser(d.Date); }).left;
              let data = [...state.filteredData].sort(function(a,b){ return parser(a.Date) - parser(b.Date)});
              
              console.log("mydata: ", data);

              let xPosition = xScale.invert(d3.mouse(this)[0]),
                  closestElement = bisectDate(data, xPosition, 1), 
                  d0 = data[closestElement - 1],
                  d1 = data[closestElement],
                  d = xPosition - parser(d0.Date) > parser(d1.Date) - xPosition ? d1 : d0;
                  console.log("mydata: ", closestElement, xPosition, d);
    
              focus.attr("transform", "translate(" + xScale(parser(d.Date)) + "," + yScale(d.Fatalities) + ")");
              //focus.select("text").html("Deaths: " + d.Fatalities + "<br>" + " Date: " + d.Date);
              tooltip.style("left", d3.event.pageX - 50 + "px").style("top", d3.event.pageY - 70 + "px").style("display", "inline-block").html((d.Location + "<br>" + 
                            "Deaths: " + d.Fatalities + "<br>" + " Date: " + d.Date));
              tooltip.attr("transform", "translate(" + xScale(parser(d.Date)) + "," + yScale(d.Fatalities) + ")");
      };         
    }
  }
export {Linechart};
