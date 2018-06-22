
function getJson (url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      callback(xhr.response);
    }
  }
  xhr.send();
}
getJson("https://sheets.googleapis.com/v4/spreadsheets/1ia0LY4uPcuykG2bCx-UABblSO8XpquZGEHoggMJz52A/values/YB!A2:G10?key=AIzaSyCNfqumw4j2MuN5yr5jBiFC9ZhF3Gv0-p8", function(data) {

  let val   = data.values;
  let elem  = document.querySelector('#offer');
  let createDomElem = '';
  val.forEach((item, i) => {
    // console.log(item);
    createDomElem += `
    <div class="offer-box" style="background-image: url(${item["0"]})">
      <div class="of-label">ALE</div>
      <span class="of-price">${item["2"]}<sup>€</sup></span>
      <span class="of-offer">${item["1"]}<sup>€</sup></span>
      <span class="of-new-item">${item["4"]}</span>
      <h5>${item["3"]}</h5>
      <p>${item["5"]}</p>
    </div>`
  });
  elem.innerHTML = createDomElem;

    // Show or hide offer novelty
  let novelty = document.querySelectorAll('.of-new-item');
  for (let j = 0; j < novelty.length; j++) {
    if (novelty[j].textContent == "0") {
      novelty[j].style.visibility = 'hidden';
    } else if (novelty[j].textContent == "1") {
      novelty[j].textContent = "uutus";
    }
  }

    // Show or hide offer description
  let txt = document.querySelectorAll('.offer-box p');
  for (let j = 0; j < txt.length; j++) {
    if (txt[j].textContent == "undefined") {
      txt[j].remove();
    }
  }
});
