// allCourses.js
import { getAPIData } from './apidata.js';

document.addEventListener('DOMContentLoaded', function () {
  const apiData = getAPIData();

  if (apiData) {
    console.log(apiData);
    processCoursedata(apiData);
  } else {
    console.log('API data not available');
    // Handle the case when API data is not available
  }
});

function processCoursedata(data) {
  // Process the API data as needed


  var container = document.querySelector('.container');
  var row = document.querySelector('.row.justify-content-md-center');

  for (var sheetName in data.data) {
    // console.log(data.data[sheetName][0].Course_Image);
    var column = document.createElement('div');
    column.className = 'p-4 col-md-auto d-flex justify-content-center align-items-center';

    var box = document.createElement('div');
    box.className = 'box';

    var cornerText = document.createElement('p');
    cornerText.className = 'corner-text';
    cornerText.textContent = sheetName;
    box.appendChild(cornerText);

    var boxImg = document.createElement('div');
    boxImg.className = 'box-img';

    var img = document.createElement('img');
    img.className = 'img-fluid';
    // img.src = 'img/' + sheetName.toLowerCase() + '.jpg'; // Assuming the image name follows the sheetName format
    img.src = data.data[sheetName][0].Course_Image;
    img.alt = sheetName;
    boxImg.appendChild(img);

    box.appendChild(boxImg);

    var startWatching = document.createElement('p');
    startWatching.className = 'start-watching';
    startWatching.textContent = 'Start Watching';
    startWatching.addEventListener('click', function () {
      var clickedSheetName = this.parentNode.querySelector('.corner-text').textContent;
      var url = 'course.html?sheet=' + encodeURIComponent(clickedSheetName);
      window.location.href = url;
    });

    // Add cursor pointer style
    startWatching.style.cursor = 'pointer';
    
    box.appendChild(startWatching);

    column.appendChild(box);
    row.appendChild(column);
  }

  container.appendChild(row);
}