// 3. Moyennes
import svg from './svg.js'

function page4(astronautes, femmes, hommes) {
    document.querySelector('h2').innerHTML = "À travers les années";
    const margin = {
            top: 25,
            right: 25,
            bottom: 25,
            left: 25
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
    /* console.log(yearsFlights);
    console.log(yearsFemmes);
    console.log(yearsHommes); */

    const yearsAll = Object.keys(yearsCount);
    //console.log(yearsAll);

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

    g.append('g')
        .call(d3.axisLeft(y))

    //Données
    /* g.selectAll("rect")
        .data(yearsPourcentFemmes)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.year))
        .attr("y", (d) => y(100))
        .attr("width", 7)
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
}

export default page4