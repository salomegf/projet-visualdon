// 3. Moyennes
import svg from './svg.js'
const stringToMs = require('string-to-ms');
const msToString = require('pretty-ms');

function page3(astronautes, femmes, hommes) {
    document.querySelector('h2').innerHTML = "Moyennes";
    const margin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        },
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    svg(margin, width, height);

    const g = d3.select(".group");

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
            .attr("cx", (width - 150) / 6)
            .attr("cy", height - 20 - (i * 12))
            .attr("r", 5)
            .style("fill", "lightgray")
    }
    gMissionsHommes.append("text")
        .attr("x", (width - 150) / 6)
        .attr("y", height)
        .attr("text-anchor", "middle")
        .text(missionsHommesAvg + " missions")

    // Missions femmes
    g.append("g")
        .attr("class", "g2")
    const gMissionsFemmes = d3.select(".g2");

    for (let i = 0; i < Math.round(missionsFemmesAvg); i++) {
        gMissionsFemmes.append("circle")
            .attr("cx", (width - 150) / 6 + (width - 150) / 2)
            .attr("cy", height - 20 - (i * 12))
            .attr("r", 5)
            .style("fill", "orange")
    }

    gMissionsFemmes.append("text")
        .attr("x", (width - 150) / 6 + (width - 150) / 2)
        .attr("y", height)
        .attr("text-anchor", "middle")
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
        .range([0, height / 12])

    // Jours hommes
    g.append("g")
        .attr("class", "g3")
    const gJoursHommes = d3.select(".g3");

    for (let i = 0; i < scale(joursHommesAvgCompact); i++) {
        gJoursHommes.append("circle")
            .attr("cx", 2 * (width - 150) / 6)
            .attr("cy", height - 20 - (i * 12))
            .attr("r", 5)
            .style("fill", "lightgray")
    }
    gJoursHommes.append("text")
        .attr("x", 2 * (width - 150) / 6)
        .attr("y", height)
        .attr("text-anchor", "middle")
        .text(joursHommesAvgCompact + " jours")

    // Jours femmes
    g.append("g")
        .attr("class", "g4")
    const gJoursFemmes = d3.select(".g4");

    for (let i = 0; i < scale(joursFemmesAvgCompact); i++) {
        gJoursFemmes.append("circle")
            .attr("cx", 2 * (width - 150) / 6 + (width - 150) / 2)
            .attr("cy", height - 20 - (i * 12))
            .attr("r", 5)
            .style("fill", "orange")
    }
    gJoursFemmes.append("text")
        .attr("x", 2 * (width - 150) / 6 + (width - 150) / 2)
        .attr("y", height)
        .attr("text-anchor", "middle")
        .text(joursFemmesAvgCompact + " jours")

    g.selectAll("text")
        .style("font-family", "Roboto")

    //Légende
    const couleurs = ['lightgray', 'orange']
    const legende = ['Hommes', 'Femmes']

    g.append("text")
        .attr("x", width - 125)
        .attr("y", 50)
        .text('Légende')
        .attr("font-weight", "bold")

    // Add one dot in the legend for each name.
    g.selectAll("mydots")
        .data(couleurs)
        .enter()
        .append("circle")
        .attr("cx", width - 120)
        .attr("cy", function (d, i) {
            return 75 + i * 25
        })
        .attr("r", 5)
        .style("fill", function (d, i) {
            return d
        })

    // Add one label in the legend for each name.
    g.selectAll("mylabels")
        .data(legende)
        .enter()
        .append("text")
        .attr("x", width - 110)
        .attr("y", function (d, i) {
            return 80 + i * 25
        })
        .style("fill", "black")
        .text(function (d) {
            return d
        })
        .attr("text-anchor", "left")
        .attr("alignment-baseline", "middle")

}

export default page3