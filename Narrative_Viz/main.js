// Narrative Project - Author: Kathia Vargas Feliz
// Airplane Crashes and Fatalities


import { Table } from "./Table.js";
import { Linechart } from "./Linechart.js";
import { Bubble } from "./Bubble.js";

let map, table, linechart, bubble;

let state = {

  geojson: null,
  airplaneData: null,
  tableData: null,
  topAirlines: null,
  selectedOperator: "Delta Air Lines",
  summary: d3.select("#summary").append("div.row"),
  filteredData: [],

};

Promise.all([
  d3.csv("/Data/bubble20.csv", d3.autoType),
  d3.csv("/Data/Airplane_Fatalities.csv", d3.autoType),
  d3.csv("/Data/tableData.csv", d3.autoType),
]).then(([topAirlines,airplaneData, tableData]) => {
  state.topAirlines = topAirlines;
  state.airplaneData = airplaneData;
  state.tableData = tableData;
  state.filteredData = airplaneData.filter(d=> d.Operator === state.selectedOperator);
   console.log("state: ", state);
  init();
});
  
function init(){
 // map = new Map(state, setGlobalState);
  table = new Table(state, setGlobalState);
  linechart = new Linechart(state, setGlobalState);
  bubble = new Bubble(state, setGlobalState);
  console.log("table", table, map);
  draw();
}

function draw() {
  console.log("linechart", linechart);
  state.filteredData = state.airplaneData.filter(d=> d.Operator === state.selectedOperator);
  //map.draw(state, setGlobalState);
  table.draw(state,setGlobalState);
  linechart.draw(state, setGlobalState);
  bubble.draw(state,setGlobalState);
  
}

function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}