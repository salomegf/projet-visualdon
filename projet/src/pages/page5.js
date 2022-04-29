// 5. À travers le monde
import svg from './svg.js'

function page5(astronautes, femmes, hommes) {
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


    //Calculs %
    function countPays(array) {
        const pays = array.map((d, i) => {
            return d.Country
        });

        const paysCount = {};
        for (const p of pays) {
            if (paysCount[p]) {
                paysCount[p] += 1;
            } else {
                paysCount[p] = 1;
            }
        }
        return paysCount;
    }
    const paysFemmesCount = countPays(femmes);
    const paysHommesCount = countPays(hommes);
    const paysCount = countPays(astronautes);

    const tousPays = Object.keys(paysCount);
    //console.log(tousPays);

    //console.log(Object.keys(paysCount).length);

    const paysPourcentFemmes = {};
    for (const pays of tousPays) {
        const nbFemmes = paysFemmesCount[pays] || 0;
        const nbHommes = paysHommesCount[pays] || 0;
        paysPourcentFemmes[pays] = 100 * nbFemmes / (nbFemmes + nbHommes);
    }

    //console.log(paysPourcentFemmes);
    delete Object.assign(paysPourcentFemmes, {
        ['USA']: paysPourcentFemmes['United States']
    })['United States'];
    delete Object.assign(paysPourcentFemmes, {
        ['England']: paysPourcentFemmes['United Kingdom']
    })['United Kingdom'];

    //not exists anymore : 
    //Czechoslovakia: 0
    //"East Germany": 0
    //"Soviet Union": 2.985074626865672

    // Map and projection
    const path = d3.geoPath();
    const projection = d3.geoMercator()
        .scale(100)
        .center([width / 20, width / 25])
        .translate([width / 2, height / 2]);

    // Data and color scale
    const colorScale = d3.scaleThreshold()
        .domain([2, 10, 20, 50])
        .range(d3.schemeOranges[5]);

    // Load external data and boot
    Promise.all([
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    ]).then(function (loadData) {

        let topo = loadData[0]

        let mouseOver = function (d) {
            d3.selectAll(".Country")
                .transition()
                .duration(200)
                .style("opacity", .5)
            d3.select(this)
                .transition()
                .duration(200)
                .style("opacity", 1)
                .style("stroke", "gray")
        }

        let mouseLeave = function (d) {
            d3.selectAll(".Country")
                .transition()
                .duration(200)
                .style("opacity", .8)
            d3.select(this)
                .transition()
                .duration(200)
                .style("stroke", "transparent")
        }

        // Draw the map
        g.append("g")
            .selectAll("path")
            .data(topo.features)
            .enter()
            .append("path")
            // draw each country
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            // set the color of each country
            .style("fill", function (d, i) {
                const pourcent = paysPourcentFemmes[d.properties.name]; // || 0
                return colorScale(pourcent) || "lightgray";
            })
            .style("stroke", "transparent")
            .attr("class", function (d) {
                return d.properties.name
            })
            .style("opacity", .8)
            .on("mouseover", mouseOver)
            .on("mouseleave", mouseLeave)
    })

    //Légende
    //console.log(colorScale.domain());
    //console.log(colorScale(colorScale.domain()[0]));

    const domaine = colorScale.domain();
    domaine.unshift(0);
    domaine.push(undefined);

    const legende = ['0%', '> 2%', '> 10%', '> 20%', '> 50%', 'aucune donnée']

    g.append("text")
        .attr("x", width - 125)
        .attr("y", 50)
        .text('Légende')
        .attr("font-weight", "bold")

    g.append("text")
        .attr("x", width - 125)
        .attr("y", 75)
        .style("fill", "black")
        .text('% de femmes')

    // Add one dot in the legend for each name.
    g.selectAll("mydots")
        .data(domaine)
        .enter()
        .append("circle")
        .attr("cx", width - 120)
        .attr("cy", function (d, i) {
            return 95 + i * 25
        })
        .attr("r", 5)
        .style("fill", function (d, i) {
            return colorScale(domaine[i]) || "lightgray"
        })

    // Add one label in the legend for each name.
    g.selectAll("mylabels")
        .data(legende)
        .enter()
        .append("text")
        .attr("x", width - 110)
        .attr("y", function (d, i) {
            return 100 + i * 25
        })
        .style("fill", "black")
        .text(function (d) {
            return d
        })
        .attr("text-anchor", "left")
        .attr("alignment-baseline", "middle")

    g.selectAll("text")
        .style("font-family", "Roboto")

}

export default page5