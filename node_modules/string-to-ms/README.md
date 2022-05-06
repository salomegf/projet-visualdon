# String To Milliseconds
Module that converts the string into milliseconds. Understands following macross:

| Time | Macros | Example |
| ------ | :------: | :------: |
| week | w | `7w` |
| day | d | `31d` |
| hour | h | `24h` |
| minute | m | `60m` |
| second | s | `60s` |

Number without macros would be interpreted as milliseconds.


## Installation
```bash
npm install string-to-ms
```


## Usage
```javascript
const stringToMs = require('string-to-ms');

// return 1814400000
stringToMs('  3w  ');

// return 43200000
stringToMs('0.5d');

// return 43200000
stringToMs('12h');

// return 600
stringToMs(600);

// return 1371600000
stringToMs('1d 4d 10d 20h 1h');

// return 202147207000
stringToMs('2335d  0112h 12112dsds 7s');
```

## Changelog 
#### 2017-12-17:
- Now works in browser too
