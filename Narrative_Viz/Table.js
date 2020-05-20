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
      .domain(["Pilot Error", "Mecanical", "Weather", "Sabotage", "Abroad"])
      .range(["#5E4FA2", "#3288BD", "#66C2A5", "#ABDDA4"]); 

      

    
    this.colorScale = d3.scaleOrdinal(d => d3.schemeRdBu['7'].reverse(logScale));

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
      .style("fill", d => this.colorScale())
      .style("color", "lightyellow");

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
