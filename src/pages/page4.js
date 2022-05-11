// 4. À travers les années
import svg from './svg.js'

function page4(astronautes, femmes, hommes) {
    document.querySelector('h2').innerHTML = "À travers les années";
    const margin = {
            top: 10,
            right: 10,
            bottom: 45,
            left: 45
        },
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    svg(margin, width, height);

    const g = d3.select(".group");

    //Données
    function years(array) {
        const yearsFlights2d = array.map((d, i) => {
            const yearsStr = d.Flights.split(/[()]/);

            const years = []
            for (let j = 1; j <= yearsStr.length; j += 2) {
                years.push(yearsStr[j]);
            }
            years.pop();

            return years;
        })
        const yearsFlights = [].concat(...yearsFlights2d);

        const yearsCount = {};
        for (const y of yearsFlights) {
            if (yearsCount[y]) {
                yearsCount[y] += 1;
            } else {
                yearsCount[y] = 1;
            }
        }
        return yearsCount;
    }

    const yearsCount = years(astronautes);
    const yearsFemmesCount = years(femmes);
    const yearsHommesCount = years(hommes);

    const yearsAll = Object.keys(yearsCount);

    const yearsPourcentFemmes = [];
    for (const year of yearsAll) {
        const nbFemmes = yearsFemmesCount[year] || 0;
        const nbHommes = yearsHommesCount[year] || 0;
        yearsPourcentFemmes.push({
            year: new Date(year),
            pourcent: 100 * nbFemmes / (nbFemmes + nbHommes)
        });
    }

    //Graph
    const x = d3.scaleTime()
        .domain([new Date("1961"), new Date("2021")])
        .nice() //met les dates tout joli
        .range([0, width - 150])

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0])

    //Axes
    g.append('g')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))


    g.append('text')
        .attr("transform", `translate(${(width-150)/2 - 20}, ${height + 35})`)
        .attr("font-size", 12)
        .text("années")


    g.append('g')
        .call(d3.axisLeft(y))

    g.append('text')
        .attr("transform", `rotate(-90) translate( ${-height / 2 -36}, -30)`)
        .attr("font-size", 12)
        .text("% de femmes")


    //Tooltip
    // -1- Create a tooltip that is hidden by default:
    const tooltip = g.append("text")
        .attr("x", width - 200)
        .attr("y", 155)

    // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
    const showTooltip = function (event, d) {
        tooltip
            .transition()
            .duration(200)
        tooltip
            .style("opacity", 1)
            .text(d.year.getFullYear() + " : " + d.pourcent.toFixed(2) + "%")
        d3.selectAll("rect")
            .transition()
            .duration(200)
        d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "gray")
    }
    const hideTooltip = function (event, d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
        d3.selectAll("rect")
            .transition()
            .duration(200)
        d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "transparent")
    }


    //Données
    /* g.selectAll("rect")
        .data(yearsPourcentFemmes)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.year))
        .attr("y", (d) => y(100))
        .attr("width", 8)
        .attr("height", (d) => height - y(100))
        .style("fill", "lightgray") */

    g.selectAll("rect")
        .data(yearsPourcentFemmes)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.year))
        .attr("y", (d) => y(d.pourcent))
        .attr("width", 8)
        .attr("height", (d) => height - y(d.pourcent))
        .style("fill", "orange")
        .style("stroke", "transparent")
        // -3- Trigger the functions
        .on("mouseover", showTooltip)
        .on("mouseleave", hideTooltip)

    //Légende
    const couleurs = ['lightgray', 'orange']
    const legende = ['Hommes', 'Femmes']

    g.append("text")
        .attr("x", width - 200)
        .attr("y", 50)
        .text('Légende')
        .attr("font-weight", "bold")

    g.append("text")
        .attr("x", width - 200)
        .attr("y", 75)
        .style("fill", "black")
        .text("% de femmes envoyées")
    g.append("text")
        .attr("x", width - 200)
        .attr("y", 95)
        .style("fill", "black")
        .text("dans l'espace")
}

export default page4