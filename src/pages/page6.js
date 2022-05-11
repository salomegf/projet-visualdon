// 5. Apprendre à les connaître
import astroFemmes from '../../assets/Women_Astronauts.csv'

function page6(astronautes, femmes) {
    document.querySelector('h2').innerHTML = "Apprendre à les connaître";

    const div = document.querySelector('#viz');
    div.replaceChildren();

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
}

export default page6