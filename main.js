
  

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


