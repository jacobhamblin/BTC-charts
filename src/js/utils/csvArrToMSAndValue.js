function csvArrToMSAndValue(arr) {
  let data = arr.slice(1, arr.length - 1)
  let aggregate = []
  data.map(dateAndValue => {
    let dateAndTime = dateAndValue[0].split(' ')
    let dateArr = dateAndTime[0].split('-').map(d => parseInt(d))
    let hms = dateAndTime[1].split(':')
    let row = []
    let hourDifLocal = (new Date().getTimezoneOffset() / 60)
    row.push(Date.UTC(
      dateArr[0], dateArr[1] - 1, dateArr[2],
      hms[0] - hourDifLocal, hms[1], hms[2]
    ))
    row.push(parseFloat(dateAndValue[1]))
    aggregate.push(row)
  })

  return aggregate
}

export default csvArrToMSAndValue
