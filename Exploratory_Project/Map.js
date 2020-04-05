class Map{

    constructor(state, setGlobalState) {  
        
        let svg;
        const width = window.innerWidth * 0.4,
        height = window.innerHeight * 0.7;
        //margin = { top: 20, bottom: 50, left: 60, right: 40 };

        const projection = d3.geoMercator().center([0,60]).scale(200).rotate([-15,0]);
        const path = d3.geoPath().projection(projection);
        const paises = topojson.feature(state.geojson, state.geojson.objects.countries).features;
        const airplaneData = state.airplaneData;
        
        svg = d3
        .select("#map")
        .append("svg")
        .attr("width", width-300)
        .attr("height", height-200)
        .style("background-color", "white")
        .attr("class", "mapW")
        .call(d3.zoom().on("zoom", function () {
          svg.attr("transform", d3.event.transform)
        }))
        .append("g");

        svg
        .selectAll(".state")
        .data(paises)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "state")
        .attr("fill", "transparent");
    
        //tooltip
        const tooltip = d3.select("body").append("div").attr("class", "toolTip");
    
        svg
        .selectAll("circle")
        .data(airplaneData)
        .join("circle")
        .attr("r", 4)
        .attr("class", d=> (d.COLOR === "OFF"  ? "off" : "on"))
        .attr("fill", "brown")
        .attr("transform", d => {
          const [x, y] = projection([d.Longitude, d.Latitude]);
          return `translate(${x}, ${y})`;
        })
        .on("click", function(d){
          tooltip
            .style("left", d3.event.pageX - 50 + "px")
            .style("top", d3.event.pageY - 70 + "px")
            .style("display", "inline-block")
            .html((d.Location) + "<br>" + (d.Summary));
      })
      .on("mouseout", function(d){ tooltip.style("display", "none");});
        
    
       //draw();
      }
    
    /* draw(state) {
    
      hoverData = Object.entries(state.hover);
    
      d3.select("#hover-content")
        .selectAll("div.row")
        .data(hoverData)
        .join("div")
        .attr("class", "row")
        .html(
          d =>
            // each d is [key, value] pair
            d[1] // check if value exist
              ? `${d[0]}: ${d[1]}` // if they do, fill them in
              : null // otherwise, show nothing
        );
    } */
}

export {Map};