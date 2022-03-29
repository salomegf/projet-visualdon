//import * as d3 from 'd3';
import astronautes from '../assets/International_Astronaut_Database.csv'

/*
const noms = astronautes.map((d,i) => {
    return d["Total Flights"];
})
console.log(noms);*/


const femmes = astronautes.filter((d, i) => {
    return d.Gender == "Woman"
})

//SVG
const body = d3.select("body");
body.append("svg");

const margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const svg = d3.select("svg");

svg.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("class", "group")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

const g = d3.select(".group");



// 1. Tous les astronautes
const nbrAstronautes = astronautes.length

g.selectAll("circle")
    .data(
        d3.gridding()
        .size([width, height])
        .mode("grid")(d3.range(nbrAstronautes))
    )
    .enter().append("circle")
    .attr("r", 5)
    .attr("transform", function (d) {
        return "translate(" + d.cx + "," + d.cy + ")";
    });