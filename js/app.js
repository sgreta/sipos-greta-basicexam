function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.
  console.log(userDatas);
}

var dataUrl = '../json/spaceships.json';

// 1. feladat
getData(dataUrl, sortPrice);
function sortPrice(data) {
  var innerData = JSON.parse(data.responseText);
  for (var i = innerData.length - 1; i > 0; i--) {
    innerData[i].cost_in_credits = parseInt(innerData[i].cost_in_credits);
    for (var j = 0; j < i; j++) {
      innerData[j].cost_in_credits = parseInt(innerData[j].cost_in_credits);
      // console.log(j);
      if (innerData[j].cost_in_credits > parseInt(innerData[j + 1].cost_in_credits)) {
        var temp = [innerData[i], innerData[j]];
        innerData[i] = temp[1];
        innerData[j] = temp[0];
      }
    }
  }
  console.log(innerData);
  return innerData;
}

// 2. feladat
getData(dataUrl, deleteSpaceships);
function deleteSpaceships(del) {
  var ship = JSON.parse(del.responseText);
  for (var i = 0; i < ship.length; i++) {
    if (ship[i].consumables === null) {
      ship.splice(i, 1);
      i--;
    }
  }
  console.log(ship);
  return ship;
}

// 3. feladat
getData(dataUrl, changeNullToUnknown);
function changeNullToUnknown(properties) {
  var toUnknown = JSON.parse(properties.responseText);
  for (var i = 0; i < toUnknown.length; i++) {
    var arr = Object.keys(toUnknown[i]);
    for (var j = 0; j < arr.length; j++) {
      if (toUnknown[i][arr[j]] === null) {
        toUnknown[i][arr[j]] = 'unknown';
      }
    }
  }
  console.log(toUnknown);
  return toUnknown;
}

// 4. feladat
getData(dataUrl, deleteSpaceships, changeNullToUnknown);
function showNewShips(leftovers) {
  var leftovers = deleteSpaceships() + changeNullToUnknown();
  console.log(leftovers);
  return leftovers;
}

// 5. feladat 1)
getData(dataUrl, getCrew);
function getCrew(members) {
  var spaceships = JSON.parse(members.responseText);
  var count = 0;
  for (var i = 0; i < spaceships.length; i++) {
    if (spaceships[i].crew === '1') {
      count++;
    }
  }
  console.log(count);
  return count;
}

// 5. feladat 2)
getData(dataUrl, maxCapacity);
function maxCapacity(maxCap) {
  var spaceships = JSON.parse(maxCap.responseText);
  var max = spaceships[0];
  for (var i = 1; i < spaceships.length; i++) {
    if (parseInt(max.cargo_capacity) < parseInt(spaceships[i].cargo_capacity)) {
      max = spaceships[i];
    }
  }
  console.log(max.model);
  return max.model;
}

// 5. feladat 3)
getData(dataUrl, sumPassengers);
function sumPassengers(num) {
  var pass = JSON.parse(num.responseText);
  var count = 0;
  for (var i = 0; i < pass.length; i++) {
    if (pass[i].passengers === null) {
      pass[i].passengers = 0;
    } else {
      count += parseInt(pass[i].passengers);
    }
  }
  console.log(count);
  return count;
}

// 5. feladat 4)
getData(dataUrl, getLongestShip);
function getLongestShip(longest) {
  var spaceship = JSON.parse(longest.responseText);
  var max = spaceship[0];
  for (var i = 1; i < spaceship.length; i++) {
    if (parseInt(max.lengthiness) < parseInt(spaceship[i].lengthiness)) {
      max = spaceship[i];
    }
  }
  console.log(max.image);
  return max.image;
}

// 6. feladat
getData(dataUrl, searchShip);
function searchShip(_model_) {
  var searching = JSON.parse(_model_.responseText);
  var foundModel = document.querySelector('#search-text').value;
  for (var k in searching) {
    if (searching[k].model.indexOf(`${foundModel}`) > -1) {
      var type;
      type = searching[k];
    }
  }
  console.log(type);
  return searching;
}

