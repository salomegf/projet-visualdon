// 3. Moyennes
import svg from './svg.js'

function page4(astronautes, femmes, hommes) {
    const margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        },
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    svg(margin, width, height);

    const g = d3.select(".group");

    const x = d3.scaleTime()
        .domain([new Date("1961"), new Date("2021")])
        .nice() //met les dates tout joli
        .range([0, width])

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

    //const yearsFlights = []
    /* astronautes.forEach(astronaute => {
        const test1 = astronautes[0].Flights
        const year = test1.split(/[()]/);
        console.log(year);
    }); */
    function years(array) {
        const yearsFlights = array.map((d, i) => {
            const yearsStr = d.Flights.split(/[()]/);

            const years = []
            for (let j = 1; j <= yearsStr.length; j += 2) {
                years.push(yearsStr[j]);
            }
            years.pop();

            return years;
        })
        return yearsFlights
    }

    const yearsFlights = years(astronautes);
    const yearsFemmes = years(femmes);
    const yearsHommes = years(hommes);
    console.log(yearsFlights);
    console.log(yearsFemmes);
    console.log(yearsHommes);

    function countYears(array) {
        const yearsAll = array.map((d, i) => {
            const years = d.map((e, i) => {
                return e
            })
            return years
        });
        //console.log(years);
    };

    /* const paysCount = {};
    for (const p of pays) {
        if (paysCount[p]) {
            paysCount[p] += 1;
        } else {
            paysCount[p] = 1;
        }
    }
    return paysCount; */

    const test = countYears(yearsFlights);
    console.log(test);
    




}



export default page4