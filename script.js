const api = "https://api.coindesk.com/v1/bpi/currentprice.json";

const price = document.querySelector(".price");


const usdBtn = document.getElementById("usd");
const gbpBtn = document.getElementById("gbp");
const eurBtn = document.getElementById("eur");

// async function to fetch data from api
const getData = async () => {
  let response = await fetch(api);
  let data = await response.json();
  return data;
}

// function to set price based on currency selected
const setPrice = (data, cur) => {
  let num = Number(data.bpi[cur].rate_float).toFixed(2);
  price.innerHTML = `${data.bpi[cur].symbol} ${num}`;
}

// Use setInterval to update data every second
setInterval(() => {

  // call getData function to fetch data from api
  getData()
    .then(data => {

      // Set default currency as USD
      let selectedCur = document.querySelector("input[type=radio][name=currency]:checked").value;
      setPrice(data, selectedCur);

      // when usd is selected, convert price to USD
      usdBtn.onchange = () => {
        setPrice(data, usd.value);
      };

      // when gbp is selected, convert price to GBP
      gbpBtn.onchange = () => {
        setPrice(data, gbp.value);
      };

      // when eur is selected, convert price to EUR
      eurBtn.onchange = () => {
        setPrice(data, eur.value);
      };
    })
    .catch(err => console.log(err.message));
}, 500);


 