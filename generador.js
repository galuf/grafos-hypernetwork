const fs = require('fs')

// http://stackoverflow.com/questions/962802#962890
function shuffle(array) {
  var tmp, current, top = array.length;
  if (top) while (--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}
//////////////////////// Parametros a modificar
const bits_input = 10
const bits_target = 6
const num_train = 70
const nameInputFile = `data-${bits_input}-${bits_target}.csv`
//////////////////////////////////////////
const nameOutputFile = 'SubDataSet'
const dirTotal = `Data-${bits_input}-${bits_target}bits-${num_train}porciento`
fs.readFile(nameInputFile, 'utf8', (err, data) => {
  if (err) console.log('error')
  else {
    const lines = data.split('\n')
    const time = 10
    const subdata1Len = Math.floor(((100-num_train)/100)*lines.length)
    fs.mkdirSync(dirTotal)
    for (let i = 1; i <= time; i++) {
      const linesSuffle = shuffle(lines)
      const nameDir = `${dirTotal}/${nameOutputFile}${i}`
      fs.mkdirSync(nameDir)
      fs.writeFile(`${nameDir}/Test.csv`, [`${subdata1Len} ${bits_input} ${bits_target}`,...linesSuffle.slice(0, subdata1Len)].join('\n'), (err) => {
        if (err) return console.log('error')
        console.log(`${nameDir}/Test.csv completado`)
      })
      fs.writeFile(`${nameDir}/Data.csv`, [`${lines.length - subdata1Len} ${bits_input} ${bits_target}`,...linesSuffle.slice(subdata1Len)].join('\n'), (err) => {
        if (err) return console.log('error')
        console.log(`${nameDir}/Data.csv completado`)
      })
    }
  }
})