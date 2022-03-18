import * as d3 from 'd3';
import file from '../assets/International_Astronaut_Database.csv'

console.log(file);

const noms = file.map((d,i) => {
    return d.Name;
})

console.log(noms);
