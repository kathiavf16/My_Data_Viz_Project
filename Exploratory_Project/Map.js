class Map{

    constructor(state, setGlobalState) {  
        
        const width = window.innerWidth * 0.4;
        const height = window.innerHeight * 0.7;

        this.projection = d3.geoMercator().center([0,60]).scale(200).rotate([-15,0]);
        const path = d3.geoPath().projection(this.projection);
        const paises = topojson.feature(state.geojson, state.geojson.objects.countries).features;
        
        
         const mysvg = this.svg = d3.select("#map").append("svg")
        .attr("width", width - 200)
        .attr("height", height - 200)
        .attr("class", "mapW")
        .call(d3.zoom().on("zoom", function () {
          mysvg.attr("transform", d3.event.transform)
        }))
        .append("g");

        mysvg 
        .selectAll(".state")
        .data(paises)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "state")
        .attr("fill", "transparent");         
  }    
   
  draw(state, setGlobalState) {
    
    let filteredData = [];
    if (state.selectedOperator !== null) {
    filteredData = state.airplaneData.filter(d=> d.Operator === state.selectedOperator);
  }
   
    const tooltip = d3.select("body").append("div").attr("class", "toolTip");
    const summary = state.summary;
    console.log("now I am drawing my barchart", "FilterData", filteredData)   
         
         const circle = this.svg
        .selectAll("circle")
        .data(filteredData)
        .join(
          enter =>
            enter
              .append("circle")
              .attr("r", 6)
              .attr("fill", "blue")
              .attr("stroke", "white")
              .attr("transform", d => {
                const [x, y] = this.projection([+d.Longitude, +d.Latitude]);
                return `translate(${x}, ${y})`;
              }),
            update => 
              update
              .attr("transform", d => {
                const [x, y] = this.projection([+d.Longitude, +d.Latitude]);
                return `translate(${x}, ${y})`;
              }), 
            exit => exit.remove()
       ).on("click", function(d){
        tooltip
          .style("left", d3.event.pageX - 50 + "px")
          .style("top", d3.event.pageY - 70 + "px")
          .style("display", "inline-block")
          .html((d.Location));
        summary
          .attr("class", "summary")
          .style("display", "inline-block")
          .html("Crash Details " + "<br><br>" + "Date of Incident: "+ d.Date + "<br>" + "Airplane Type: " + d.Type  + "<br>"+ "Flight No: "+ d.Flight + "<br>" + " " + 
                "Operator: "+ d.Operator + "<br>" + "Route: "+ d.Route + "<br>" + "Deaths: " + d.Fatalities + "<br>" + "Aboard: " + d.Aboard + "<br><br>" + "Summary: "+ d.Summary );
          })
    .on("mouseout", function(d){ tooltip.style("display", "none");})
        
     }           
}

export {Map};