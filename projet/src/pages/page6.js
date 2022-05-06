// 5. Apprendre à les connaître
import astroFemmes from '../../assets/Women_Astronauts.csv'

function page6(astronautes, femmes) {
    document.querySelector('h2').innerHTML = "Apprendre à les connaître";
    /* const margin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        },
        width = 1000 - margin.left - margin.right,
        height = 2000 - margin.top - margin.bottom;

    svg(margin, width, height);

    const g = d3.select(".group"); */

    const div = document.querySelector('#viz');
    div.replaceChildren();

    //console.log(astroFemmes);

    function compare(a, b) {
        return a - b;
    }
    astroFemmes.sort()


    const nbrFemmes = femmes.length


    const personneTeplate = document.querySelector('#template-personne');

    astroFemmes.forEach(femme => {
        const newFemme = personneTeplate.content.cloneNode(true);
        newFemme.querySelector('.portrait').src = femme.Portrait;
        newFemme.querySelector('.nom').innerText = femme.Flag + " " + femme.Name;
        //newFemme.querySelector('.drapeau').innerText = femme.Flag;
        newFemme.querySelector('.vols').innerText = "Missions : " + femme.Flights;
        div.append(newFemme);
    });

    /* const x = 100
    const y = 120

    g.selectAll("image")
        .data(
            d3.gridding()
            .size([width, height - 20])
            .mode("grid")(d3.range(nbrFemmes))
        )
        .enter().append("image")
        .attr("width", x)
        .attr("height", y)
        .attr("xlink:href", (d, i) => astroFemmes[i].Portrait)
        .attr("class", (d, i) => astroFemmes[i].Name)
        .attr("transform", function (d) {
            return "translate(" + d.cx + "," + d.cy + ")";
        })

    //Noms
    g.selectAll("text")
        .data(
            d3.gridding()
            .size([width, height - 20])
            .mode("grid")(d3.range(nbrFemmes))
        )
        .enter().append("text")
        .attr("y", y + 20)
        .attr("transform", function (d) {
            return "translate(" + d.cx + "," + d.cy + ")";
        })
        .text((d, i) => astroFemmes[i].Name)
        .attr("font-size", "12px")

    //Pays
    g.selectAll("text2")
        .data(
            d3.gridding()
            .size([width, height - 20])
            .mode("grid")(d3.range(nbrFemmes))
        )
        .enter().append("text")
        .attr("y", y + 40)
        .attr("transform", function (d) {
            return "translate(" + d.cx + "," + d.cy + ")";
        })
        .text((d, i) => astroFemmes[i].Flag)
        .attr("font-size", "20px")
    
    //Vols
    g.selectAll("text3")
        .data(
            d3.gridding()
            .size([width, height - 20])
            .mode("grid")(d3.range(nbrFemmes))
        )
        .enter().append("text")
        .attr("y", y + 60)
        .attr("transform", function (d) {
            return "translate(" + d.cx + "," + d.cy + ")";
        })
        .text((d, i) => astroFemmes[i].Flights)
        .attr("font-size", "10px")

    g.attr("transform", "translate(" + -x / 2 + "," + -y / 2 + ")") */
}

export default page6