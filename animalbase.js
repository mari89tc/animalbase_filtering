"use strict";

window.addEventListener("DOMContentLoaded", start);

const allAnimals = [];

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("animals.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    // TODO: Create new object with cleaned data - and store that in the allAnimals array
    const animal = {};
    animal.fullList = jsonObject.fullname;
    animal.name = jsonObject.fullname.substring(0, jsonObject.fullname.indexOf(" "));
    animal.type = jsonObject.fullname.substring(jsonObject.fullname.lastIndexOf(" ") + 1, jsonObject.fullname.lastIndexOf(""));
    animal.desc = jsonObject.fullname.substring(jsonObject.fullname.indexOf(" ") + 5, jsonObject.fullname.lastIndexOf(" "));
    animal.age = jsonObject.age;
    allAnimals.push(animal);
    // TODO: MISSING CODE HERE !!!
  });
  displayList(allAnimals);
}

function displayList(animalDisplay) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";
  // build a new list
  animalDisplay.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", showWhenClick);
});

function showWhenClick(event) {
  console.log(event.target.dataset.filter);
  const filter = event.target.dataset.filter;
  if (filter === "cat") {
    displayList(allAnimals.filter(onlyCats));
    console.log(allAnimals.filter(onlyCats));
  } else if (filter === "dog") {
    displayList(allAnimals.filter(onlyDogs));
  } else if (filter === "*") {
    displayList(allAnimals.filter(allAni));
  }
}
function onlyCats(animalType) {
  if (animalType.type === "cat") {
    return true;
  } else {
    return false;
  }
}
function onlyDogs(animalType) {
  if (animalType.type === "dog") {
    return true;
  } else {
    return false;
  }
}
function allAni(animalType) {
  if (animalType.type) {
    return true;
  } else {
    return false;
  }
}
