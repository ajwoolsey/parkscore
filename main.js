document.addEventListener('DOMContentLoaded', function() {
  // Your existing code here
  initMaps();
});

// Global variables for checkbox states
let showBikePath = true;
let showBusStop = true;
let showParks = true;
let showLightRail = true;

// Global variables for SVGs
let mesaSvg, dcSvg;

let mesaData, dcData;

// Function to initialize both maps
function initMaps() {
    if (!mesaSvg) mesaInit();
    if (!dcSvg) dcInit();
    updateMaps();
}

// Function to update both maps
function updateMaps() {
    updateMesaMap();
    updateDcMap();
}

// Functions to toggle map features
function toggleBikePath() {
    showBikePath = !showBikePath;
    updateMaps();
}

function toggleBusstop() {
    showBusStop = !showBusStop;
    updateMaps();
}

function toggleParks() {
    showParks = !showParks;
    updateMaps();
}

function toggleLightRail() {
    showLightRail = !showLightRail;
    updateMaps();
}

// Call initMaps when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initMaps);

function mesaInit() {
    // Constants for Mesa Map
    const width = window.innerWidth * 0.45,
          height = window.innerHeight * 0.7,
          margin = { top: 20, bottom: 50, left: 60, right: 40 };

    // Clear existing SVG
    d3.select("#mesa").selectAll("*").remove();

    // Create new SVG
    mesaSvg = d3.select("#mesa")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Add black background
    mesaSvg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "black");

    // Load data and create initial map
    Promise.all([
        d3.json("data/MesaCensusTracts.json"),
        d3.json("data/BikePaths.json"),
        d3.json("data/LightRailLine.json"),
        d3.csv("data/Valley_Metro_Bus_Stops.csv", d3.autoType),
        d3.csv("data/MesaParks_Locations_And_Amenities.csv", d3.autoType),
    ]).then(([geojson, BikePaths, RailLine, ValleyBus, MesaParks]) => {
        // Store data globally
        mesaData = {geojson, BikePaths, RailLine, ValleyBus, MesaParks};
        
        // Create projection
        const projection = d3.geoAlbersUsa()
            .fitSize([
                width - margin.left - margin.right,
                height - margin.top - margin.bottom
            ], geojson);

        // Create path generator
        mesaPath = d3.geoPath(projection);

        // Draw initial map
        updateMesaMap();
    });
}

function updateMesaMap() {
    if (!mesaSvg || !mesaData) return;

    const {BikePaths, RailLine, ValleyBus, MesaParks} = mesaData;

    // Update bike paths
    const bikePaths = mesaSvg.selectAll("path.lanes")
        .data(showBikePath ? BikePaths.features : []);
    
    bikePaths.enter()
        .append("path")
        .attr("class", 'lanes')
        .merge(bikePaths)
        .attr("stroke", '#e75480')
        .attr('stroke-width', 1.5)
        .attr("fill", "transparent")
        .attr("d", mesaPath);
    
    bikePaths.exit().remove();

    // Update light rail
    const lightRail = mesaSvg.selectAll("path.rail")
        .data(showLightRail ? RailLine.features : []);
    
    lightRail.enter()
        .append("path")
        .attr("class", 'rail')
        .merge(lightRail)
        .attr("stroke", 'white')
        .attr("stroke-width", 2)
        .attr("fill", "transparent")
        .attr("d", mesaPath);
    
    lightRail.exit().remove();

    // Update bus stops
    const busStops = mesaSvg.selectAll("circle.ValleyBus")
        .data(showBusStop ? ValleyBus : []);
    
    busStops.enter()
        .append("circle")
        .attr("class", "ValleyBus")
        .merge(busStops)
        .attr("r", 1.5)
        .attr("fill", '#eed467')
        .attr("transform", d => {
            const coords = mesaPath.projection()([d.Long, d.Lat]);
            return coords ? `translate(${coords[0]}, ${coords[1]})` : null;
        });
    
    busStops.exit().remove();

    // Update parks
    const sizeScale = d3.scaleSqrt()
        .domain([d3.min(MesaParks, d => d.NumberofAcres), d3.max(MesaParks, d => d.NumberofAcres)])
        .range([1, 15]);

    const parks = mesaSvg.selectAll("circle.MesaParks")
        .data(showParks ? MesaParks : []);
    
    parks.enter()
        .append("circle")
        .attr("class", "MesaParks")
        .merge(parks)
        .attr("r", d => sizeScale(d.NumberofAcres))
        .attr("opacity", 1)
        .attr("fill", "green")
        .attr("transform", d => {
            const coords = mesaPath.projection()([d.Longitude, d.Latitude]);
            return coords ? `translate(${coords[0]}, ${coords[1]})` : null;
        });
    
    parks.exit().remove();
}

