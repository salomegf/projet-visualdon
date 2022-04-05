// 2. Les femmes astronautes
import svg from './svg.js'
import page1 from './page1.js'

function page2(astronautes) {
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

    page1(astronautes);

    const circles = g.selectAll(".Woman");
    circles.style("fill", "orange")
}

export default page2