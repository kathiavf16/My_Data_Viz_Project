// Exploratory Project - Author: Kathia Vargas Feliz
// Airplane Crashes and Fatalities


/**
 * CONSTANTS AND GLOBALS
 * */

const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

let state = {
  data:[],
  selectedData: "All",
};


d3.json("../data/50m.json", d3.autoType).then(data => {
  state.data = data;
  console.log("countries: ", data);
  init();
  
});
   
function init(){

    const projection = d3.geoMercator();
    const path = d3.geoPath().projection(projection);
    const AirplaneData = country.AirplaneData;  

    //console.log("path: ", path);
    
    svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    svg
    .selectAll(".country")
    .data(country.geojson.feature)
    .attr("d", path)
    .attr("class", country);

    draw();
} 

function draw() {}