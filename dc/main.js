/* CONSTANTS AND GLOBALS- have to make unique for dc map versus mesa map */
//Did DC map in sepaarate file to avoid getting confused with the promise loads
function dcInit() {

const dcwidth = window.innerWidth * 0.45,
  dcheight = window.innerHeight * 0.7,
  dcmargin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
 * LOAD DATA
 * Using a Promise.all([]), to load more than one dataset at a time
 * need reference json for projection to work
 * */
Promise.all([
    d3.json("../data/Bicycle_Lanes.json"),
    d3.json("../data/Metro_Lines_Regional.json"),
    d3.json("../data/DCNational_Parks.json"),
    d3.csv("../data/Metro_Bus_Stops.csv", d3.autoType),
]).then(([BikeLanes, MetroLines, DCNationalParks, MetroBus]) => {

  // create an svg element for dc map
  dcsvg = d3
    .select("#dc")
    .append("svg")
    .attr("width", dcwidth)
    .attr("height", dcheight);
    
//making background color black
    dcsvg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "black");


  // SPECIFY PROJECTION
  // a projection maps from lat/long -> x/y values
  // so it works a lot like a scale!
  const dcprojection = d3.geoAlbersUsa()
    .fitSize([
      dcwidth - dcmargin.left - dcmargin.right,
      dcheight - dcmargin.top - dcmargin.bottom
    ], BikeLanes);

  // DEFINE PATH FUNCTION, has to be unique path otherwise get an error//
  const dcpath = d3.geoPath(dcprojection)


//draw path for bike lanes- "features" from console.log array
if (showBikePath) {
  dcsvg.selectAll("path.lanes")
    .data(BikeLanes.features)
    .join("path")
    .attr("class", 'lanes')
    .attr('stroke-width', 1.5)
    .attr("stroke", "#e75480")
    .attr("fill", "transparent")
    .attr("d", dcpath)
}
// draw path for metro- have to use "geometries" from console.log array
if (showLightRail) {
   dcsvg.selectAll("path.lines")
    .data(MetroLines.geometries)
    .join("path")
    .attr("class", 'lines')
    .attr("stroke", 'white')
    .attr("opacity", 0.6)
    .attr("fill", "transparent")
    .attr('stroke-width', 2)
    .attr("d", dcpath);
}

// Draw circle for each DC bus station
if(showBusStop) {
dcsvg.selectAll("circle.MetroBus")
    .data(MetroBus)
    .join("circle")
    .attr("r", 1)
    .attr("fill", "yellow")
    .attr("transform", d=> {
        // use our projection to go from lat/long => x/y
        const coords = dcprojection([d.BSTP_LON, d.BSTP_LAT])
        // console.log(coords)
        //console log shows that x=0 and y=1
        if (coords[0] && coords[1]) {
          return `translate(${coords[0]}, ${coords[1]})`}

    })
  }

  //Showing dc parks
  if(showParks) {
    dcsvg.selectAll("path.parks")
    .data(DCNationalParks.features)
    .join("path")
    .attr("class", 'parks')
    .attr("stroke", "green")
    .attr("opacity", .9)
    .attr('stroke-width', 1.75)
    .attr("fill", "transparent")
    .attr("d", dcpath);
  }
})
}
dcInit()