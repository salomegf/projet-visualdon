import svg from './pages/svg.js'
import page1 from './pages/page1.js'
import page2 from './pages/page2.js'
import page3 from './pages/page3.js'
import page4 from './pages/page4.js'
import page5 from './pages/page5.js'

import astronautes from '../assets/International_Astronaut_Database.csv'

//console.log(astronautes);

const femmes = astronautes.filter((d, i) => {
    return d.Gender == "Woman"
})

const hommes = astronautes.filter((d, i) => {
    return d.Gender == "Man"
})

//svg();
//page1(astronautes);
//page2(astronautes, femmes, hommes);
//page3(astronautes, femmes, hommes);
page4(astronautes, femmes, hommes);
//page5(astronautes, femmes, hommes);