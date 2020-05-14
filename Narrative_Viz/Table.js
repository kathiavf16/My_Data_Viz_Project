class Table {

  constructor(state, setGlobalState) {

    const slimmedData = state.causesTable.map(d => ({
      "Pilot Error": d.PilotError,
      "Mecanical": d.Mecanical,
      "Weather": d.Weather,
      "Sabotage": d.Sabotage,
      "Ohter": d.Other
    }))

    
    const logScale = d3
      .scaleSymlog() 
      .domain(d3.extent(slimmedData, d => d['Total of Incidents']))
      .range([0.5, 1]); 

    
    this.colorScale = d3.scaleSequential(d => d3.interpolateOrRd(logScale(d)));

    const columns = ["Pilot Error", "Mecanical", "Weather", "Sabotage", "Abroad"];
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
      .style("background-color", d => this.colorScale(d['Total of Incidents']))
      .style("color", "#eee");

    this.tableRows
      .selectAll("td")
      .data(d => Object.values(d))
      .join("td")
      .text(d => typeof(d) === "string" ? d : format(d));

    this.tableRows.on("click", d => {
      setGlobalState({ selectedOperator: d.Operator });
      
    });
  }

  draw(state, setGlobalState) {
    console.log("now I am drawing my table");

    
    this.tableRows.style("background-color", d =>
      state.selectedOperator === d.Operator ? "black" : this.colorScale(d['Total of Incidents'])
    );
  }
}

export { Table };
