//need separate promise for ParkScore Scatterplots, otherwise D3 gets confused
//Note: originally was going to load transit scores from a different dataset (walkscoretransitscore),
//turns out I didn't need it, but didn't take it out of the promise because otherwise Promise.all
// //doesn't work
// Promise.all([
//   d3.csv('../data/walkscore.csv', d3.Autotype),
//   d3.csv('../data/walkscoretransitscore.csv', d3.Autotype),
// ]).then(([WalkScore, TransitScore]) => {

// //Scatterplot for WalkScore
//   const walkwidth = 400,
//   walkheight = window.innerHeight * 0.9,
//   walkmargin = { top: 20, bottom: 50, left: 50, right: 20 };

// const xScale= d3.scaleLinear()
// //WalkScore, x axis
// .domain([0, 100])
// .range([walkmargin.left, walkwidth - 50])

// //y scale Walkscore
// const yScale= d3.scaleLinear()
// .domain([10, 100])
// .range([walkheight - walkmargin.bottom, walkmargin.top])


// //append svg for walkscore scatterplot
// var walksvg= d3.select("#walkscore")
// .append("svg")

// //background color is style not attribute
// .style("background-color", "black")
// .attr("width", walkwidth)
// .attr("height", walkheight)
// .append("g")

// //Creating axes for WalkScore Scatterplot
// const xAxis = d3.axisBottom(xScale)
// walksvg.append("g")
// .attr("transform", `translate(0,${walkheight - walkmargin.bottom})`)
// .attr('stroke', 'white')
// .call(xAxis)
// .select("path")
// .attr('stroke', 'white')
// .select("line")
// .attr('stroke', 'white');

// const yAxis = d3.axisLeft(yScale)
// walksvg.append("g")
// .attr("transform", `translate(${walkmargin.left},0)`)
// .attr('stroke', 'white')
// .attr('fill', 'white')
// .call(yAxis)
// .select("path")
// .attr('stroke', 'white')
// .select("line")
// .attr('stroke', 'white')

// // Axis titles for WalkScore Scatterplot
// // x axis
// var xLabel = walksvg.append("text")
//     .text("Park Score")
//     .attr("x", 150)
//     .attr("y", 665)
//     .style('fill', 'white');

// //y axis
// var yLabel = walksvg.append("text")
//     .text("Walk Score")
//     .attr("x", -300)
//     .attr("y", 200)
//     .attr('transform', 'rotate(270,-60,120)')
//     .style('fill', 'white');

// //Data point labels for DC and Mesa WalkScore Scatterplot
// var MesaLabelWalk = walksvg.append("text")
//     .text("Mesa")
//     .attr("x", 115)
//     .attr("y", 425)
//     .style('fill', 'white')
//     .style('font-size', '15px');

// var DCabelWalk = walksvg.append("text")
//     .text("DC")
//     .attr("x", 300)
//     .attr("y", 160)
//     .style('fill', 'white')
//     .style('font-size', '15px');

// //append circles, use dot to make it easier to understand
// walksvg.append('g')
// .selectAll("dot")
// .data(WalkScore)
// .enter()
// .append("circle")
//   .attr("cx", function (d) { return xScale(d.ParkScoreRating); } )
//   .attr("cy", function (d) { return yScale(d.WalkScore); } )
//   //Size based radius
//   .attr("r", (d) => {
//     if (d.CityName === 'Mesa, AZ' || d.CityName === 'Washington, DC') {
//       return 4.5
//     } else {
//      return 3
//         }
//     })
//     //Ternerary function for mesa and dc dots
//     .attr("fill", (d) => { 
//       return d.CityName === 'Mesa, AZ'  ? 'red' : d.CityName === 'Washington, DC' ? 'orange' : '#00ffbc'
//       })
  


// //Constants for Transitscore scatterplot
//       const transitwidth = 400,
//       transitheight = window.innerHeight * 0.9,
//       transitmargin = { top: 20, bottom: 50, left: 50, right: 20 };
  

// //xScale yScale for Transitscore scatterplot
// //Have to create unique xScale constants otherwise d3 gets confused//
// const transitxScale= d3.scaleLinear()
// //WalkScore, x axis
// .domain([0, 100])
// .range([transitmargin.left, transitwidth - 20])


// const transityScale= d3.scaleLinear()
// .domain([0, 100])
// .range([transitheight - transitmargin.bottom, transitmargin.top])

// //Appending svg for Transitscore scatterplot
// var transitsvg= d3.select("#transitscore")
// .append("svg")
// //background color is style not attribute
// .style("background-color", "black")
// .attr("width", transitwidth)
// .attr("height", transitheight)
// .append("g")

// //Creating axes for TransitScore Scatterplot
// const transitxAxis = d3.axisBottom(transitxScale)
// transitsvg.append("g")
// .attr("transform", `translate(0,${transitheight - transitmargin.bottom})`)
// .attr('stroke', 'white')
// .call(transitxAxis)
// .select("path")
// .attr('stroke', 'white')
// .select("line")
// .attr('stroke', 'white');

