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
        .attr("r", 5)
        .attr("class", (d, i) => astronautes[i].Gender)
        .attr("transform", function (d) {
            return "translate(" + d.cx + "," + d.cy + ")";
        })
}

export default page1