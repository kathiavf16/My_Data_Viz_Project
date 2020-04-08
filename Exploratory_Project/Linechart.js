class Linechart{
    
    constructor(state, setGlobalState) {  
    const width = window.innerWidth * 0.3;
    const height = window.innerHeight * 0.3;
    const margin = { top: 20, bottom: 50, left: 60, right: 40 };
    //radius = 8;

    let svg;
    let xScale;
    let yScale; 
        
      /* INITIALIZING FUNCTION */
      // this will be run *one time* when the data finishes loading in
        // + SCALES
        xScale = d3
          .scaleLinear()
          .domain(d3.extent(state.airplaneData, d => d.Year))
          .range([margin.left, width - margin.right]);
      
        yScale = d3
          .scaleLinear()
          .domain(d3.extent(state.airplaneData, d => d.Fatalities))
          .range([height - margin.bottom, margin.top]);
      
        // + AXES
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
      
        //gridline
      
        let gridline = d3.axisBottom()
                         .tickFormat("")
                         .tickSize(height-40)
                         .scale(xScale);            ;
      
         
        // + CREATE SVG ELEMENT
        svg = d3
          .select("#linechart")
          .append("svg")
          .attr("width", width)
          .attr("height", height);
      
          // grid svg
        svg.append("g")
          .attr("class", "grid")
          .call(gridline);
            
        // + CALL AXES
      
        // xAxis
        svg
          .append("g")
          .attr("class", "axis-x-axis")
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(xAxis)
          .append("text")
          .attr("class", "axis-label")
          .attr("x", "50%")
          .attr("dy", "3em")
          .text("Year");
      
        //  yAxis
        svg
          .append("g")
          .attr("class", "axis-y-axis")
          .attr("transform", `translate(${margin.left},0)`)
          .call(yAxis)
          .append("text")
          .attr("class", "axis-label")
          .attr("y", "50%")
          .attr("dx", "-3em")
          .attr("writing-mode", "vertical-rl")
          .text("% of Grads");
      

    }

}
export {Linechart};