function dcInit() {
    // Constants for DC Map
    const width = window.innerWidth * 0.45,
          height = window.innerHeight * 0.7,
          margin = { top: 20, bottom: 50, left: 60, right: 40 };

    // Clear existing SVG
    d3.select("#dc").selectAll("*").remove();

    // Create new SVG
    dcSvg = d3.select("#dc")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Add black background
    dcSvg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "black");

    // Load data and create initial map
    Promise.all([
        d3.json("data/Bicycle_Lanes.json"),
        d3.json("data/Metro_Lines_Regional.json"),
        d3.json("data/DCNational_Parks.json"),
        d3.csv("data/Metro_Bus_Stops.csv", d3.autoType),
    ]).then(([BikeLanes, MetroLines, DCNationalParks, MetroBus]) => {
        // Store data globally
        dcData = {BikeLanes, MetroLines, DCNationalParks, MetroBus};
        
        // Create projection
        const projection = d3.geoAlbersUsa()
            .fitSize([
                width - margin.left - margin.right,
                height - margin.top - margin.bottom
            ], BikeLanes);

        // Create path generator
        dcPath = d3.geoPath(projection);

        // Draw initial map
        updateDcMap();
    });
}

function updateDcMap() {
    if (!dcSvg || !dcData) return;

    const {BikeLanes, MetroLines, DCNationalParks, MetroBus} = dcData;

    // Update bike lanes
    const bikeLanes = dcSvg.selectAll("path.lanes")
        .data(showBikePath ? BikeLanes.features : []);
    
    bikeLanes.enter()
        .append("path")
        .attr("class", 'lanes')
        .merge(bikeLanes)
        .attr('stroke-width', 1.5)
        .attr("stroke", "#e75480")
        .attr("fill", "transparent")
        .attr("d", dcPath);
    
    bikeLanes.exit().remove();

    // Update metro lines
    const metroLines = dcSvg.selectAll("path.lines")
        .data(showLightRail ? MetroLines.geometries : []);
    
    metroLines.enter()
        .append("path")
        .attr("class", 'lines')
        .merge(metroLines)
        .attr("stroke", 'white')
        .attr("opacity", 0.6)
        .attr("fill", "transparent")
        .attr('stroke-width', 2)
        .attr("d", dcPath);
    
    metroLines.exit().remove();

    // Update bus stops
    const busStops = dcSvg.selectAll("circle.MetroBus")
        .data(showBusStop ? MetroBus : []);
    
    busStops.enter()
        .append("circle")
        .attr("class", "MetroBus")
        .merge(busStops)
        .attr("r", 1)
        .attr("fill", "yellow")
        .attr("transform", d => {
            const coords = dcPath.projection()([d.BSTP_LON, d.BSTP_LAT]);
            return coords ? `translate(${coords[0]}, ${coords[1]})` : null;
        });
    
    busStops.exit().remove();

    // Update parks
    const parks = dcSvg.selectAll("path.parks")
        .data(showParks ? DCNationalParks.features : []);
    
    parks.enter()
        .append("path")
        .attr("class", 'parks')
        .merge(parks)
        .attr("stroke", "green")
        .attr("opacity", .9)
        .attr('stroke-width', 1.75)
        .attr("fill", "transparent")
        .attr("d", dcPath);
    
    parks.exit().remove();
}