// const transityAxis = d3.axisLeft(transityScale)
// transitsvg.append("g")
// .attr("transform", `translate(${transitmargin.left},0)`)
// .attr('stroke', 'white')
// .attr('fill', 'white')
// .call(transityAxis)
// .select("path")
// .attr('stroke', 'white')
// .select("line")
// .attr('stroke', 'white');

// //Axes titles for Transitscore scatterplot
// var transitxLabel = transitsvg.append("text")
// .text("Park Score")
// .attr("x", 150)
// .attr("y", 665)
// .style('fill', 'white');

// //y axis
// var transityLabel = transitsvg.append("text")
// .text("Transit Score")
// .attr("x", -300)
// .attr("y", 200)
// .attr('transform', 'rotate(270,-60,120)')
// .style('fill', 'white');

// //DC and Mesa Labels for Transitscore scatterplot
// var MesaLabelTransit = transitsvg.append("text")
//     .text("Mesa")
//     .attr("x", 115)
//     .attr("y", 500)
//     .style('fill', 'white')
//     .style('font-size', '15px');

// var DCabelTransit = transitsvg.append("text")
//     .text("DC")
//     .attr("x", 300)
//     .attr("y", 220)
//     .style('fill', 'white')
//     .style('font-size', '15px');

// //Appending svg for transitscore scatterplot
// transitsvg.append('g')
// .selectAll("dot")
// .data(WalkScore)
// .enter()
// .append("circle")
//   .attr("cx", function (d) { return xScale(d.ParkScoreRating); } )
//   .attr("cy", function (d) { return yScale(d.TransitScore); } )
//   //Size based radius
//   .attr("r", (d) => {
//     if (d.CityName === 'Mesa, AZ' || d.CityName === 'Washington, DC') {
//       return 4.5
//     } else {
//      return 3
//         }
//     })
//     //Ternerary function for mesa and dc dots
//     .attr("fill", (d) => { 
//       return d.CityName === 'Mesa, AZ'  ? 'red' : d.CityName === 'Washington, DC' ? 'orange' : '#009fff'
//       })
  
// //BikeScore Scatterplot
// //constants
//   const bikewidth = 400,
//   bikeheight = window.innerHeight * 0.9,
//   bikemargin = { top: 20, bottom: 50, left: 50, right: 20 };

// //BikeScore Scatterplot xScale yScale
// const bikexScale= d3.scaleLinear()
// .domain([0, 100])
// .range([bikemargin.left, bikewidth - 30])

// // //y scale BikeScore ParkScore
// const bikeyScale= d3.scaleLinear()
// .domain([0, 100])
// .range([bikeheight -  bikemargin.bottom, bikemargin.top])

// //Appending svg for BikeScore scatterplot
// var bikesvg= d3.select("#bikescore")
// .append("svg")
// //background color is style not attribute
// .style("background-color", "black")
// .attr("width", bikewidth)
// .attr("height", bikeheight)
// .append("g")


// // //Creating axes for BikeScore Scatterplot
// const bikexAxis = d3.axisBottom(bikexScale)
// bikesvg.append("g")
// .attr("transform", `translate(0,${bikeheight - bikemargin.bottom})`)
// .attr('stroke', 'white')
// .call(bikexAxis)
// .select("path")
// .attr('stroke', 'white')
// .select("line")
// .attr('stroke', 'white');

// const bikeyAxis = d3.axisLeft(bikeyScale)
// bikesvg.append("g")
// .attr("transform", `translate(${bikemargin.left},0)`)
// .attr('stroke', 'white')
// .attr('fill', 'white')
// .call(bikeyAxis)
// .select("path")
// .attr('stroke', 'white')
// .select("line")
// .attr('stroke', 'white');

// // //Axes titles for BikeScore

// var bikexLabel = bikesvg.append("text")
// .text("Park Score")
// .attr("x", 150)
// .attr("y", 665)
// .style('fill', 'white');


// var bikeyLabel = bikesvg.append("text")
// .text("Bike Score")
// .attr("x", -300)
// .attr("y", 200)
// .attr('transform', 'rotate(270,-60,120)')
// .style('fill', 'white');

// //DC and Mesa Labels for BikeScore scatterplot
// var MesaLabelTransit = bikesvg.append("text")
//     .text("Mesa")
//     .attr("x", 115)
//     .attr("y", 257)
//     .style('fill', 'white')
//     .style('font-size', '15px');

// var DCabelTransit = bikesvg.append("text")
//     .text("DC")
//     .attr("x", 315)
//     .attr("y", 190)
//     .style('fill', 'white')
//     .style('font-size', '15px');

