// Narrative Project - Author: Kathia Vargas Feliz
// Airplane Crashes and Fatalities


import { Table } from "./Table.js";
import { Linechart } from "./Linechart.js";
import { Linechart2 } from "./Linechart2.js";
import { Bubble } from "./Bubble.js";
import { Pie } from "./Pie.js";
import { Barchart } from "./Barchart.js";

let causesTable, linechart, linechart2, bubble, pie, barchart;

let state = {

  geojson: null,
  airplaneData: null,
  fatalities: null,
  causesTable: null,
  topAirlines: null,
  barchart: null,
  summary: d3.select("#summary").append("div.row"),
  filteredData: [],

};

Promise.all([
  d3.csv("../Data/commercial.csv", d3.autoType),
  d3.csv("../Data/causes.csv", d3.autoType),
  d3.csv("../Data/crash-location.csv", d3.autoType),
  d3.csv("../Data/fatalities-per-year.csv", d3.autoType),
  d3.csv("../Data/bubble20.csv", d3.autoType),
  d3.csv("../Data/Airplane_Fatalities.csv", d3.autoType),
  d3.csv("../Data/causesTable.csv", d3.autoType),
]).then(([commercial,causes, barchart,fatalities,topAirlines,airplaneData,causesTable]) => {
  state.commercial = commercial ;
  state.causes = causes ;
  state.fatalities = fatalities;
  state.topAirlines = topAirlines;
  state.airplaneData = airplaneData;
  state.causesTable = causesTable;
  state.barchart = barchart;
   console.log("state: ", state);
  init();
});
  
function init(){
  pie = new Pie(state, setGlobalState);
  barchart = new Barchart(state, setGlobalState);
  causesTable = new Table(state, setGlobalState);
  linechart = new Linechart(state, setGlobalState);
  linechart2 = new Linechart2(state, setGlobalState);
  bubble = new Bubble(state, setGlobalState);
  console.log("table", table);
  draw();
}

function draw() {
  console.log("linechart", linechart);
  state.filteredData = state.airplaneData.filter(d=> d.Operator === state.selectedOperator);
  barchart.draw(state, setGlobalState);
  pie.draw(state, setGlobalState);
  causesTable.draw(state,setGlobalState);
  linechart.draw(state, setGlobalState);
  linechart2.draw(state, setGlobalState);
  bubble.draw(state,setGlobalState);
  
}

function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}