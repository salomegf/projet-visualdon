// 1. Tous les astronautes
import svg from './svg.js'

function page1(astronautes) {
    document.querySelector('h2').innerHTML = "Tous.tes les astronautes";
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

    const nbrAstronautes = astronautes.length

    g.selectAll("circle")
        .data(
            d3.gridding()
            .size([width - 150, height])
            .mode("grid")(d3.range(nbrAstronautes))
        )
        .enter().append("circle")
        .transition().duration(700)
        .attr("r", 5)
        .attr("class", (d, i) => astronautes[i].Gender)
        .attr("transform", function (d) {
            return "translate(" + d.cx + "," + d.cy + ")";
        })

    //Légende
    const couleurs = ['black']
    const legende = ['Astronaute']

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

export default page1