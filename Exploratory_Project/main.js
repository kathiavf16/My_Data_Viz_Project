// Exploratory Project - Author: Kathia Vargas Feliz
// Airplane Crashes and Fatalities

/**
 * CONSTANTS AND GLOBALS
 * */

const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

let svg;

let state = {

  geojson: null,
  airplaneData: null,
  hover: {
    latitude: null,
    longitude: null,
    state: null,
  },

};

Promise.all([
  d3.json("https://unpkg.com/world-atlas@1/world/110m.json"),
  d3.csv("../data/Airplane_Fatalities.csv", d3.autoType),
]).then(([geojson, airplaneData]) => {
  state.geojson = geojson;
  state.airplaneData = airplaneData;
   console.log("state: ", state);
  init();
});
  
function init(){

    const projection = d3.geoMercator();
    const path = d3.geoPath().projection(projection);
    const paises = topojson.feature(state.geojson, state.geojson.objects.countries).features;
    const airplaneData = state.airplaneData;
    svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
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
    .attr("r", 2)
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
    

    draw();
  }

function draw() {


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
}
