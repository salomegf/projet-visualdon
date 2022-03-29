//import * as d3 from 'd3';
import astronautes from '../assets/International_Astronaut_Database.csv'
const stringToMs = require('string-to-ms');
const msToString = require('pretty-ms');

//console.log(astronautes);

const femmes = astronautes.filter((d, i) => {
    return d.Gender == "Woman"
})

const hommes = astronautes.filter((d, i) => {
    return d.Gender == "Man"
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

/* // 1. Tous les astronautes
const nbrAstronautes = astronautes.length

g.selectAll("circle")
    .data(
        d3.gridding()
        .size([width, height])
        .mode("grid")(d3.range(nbrAstronautes))
    )
    .enter().append("circle")
    .attr("r", 5)
    .attr("class", (d, i) => astronautes[i].Gender)
    .attr("transform", function (d) {
        return "translate(" + d.cx + "," + d.cy + ")";
    })

// 2. Les femmes astronautes
const circles = g.selectAll(".Woman");
circles.style("fill", "orange") */

// 3. Moyennes
const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length

// Calcul des missions
const missionsHommes = hommes.map((d, i) => {
    return d["Total Flights"];
})

const missionsFemmes = femmes.map((d, i) => {
    return d["Total Flights"];
})

const missionsHommesAvg = avg(missionsHommes).toPrecision(3)
const missionsFemmesAvg = avg(missionsFemmes).toPrecision(3)

// Missions hommes
g.append("g")
    .attr("class", "g1")
const gMissionsHommes = d3.select(".g1");

for (let i = 0; i < Math.round(missionsHommesAvg); i++) {
    gMissionsHommes.append("circle")
        .attr("cx", width / 6)
        .attr("cy", height - 20 - (i * 12))
        .attr("r", 5)
}
gMissionsHommes.append("text")
    .attr("x", width / 6)
    .attr("y", height)
    .attr("text-anchor", "middle")
    .text(missionsHommesAvg + " missions")

// Missions femmes
g.append("g")
    .attr("class", "g2")
const gMissionsFemmes = d3.select(".g2");

for (let i = 0; i < Math.round(missionsFemmesAvg); i++) {
    gMissionsFemmes.append("circle")
        .attr("cx", width / 6 + width / 2)
        .attr("cy", height - 20 - (i * 12))
        .attr("r", 5)
        .style("fill", "orange")
}

gMissionsFemmes.append("text")
    .attr("x", width / 6 + width / 2)
    .attr("y", height)
    .attr("text-anchor", "middle")
    .style("fill", "orange")
    .text(missionsFemmesAvg + " missions")

// Calcul des jours
const joursHommes = hommes.map((d, i) => {
    const time = d["Total Flight Time (ddd:hh:mm)"];
    const timeSplit = time.split(':');
    const timeString = timeSplit[0] + "d " + timeSplit[1] + "h " + timeSplit[2] + "m";
    return stringToMs(timeString);
})

const joursFemmes = femmes.map((d, i) => {
    const time = d["Total Flight Time (ddd:hh:mm)"];
    const timeSplit = time.split(':');
    const timeString = timeSplit[0] + "d " + timeSplit[1] + "h " + timeSplit[2] + "m";
    return stringToMs(timeString);
})

const joursHommesAvg = avg(joursHommes)
const joursFemmesAvg = avg(joursFemmes)

const joursHommesAvgCompact = msToString(joursHommesAvg, {
    compact: true
}).slice(0, -1);
const joursHommesAvgVerbose = msToString(joursHommesAvg, {
    verbose: true
});
const joursFemmesAvgCompact = msToString(joursFemmesAvg, {
    compact: true
}).slice(0, -1);
const joursFemmesAvgVerbose = msToString(joursFemmesAvg, {
    verbose: true
});

const scale = d3.scaleLinear()
    .domain([0, 110])
    .range([0, height/12])

// Jours hommes
g.append("g")
    .attr("class", "g3")
const gJoursHommes = d3.select(".g3");

for (let i = 0; i < scale(joursHommesAvgCompact); i++) {
    gJoursHommes.append("circle")
        .attr("cx", 2 * width / 6)
        .attr("cy", height - 20 - (i * 12))
        .attr("r", 5)
}
gJoursHommes.append("text")
    .attr("x", 2 * width / 6)
    .attr("y", height)
    .attr("text-anchor", "middle")
    .text(joursHommesAvgCompact + " jours")

// Jours femmes
g.append("g")
    .attr("class", "g4")
const gJoursFemmes = d3.select(".g4");

for (let i = 0; i < scale(joursFemmesAvgCompact); i++) {
    gJoursFemmes.append("circle")
        .attr("cx", 2 * width / 6 + width / 2)
        .attr("cy", height - 20 - (i * 12))
        .attr("r", 5)
        .style("fill", "orange")
}
gJoursFemmes.append("text")
    .attr("x", 2 * width / 6 + width / 2)
    .attr("y", height)
    .attr("text-anchor", "middle")
    .style("fill", "orange")
    .text(joursFemmesAvgCompact + " jours")