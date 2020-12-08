const burger = document.querySelector('.navbar-burger');

const drugs = document.querySelector('.druglist');
const alphabetNav = document.querySelector('.alphabet-nav');

let searchBar = document.getElementById('search-bar');
let clearIcon = document.querySelector('.delete-btn');
let searchButton = document.querySelector('.search-btn');

let resultList = document.querySelector('.results-list');

function toggleNav() {
  const target = document.querySelector('#nav-menu')

  target.classList.toggle('is-active');
  burger.classList.toggle('is-active');
}

function addListener() {
  for (let i = 0; i < drugs.children.length; i++) {
    const drugitem = drugs.children[i];
    drugitem.classList.add('is-clickable')
    drugitem.addEventListener('click', snapShot);
  }
}

function makeClickable(params) {
  for (let i = 0; i < params.children.length; i++) {
    const alphabet = params.children[i];
    alphabet.classList.add('is-clickable');
  }
}

burger.addEventListener('click', toggleNav);
document.addEventListener('DOMContentLoaded', addListener);
document.addEventListener('DOMContentLoaded', makeClickable(alphabetNav));
searchBar.addEventListener('keyup', keySearch);
clearIcon.addEventListener('click', clearForm);
searchButton.addEventListener('click', keySearch)

function snapShot(clickEvent) {
  let clickedMed = getClickedMed(clickEvent);

  getData(clickedMed);
}

function getClickedMed(clickEvent) {
  let clickedMed = clickEvent.target.textContent.toLowerCase();
  return clickedMed;
}

function getData(clickedMed) {
  fetch('/js/dev-js/posts.json')
    .then((response) => response.json())
    .then((data) => {
      data.forEach(element => {
        let drug = element.drugName;
        let pharm1 = element.pharm1;
        let pharm2 = element.pharm2;

        if (clickedMed === drug) {
          console.log(`${drug} is in database`);
          repaint(drug, pharm1, pharm2);
        }

      })
})
}

function repaint(drug,pharm1,pharm2) {
  let heroText = document.querySelector('.hero-text');
  let homeAlphabetNav = document.querySelector('.home-nav');
  let medSpace = document.querySelector('.med');

  homeAlphabetNav.remove();

  let newHeroText = `<div class="content has-text-centered is-size-3  mb-5 has-text-weight-bold alphabet-nav">
  <span>A</span>
  <span>B</span>
  <span>C</span>
  <span>D</span>
  <span>E</span>
  <span>F</span>
  <span>G</span>
  <span>H</span>
  <span>I</span>
  <span>J</span>
  <span>K</span>
  <span>L</span>
  <span>M</span>
  <span>N</span>
  <span>O</span>
  <span>P</span>
  <span>Q</span>
  <span>R</span>
  <span>S</span>
  <span>T</span>
  <span>U</span>
  <span>V</span>
  <span>W</span>
  <span>X</span>
  <span>Y</span>
  <span>Z</span>
</div>
</div>`

  let medication = `
    <p class="is-size-4 is-size-3-tablet has-text-centered">
      <span class="has-text-weight-semibold is-capitalized">${drug}</span>   
    </p>`

  heroText.innerHTML = newHeroText;
  const alphabetNav = document.querySelector('.alphabet-nav');
  document.addEventListener('DOMContentLoaded', makeClickable(alphabetNav));
 
  let container = document.createElement('div');
  container.classList.add('container','content');
  container.innerHTML = medication;
  medSpace.appendChild(container);

  let newContent = `
      <p class="is-size-6-mobile is-size-5 has-text-weight-bold">How it works</h2>

      <p>${pharm1}</p>

      <p>${pharm2}</p>`;
  
  drugs.classList.remove('is-capitalized');
  drugs.innerHTML = newContent;

  let searchBar = document.getElementById('search-bar');
  searchBar.addEventListener('keyup', keySearch);
}

function keySearch() {
  resultList.innerHTML = '';

  let value = searchBar.value;
  let keybank = [];

  fetch('/js/dev-js/posts.json')
    .then((response) => response.json())
    .then((data) => {
      
      const options = {
        keys: ['drugName'],
        includeMatches: true,
        minMatchCharLength: 3
      };

      search(data, options);
    })
  
  function search(data, options) {
    const fuse = new Fuse(data, options);
    
    const result = fuse.search(value);
          
    result.map(x => {
      let searchResults = x.item.drugName;
      keybank.push(searchResults);
      return keybank;        
    })

    paint(keybank)
  }
}

function paint(keybank) {
  keybank.forEach(element => {
    let rRow = document.createElement('p');
    rRow.classList.add('is-clickable','rRow');
    rRow.innerHTML = element;
    rRow.style.marginBottom = '10px';
    rRow.style.borderBottom = 'solid';
    rRow.style.borderWidth = 'thin';
    resultList.appendChild(rRow);
    rRow.addEventListener('click', snapShot);
  });
}

function clearForm() {
  searchBar.value = '';
  resultList.innerHTML = '';
}