// //Appending g to add dots to plot
// bikesvg.append('g')
// .selectAll("dot")
// .data(WalkScore)
// .enter()
// .append("circle")
// .attr("cx", function (d) { return bikexScale(d.ParkScoreRating); } )
// .attr("cy", function (d) { return bikeyScale(d.BikeScore); } )
// //Size based radius
// .attr("r", (d) => {
// if (d.CityName === 'Mesa, AZ' || d.CityName === 'Washington, DC') {
//   return 4.5
// } else {
//  return 3
//     }
// })
// //Ternerary function for mesa and dc dots
// .attr("fill", (d) => { 
//   return d.CityName === 'Mesa, AZ'  ? 'red' : d.CityName === 'Washington, DC' ? 'orange' : '#6a1acd'
//   })
//     })
  

//Have to do init function for the checkbox legend
var showBikePath = true
var showBusStop = true
var showParks = true
var showLightRail = true

function mesaInit() {
  //Clear out and start over, prevents layers of SVGs to exist
  


//constants for Mesa Map
const width = window.innerWidth * 0.45,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };
  
headersvg= d3
  .select('#header')
  .append('svg')
  .attr('width', 600)
  .attr('height', 48);
/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * loading geographic data for Mesa
 * */
Promise.all([
  d3.json("../data/MesaCensusTracts.json"),
  d3.json("../data/BikePaths.json"),
  d3.json("../data/LightRailLine.json"),
  d3.csv("../data/Valley_Metro_Bus_Stops.csv", d3.autoType),
  d3.csv("../data/MesaParks_Locations_And_Amenities.csv", d3.autoType),
]).then(([geojson, BikePaths, RailLine, ValleyBus, MesaParks]) => {
  

// create an svg element for ParkScore WalkScore scatterplot
//"svg" is for mesa map only, every other svg has to be unique
  svg = d3
    .select("#mesa")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
    
//making background color black
    svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "black");


  // SPECIFY PROJECTION
  // a projection maps from lat/long -> x/y values
  // so it works a lot like a scale
  const projection = d3.geoAlbersUsa()
    .fitSize([
      width - margin.left - margin.right,
      height - margin.top - margin.bottom
    ], geojson);

  // DEFINE PATH FUNCTION
  const path = d3.geoPath(projection)


//Draw path for Mesa Bike Lanes

if(showBikePath) {
  svg.selectAll("path.lanes")
  .data(BikePaths.features)
  .join("path")
  .attr("class", 'lanes')
  .attr("stroke", '#e75480')
  .attr('stroke-width', 1.5)
  .attr("fill", "transparent")
  .attr("d", path)
}



//Draw path for Mesa Light Rail
if(showLightRail) {
svg.selectAll("path.rail")
    .data(RailLine.features)
    .join("path")
    .attr("class", 'rail')
    .attr("stroke", 'white')
    .attr("stroke-width", 2)
    .attr("fill", "transparent")
    .attr("d", path)
}
//Draw circle for each Mesa bus station
  if(showBusStop)   {
  svg.selectAll("circle.ValleyBus")
    .data(ValleyBus)
    .join("circle")
    .attr("r", 1.5)
    .attr("fill", '#eed467')
    .attr("transform", d=> {
        // use our projection to go from lat/long => x/y
        const coords = projection([d.Long, d.Lat])
        // console.log(coords)
        //console log shows that x=0 and y=1
        if (coords[0] && coords[1]) {
          return `translate(${coords[0]}, ${coords[1]})`}

    })
  }
    //creating sizeScale for UGS
    const sizeScale= d3.scaleSqrt()
    //
    .domain([d3.min(MesaParks.map(d => d.NumberofAcres)), d3.max(MesaParks.map(d => d.NumberofAcres))])
    //smallest to largest dot radius
    .range([1, 15])

//Size scale for each park
  if(showParks) { 
    svg.selectAll("circle.MesaParks_Locations_And_Amenities")
    .data(MesaParks)
    .join("circle")
    .attr("r", function (d) { ; return sizeScale(d.NumberofAcres)})
    .attr("opacity", 1)
    .attr("fill", "green")
    .attr("transform", d=> {
        // use our projection to go from lat/long => x/y
        const coords = projection([d.Longitude, d.Latitude])
        // console.log(coords)
        //can't read coords if coords is null, have to change to coords && coords[0]
        if (coords && coords[0] && coords[1]) {
          return `translate(${coords[0]}, ${coords[1]})`}

     
  })
}

})

}
mesaInit()

//Using toggleBikPath function to show geographic data when clicked
function toggleBikePath() {
  document.getElementById('mesa').innerHTML = ""
  document.getElementById('dc').innerHTML = ""
  showBikePath = !showBikePath
  mesaInit()
  dcInit() 
} 


function toggleBusstop() {
  document.getElementById('mesa').innerHTML = ""
  document.getElementById('dc').innerHTML = ""
  showBusStop = !showBusStop
  mesaInit()
  dcInit()
} 

function toggleParks() {
  document.getElementById('mesa').innerHTML = ""
  document.getElementById('dc').innerHTML = ""
  showParks = !showParks
  mesaInit()
  dcInit()
} 

function toggleLightRail() {
  document.getElementById('mesa').innerHTML = ""
  document.getElementById('dc').innerHTML = ""
  showLightRail = !showLightRail
  mesaInit()
  dcInit()
} 


