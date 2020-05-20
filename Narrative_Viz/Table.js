

class Table {

  constructor(state, setGlobalState) {

    const slimmedData = state.causesTable.map(d => ({
      "Pilot Error": d.PilotError,
      "Mecanical": d.Mecanical,
      "Weather": d.Weather,
      "Sabotage": d.Sabotage,
      "Other": d.Other
    }))

    
    const logScale = d3
    .scaleSymlog() 
    .domain(d3.extent(slimmedData))
    .range(["rgb(14, 78, 197)","rgb(86, 132, 219)","rgb(175, 191, 219)","rgb(245, 245, 245)","rgb(240, 203, 203)"]); 

  
    this.colorScale = d3.scaleSequential(d => d3.interpolateOrRd(logScale(d)));

    
    this.colorScale = d3.scaleOrdinal(d => d3.schemeRdBu['7']);

    const columns = ["Pilot Error", "Mecanical", "Weather", "Sabotage", "Other"];
    const table = d3.select("#table").append("table");
    const format = d3.format(",." + d3.precisionFixed(1) + "f");

    table
      .append("thead")
      .append("tr")
      .selectAll("th")
      .attr("class", "tableW")
      .data(columns)
      .join("th")
      .text(d => d);

    this.tableRows = table
      .append("tbody")
      .selectAll("tr")
      .data(slimmedData)
      .join("tr")
      .style("fill", d => this.colorScale())
      .style("color", "rgb(65, 36, 17)")
      .style("background-color", "lightyellow")
      .style("font-weight", "bold")

    this.tableRows
      .selectAll("td")
      .data(d => Object.values(d))
      .join("td")
      .text(d => typeof(d) === "string" ? d : format(d));
  }

  draw(state, setGlobalState) {
    console.log("now I am drawing my table");
   
  }
}

export { Table };
