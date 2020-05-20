// source: stacked chart: https://www.d3-graph-gallery.com/graph/barplot_stacked_basicWide.html
// legend: 
//pie chart with legend

class Pie{
    constructor(state, setGlobalState) { 
        
        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 30, bottom: 40, left: 70},
        width = 660 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#pie")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        // List of subgroups = header of the csv files = soil condition here
        var data = state.causes;
        var subgroups = data.columns.slice(1)
        const tooltip = d3.select("body").append("div").attr("class", "toolTip");
        

        // List of groups = species here = value of the first column called group -> I show them on the X axis
        var groups = d3.map(data, function(d){return(d.Year)}).keys()

        // Add X axis
        var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
        svg.append("g")
        .attr("class", "axis-x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .append("text")
         .attr("class", "axis-label")
         .attr("x", "40%")
         .attr("dy", "2em")
         .text("Year");

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, 230])
        .range([ height, 0 ]);
        svg.append("g")
        .attr("class", "axis-y-axis")
        .call(d3.axisLeft(y))
        .append("text")
         .attr("class", "axis-label")
         .attr("y", "12%")
         .attr("dx", "2em")
         .attr("writing-mode", "vertical-rl")
         .text("No. of Incident Error");

        // color palette = one color per subgroup
        var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(d3.schemeRdBu['7'].reverse())

        //stack the data? --> stack per subgroup
        var stackedData = d3.stack()
        .keys(subgroups)
        (data)
        console.log("stackedData", stackedData);

        // Show the bars
        svg.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function(d) { return color(d.key); })
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d) { return x(d.data.Year); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())
        // .on("mousemove", function(d){
        //     tooltip
        //     .style("left", d3.event.pageX - 50 + "px")
        //     .style("top", d3.event.pageY - 70 + "px")
        //     .style("display", "inline-block")
        //     .html((d.key) + " "+ "accidents in " + (d.Year)+ " from 1950 to 2008");
        //      })
        //     .on("mouseout", function(d){ tooltip.style("display", "none");});
        
        //work in progress tooltip

        var legend = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 19)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(subgroups.slice().reverse())
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", color);

        legend.append("text")
        .attr("font-size", 16)
        .attr("fill","rgb(226, 155, 108)")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });
        
    }

    draw(state, setGlobalState){}



}
    
    export {Pie}




    








    





