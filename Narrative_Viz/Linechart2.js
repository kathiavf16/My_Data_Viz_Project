// Trendiline Source code: http://bl.ocks.org/benvandyke/8459843 Plotting a trendline with D3.js

class Linechart2{
    
    constructor(state, setGlobalState) {  
       // global variables
       

        this.width = 600;
        this.height = 400;
        this.margin = { top: 20, bottom: 50, left: 60, right: 40 };
        //let filteredData = [];
        this.parser = d3.timeParse("%Y");
        let xLabels = d3.extent(state.commercial, d => this.parser(d.year));
       
        this.svg = d3.select("#linechart2").append("svg")
        .attr("width", this.width)
        .attr("height", this.height);  

        // scales

         let xScale = d3
        .scaleLinear()
        .domain(d3.extent(state.commercial, d => this.parser(d.year)))
        .range([this.margin.left, this.width - this.margin.right]);
        console.log("x",xScale.domain())

        let yScale = d3
        .scaleLinear()
        .domain(d3.extent(state.commercial, d => d.fatalities))
        .range([this.height - this.margin.bottom, this.margin.top]);
          
        // + x and y axes

        let xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.timeFormat("%Y"));
        let yAxis = d3.axisLeft(yScale);

         //gridline

         this.gridline = d3.axisBottom()
         .tickFormat("")
         .tickSize(this.height-40)
         .scale(xScale); 

         // svg x axis
         this.svg
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
         this.svg
         .append("g")
         .attr("class", "axis-y-axis")
         .attr("transform", `translate(${this.margin.left},0)`)
         .call(yAxis)
         .append("text")
         .attr("class", "axis-label")
         .attr("y", "20%")
         .attr("dx", "2em")
         .attr("writing-mode", "vertical-rl")
         .text("No. of Fatalities");

          // svg gridlines
         this.svg
         .append("g")
         .attr("class", "grid")
         .call(this.gridline);

            // get the x and y values for least squares
		var xSeries = d3.range(1, xLabels.length + 1);
		var ySeries = state.commercial.map(function(d) { return d['fatalities'] });
		
		let leastSquaresCoeff = leastSquares(xSeries, ySeries);
		
		// apply the reults of the least squares regression
		var x1 = xLabels[0];
		var y1 = leastSquaresCoeff[0] + leastSquaresCoeff[1];
		var x2 = xLabels[xLabels.length - 1];
		var y2 = leastSquaresCoeff[0] * xSeries.length + leastSquaresCoeff[1];
		var trendData = [[x1,y1,x2,y2]];
		
		var trendline = this.svg.selectAll(".trendline")
			.data(trendData);
			
		trendline.enter()
			.append("line")
			.attr("class", "trendline")
			.attr("x1", function(d) { return xScale(d[0]); })
			.attr("y1", function(d) { return yScale(d[1]); })
			.attr("x2", function(d) { return xScale(d[2]); })
			.attr("y2", function(d) { return yScale(d[3]); })
			.attr("stroke", "red")
      .attr("stroke-width", 1);
      

      function leastSquares(xSeries, ySeries) {
        var reduceSumFunc = function(prev, cur) { return prev + cur; };
        
        var xBar = xSeries.reduce(reduceSumFunc) * 1.0 / xSeries.length;
        var yBar = ySeries.reduce(reduceSumFunc) * 1.0 / ySeries.length;
    
        var ssXX = xSeries.map(function(d) { return Math.pow(d - xBar, 2); })
          .reduce(reduceSumFunc);
        
        var ssYY = ySeries.map(function(d) { return Math.pow(d - yBar, 2); })
          .reduce(reduceSumFunc);
          
        var ssXY = xSeries.map(function(d, i) { return (d - xBar) * (ySeries[i] - yBar); })
          .reduce(reduceSumFunc);
          
        var slope = ssXY / ssXX;
        var intercept = yBar - (xBar * slope);
        var rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);
        
        return [slope, intercept, rSquare];
      }
      
          
         // draw() function       
    }
     draw(state){      

          //const linechart = this.svg;
          console.log("In draw:");

           let parser = d3.timeParse("%Y");
           const tooltip = d3.select("body").append("div").attr("class", "focus");
            // scales
    
             let xScale = d3
            .scaleLinear()
            .domain(d3.extent(state.commercial, d => parser(d.year)))
            .range([this.margin.left, this.width - this.margin.right]);
    
             let yScale = d3
            .scaleLinear()
            .domain(d3.extent(state.commercial, d => d.fatalities))
            .range([this.height - this.margin.bottom, this.margin.top]);
            console.log("scale: ", yScale.domain(), yScale.range(), xScale.domain());

            const line = d3.line()
            .x(d => xScale(parser(d.year)))
            .y(d => yScale(d.fatalities))
            .curve(d3.curveLinear);
              
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
              .data([state.commercial])
              .join(
                    enter =>
                    enter
               .append("path"),     
                  update =>
                    update, 
              exit => exit.remove()
              ).attr("fill", "none")
              .attr("class", "path-line")
              .attr("stroke", "white")
              .attr("stroke-width", 3)
              .attr("stroke-linejoin", "butt")
              .attr("stroke-linecap", "butt")
              .attr("d", line)
      
              tooltip.style("display", "none");

                  
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

              state.filteredData = state.commercial;
              let bisectDate = d3.bisector(function(d) { return parser(d.year); }).left;
              let data = [...state.filteredData].sort(function(a,b){ return parser(a.year) - parser(b.year)});
              
              console.log("mydata: ", data);

              let xPosition = xScale.invert(d3.mouse(this)[0]),
                  closestElement = bisectDate(data, xPosition, 1), 
                  d0 = data[closestElement - 1],
                  d1 = data[closestElement],
                  d = xPosition - parser(d0.year) > parser(d1.year) - xPosition ? d1 : d0;
                  console.log("mydata: ", closestElement, xPosition, d);
    
              focus.attr("transform", "translate(" + xScale(parser(d.year)) + "," + yScale(d.fatalities) + ")");
              //focus.select("text").html("Deaths: " + d.Fatalities + "<br>" + " Date: " + d.Date);
              tooltip.style("left", d3.event.pageX - 50 + "px").style("top", d3.event.pageY - 70 + "px").style("display", "inline-block").html((d.Location + "<br>" + 
                            "Deaths: " + d.fatalities + "<br>" + " Date: " + d.year));
              tooltip.attr("transform", "translate(" + xScale(d.year) + "," + yScale(d.fatalities) + ")");
      };         
    }
  }
export {Linechart2};
