// Exploratory Project - Author: Kathia Vargas Feliz
// Airplane Crashes and Fatalities


/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

/** these variables allow us to access anything we manipulate in
 * init() but need access to in draw().
 * All these variables are empty before we assign something to them.*/
let svg;

/**
 * APPLICATION STATE
 * */
let state = {
  geojson: null,
  extremes: null,
  hover: {
    latitude: null,
    longitude: null,
    state: null,
  },
};

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
Promise.all([
  d3.json("50m.json"),
  d3.csv("Airplane_Fatalities.csv", d3.autoType),
]).then(([geojson, extremes]) => {
  state.geojson = geojson;
  state.extremes = extremes;
  state.usPetrodata = usPetrodata;
   console.log("state: ", state);
  init();
});


/**
 * INITIALIZING FUNCTION
 * this will be run *one time* when the data finishes loading in
 * */
function init() {
  const projection = d3.geoAlbersUsa().fitSize([width, height], state.geojson);
  const path = d3.geoPath().projection(projection);
  const petrodata = state.usPetrodata;

  // create an svg element in our main `d3-container` element
  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // + SET UP PROJECTION
  // + SET UP GEOPATH
  svg
  .selectAll(".state")
  // all of the features of the geojson, meaning all the states as individuals
  .data(state.geojson.features)
  .join("path")
  .attr("d", path)
  .attr("class", "state")
  .attr("fill", "transparent")
  .on("mouseover", d => {
    // when the mouse rolls over this feature, do this
    state.hover["state"] = d.properties.NAME;
    draw(); // re-call the draw function when we set a new hoveredState
  });

  // + DRAW BASE MAP PATH
  //tooltip
  const tooltip = d3.select("body").append("div").attr("class", "toolTip");
  svg
    .selectAll("circle")
    .data(extremes)
    .join("circle")
    .attr("r", 10)
    .attr("class", d=> (d.COLOR === "OFF"  ? "off" : "on"))
    .attr("fill", "brown")
    .attr("transform", d => {
      const [x, y] = projection([d.long, d.lat]);
      return `translate(${x}, ${y})`;
    })
    .on("mousemove", function(d){
      tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 70 + "px")
        .style("display", "inline-block")
        .html((d.NAME) + "<br>" + (d.OTHERINFO));
  })
  .on("mouseout", function(d){ tooltip.style("display", "none");});
    


  // + ADD EVENT LISTENERS (if you want)

  svg.on("mousemove", () => {
    // we can use d3.mouse() to tell us the exact x and y positions of our cursor
    const [mx, my] = d3.mouse(svg.node());
    // projection can be inverted to return [lat, long] from [x, y] in pixels
    const proj = projection.invert([mx, my]);
    state.hover["longitude"] = proj[0];
    state.hover["latitude"] = proj[1];
    draw();
  });

  draw(); // calls the draw function
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */
function draw() {}

function draw() {
  // return an array of [key, value] pairs
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













































































// const width = window.innerWidth * 0.9,
//   height = window.innerHeight * 0.7,
//   margin = { top: 20, bottom: 50, left: 60, right: 40 };

// let svg;
// let tooltip;

// d3.json("50m.json").then(data => {
//     const countries = feature(data, data.objects.countries);
//     console.log("countries: ", countries);
// })

// function init(){

//     const projection = d3.geoMercator();
//     const path = d3.geoPath().projection(projection);
//     const AirplaneData = country.AirplaneData;  

//     //console.log("path: ", path);
    
//     svg = d3
//     .select("#d3-container")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height);

//     svg
//     .selectAll(".country")
//     .data(country.geojson.features)
//     .attr("d", path)
//     .attr("class", country);

//     draw();
// } 

// function draw() {}