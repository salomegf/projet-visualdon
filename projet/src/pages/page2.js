// 2. Les femmes astronautes
import svg from './svg.js'
import page1 from './page1.js'

function page2(astronautes, femmes, hommes) {
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

    /* page1(astronautes);

    const circles = g.selectAll(".Woman");
    circles.style("fill", "orange") */

    const nbrAstronautes = astronautes.length
    const nbrHommes = hommes.length

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
        .style("fill", function (d, i) {
            if (i > nbrHommes - 1) {
                return "orange";
            }
        })
}

export default page2