'use strict';

const searchWrapper = document.querySelector('.search-input');
const inputBox = document.querySelector('input');
const suggBox = document.querySelector('.autocom-box');

///////////////////////////////////////
const request = new XMLHttpRequest();

request.open('GET', 'https://restcountries.com/v3.1/all');
request.send();

request.addEventListener('load', function () {
  // converting json string into an array
  const data = JSON.parse(this.responseText);
  const arr = [];
  for (var i in data) arr.push(data[i]);

  const arr2 = [];
  for (let i = 0; i < arr.length; i++) {
    arr2.push(arr[i]);
  }
  const arr3 = [];
  for (let j = 0; j < arr.length; j++) {
    arr3.push(arr[j]);
  }
  const arrLast = [];
  for (let a = 0; a < arr.length; a++) {
    arrLast.push(arr3[a].name.common);
  }

  // Suggestion List
  function showSuggestions(list) {
    let listData;
    if (!list.length) {
      const userValue = inputBox.value;
      listData = '<li>' + userValue + '</li>';
    } else {
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
  }
  // if user presses any key releases
  inputBox.onkeyup = e => {
    let userData = e.target.value; //user entered data
    let emptyArray = [];
    if (userData) {
      emptyArray = arrLast.filter(data2 => {
        // filtering array value and returns only those words/sentences which starts with user entered word.
        return data2
          .toLocaleLowerCase()
          .startsWith(userData.toLocaleLowerCase());
      });

      emptyArray = emptyArray.map(data2 => {
        return (data2 = '<li class="listSuggestion">' + data2 + '</li>');
      });
      searchWrapper.classList.add('active');
    } else {
      searchWrapper.classList.remove('active');
    }
    showSuggestions(emptyArray);

    const listSuggestion = document.querySelectorAll('.listSuggestion');
    for (let i = 0; i < listSuggestion.length; i++) {
      listSuggestion[i].addEventListener('click', function () {
        const listItem = listSuggestion[i].textContent;
        inputBox.value = listItem;
        searchWrapper.classList.remove('active');
        console.log(`${listItem}`);
      });
    }
  };
});
