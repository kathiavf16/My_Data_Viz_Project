// Exploratory Project - Author: Kathia Vargas Feliz
// Airplane Crashes and Fatalities

import { Map } from "./Map.js";
import { Table } from "./Table.js";
import { Linechart } from "./Linechart.js";

let map, table, linechart, linechart2;

let state = {

  geojson: null,
  airplaneData: null,
  tableData: null,
  selectedOperator: "Aeroflot",
  summary: d3.select("#summary").append("div.row"),
  filteredData: [],

};

Promise.all([
  d3.json("https://unpkg.com/world-atlas@1/world/110m.json"),
  d3.csv("../Data/Airplane_Fatalities.csv", d3.autoType),
  d3.csv("../Data/tableData.csv", d3.autoType),
]).then(([geojson, airplaneData, tableData]) => {
  state.geojson = geojson;
  state.airplaneData = airplaneData;
  state.tableData = tableData;
  state.filteredData = airplaneData.filter(d=> d.Operator === state.selectedOperator);
   console.log("state: ", state);
  init();
});
  
function init(){
  map = new Map(state, setGlobalState);
  table = new Table(state, setGlobalState);
  linechart = new Linechart(state, setGlobalState);
  console.log("table", table, map);
  draw();
}

function draw() {
  console.log("linechart", linechart);
  state.filteredData = state.airplaneData.filter(d=> d.Operator === state.selectedOperator);
  map.draw(state, setGlobalState);
  table.draw(state,setGlobalState);
  linechart.draw(state, setGlobalState);
  
}

function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}