import "./style.css"
import svg from './pages/svg.js'
import page1 from './pages/page1.js'
import page2 from './pages/page2.js'
import page3 from './pages/page3.js'
import page4 from './pages/page4.js'
import page5 from './pages/page5.js'
import page6 from './pages/page6.js'

import astronautes from '../assets/International_Astronaut_Database.csv'

//console.log(astronautes);

const femmes = astronautes.filter((d, i) => {
    return d.Gender == "Woman"
})

const hommes = astronautes.filter((d, i) => {
    return d.Gender == "Man"
})

const nbPages = 6;
let currentPage = 4;

function prev() {
    if (currentPage == 1) {
        currentPage = nbPages;
    } else {
        currentPage --
    }
    displayPage(currentPage)
}

function next() {
    if (currentPage == nbPages) {
        currentPage = 1;
    } else {
        currentPage ++
    }
    displayPage(currentPage)
}

function displayPage(currentPage) {
    if (currentPage == 1) {
        page1(astronautes);
    }
    if (currentPage == 2) {
        page2(astronautes, femmes, hommes)
    }
    if (currentPage == 3) {
        page3(astronautes, femmes, hommes)
    }
    if (currentPage == 4) {
        page4(astronautes, femmes, hommes)
    }
    if (currentPage == 5) {
        page5(astronautes, femmes, hommes)
    }
    if (currentPage == 6) {
        page6(astronautes, femmes)
    }
}

displayPage(currentPage);

document.querySelector('#previous').addEventListener("click", prev);
document.querySelector('#next').addEventListener("click", next);