
// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2509-PT-Oshko-party";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === State ===
let party = [];
let partyDetail;
async function getEvent(){
    try {
      const data = await fetch(API);
      const result = await data.json();
      party = result.data;
      console.log(party);
    } catch (error) {
        console.error(error)   
    }

}

function partyName(party){
    const $parties = document.createElement('li');
    $parties.innerHTML = `
        <a href="#selected">${party.name}</a>
    `;

    $parties.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (event) => {
            document.querySelectorAll('a').forEach(l => l.classList.remove('active'));
            event.target.classList.add('active');
        });

});

    return $parties;
}
function upComingParties(){
    const $partLists = document.createElement('section');
    $partLists.innerHTML = `
    <h2>Upcoming Parties</h2>
    <ul></ul>
    `;
    const $parties = party.map(partyName);
    const $ul = $partLists.querySelector("ul");
    $ul.append(...$parties);
    return $partLists;
};


function partyInfo(details){
    const $partyInfo = document.createElement('article');
    $partyInfo.innerHTML = `
    <h3>${details.name}</h3>
    <p>${details.date}</p>
    <p>${details.description}</p>
    `;

    return $partyInfo;
};


function partyDetails(){
const $partyDetails = document.createElement("section");
$partyDetails.innerHTML = `
<h2>Party Details</h2>
<partyDetail></partyDetail>
`;
const $addPartyDetails = $partyDetails.querySelector('partyDetail');
const $partyDetailsData = party.map(partyInfo);
$partyDetails.replaceChildren(...$partyDetailsData);

return $partyDetails;
}

function render () {
    const $app = document.querySelector("#app");
    $app.innerHTML = `
        <h1>Party Planner</h1>
        <section id="content">
        <upComingParties></upComingParties>
        <partyDetails></partyDetails>
        </section>
        
    `;

    $app.querySelector('upComingParties').replaceWith(upComingParties());
    $app.querySelector('partyDetails').replaceWith(partyDetails());
}

async function init() {
  await getEvent();
  render();
}

init();