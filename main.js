/* 
1. Fetcha länderna/valutorna och lägg in det i en select (https://api.vatcomply.com/currencies)
2. Fetcha exchange raten (https://api.vatcomply.com/rates)
3. När man väljer landet så ska exchange raten visas
4. Fetcha historisk data. När man skriver in datum i en input-field så ska information om valutorna visas
(https://api.vatcomply.com/rates?date=)
*/

let currency = document.getElementById('currency');
let listItem = document.querySelector('ul');
let submit = document.getElementById('button');
let listItem2 = document.getElementById('historicrate');

let selectYear = document.getElementById('year');
let selectMonth = document.getElementById('month');
let selectDay = document.getElementById('day');

async function fetchEssentials() {
    try {
        let response = await fetch('https://api.vatcomply.com/currencies')
        let data = await response.json();

for(let short in data){
    var currencyName = data[short].name
    currency.innerHTML +=
    '<option value=' + short + '>' + currencyName + '</option>'
    '<div id="jaja" value=' + data[short].name + '></div>'
}



for (let startYear = 2020; startYear > 1920; startYear--) {
    selectYear.innerHTML +=
    '<option>' + startYear + '</option>'

  }
  for (let startMonth = 01; startMonth <= 12; startMonth++) {
    selectMonth.innerHTML +=
    '<option>' + startMonth + '</option>'
  }

  for (let startDay = 31; startDay >= 1; startDay--) {
    selectDay.innerHTML +=
    '<option>' + startDay + '</option>'

  }

    } catch (e) {
    }
}
fetchEssentials()

currency.addEventListener('change', fetchRates)
async function fetchRates(){

    try {
        let response1 = await fetch('https://api.vatcomply.com/rates?base=' + currency.value)
        let data1 = await response1.json();
        var ratings = data1.rates

            for(let rate in ratings){
                var completeRatings = ratings[rate]
                listItem.innerHTML +=
                    '<li>' + rate +
                    '&nbsp' +
                    completeRatings + '</li>'
            }
        } catch(e) {
            console.log(e)
    }}

    submit.addEventListener('click', fetchDate)

    async function fetchDate(){
        let yValue = selectYear.value + '-';
        let mValue = selectMonth.value + '-';
        let dValue = selectDay.value
        let response2 = await fetch('https://api.vatcomply.com/rates?date=' + yValue + mValue + dValue)
        let data2 = await response2.json();

        var historicalRates = data2.rates;

        for(let historicalRate in historicalRates){
            let hisRates = historicalRates[historicalRate];

            listItem2.innerHTML +=

            '<li>' + historicalRate +
            '&nbsp' +
            hisRates + '</li>' 
        }
    }