// 5. À travers le monde
import svg from './svg.js'

function page6(astronautes, femmes, hommes) {
    document.querySelector('h2').innerHTML = "Apprendre à les connaître";
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

    const nbrFemmes = femmes.length

    const x = 40
    const y = 40

    g.selectAll("rect")
        .data(
            d3.gridding()
            .size([width, height])
            .mode("grid")(d3.range(nbrFemmes))
        )
        .enter().append("rect")
        .attr("width", x)
        .attr("height", y)
        .attr("class", (d, i) => astronautes[i].Name)
        .attr("transform", function (d) {
            return "translate(" + d.cx + "," + d.cy + ")";
        })
}

export default page6