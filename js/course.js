// course.js
import { getAPIData } from './apiData.js';

document.addEventListener('DOMContentLoaded', function () {
    const apiData = getAPIData();
    if (apiData) {
        console.log(apiData);
        var coursesList = document.querySelector('.navbar .btn-group');
        for (var sheetName2 in apiData.data) {
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'btn btn-outline-primary ml-2 mr-2 mt-2 mb-0 rounded-pill content';
            button.textContent = sheetName2;
            button.setAttribute('data-sheet-name', sheetName2);
            button.style.borderRadius = '8px';

            button.addEventListener('click', function (event) {
                var clickedSheetName = event.target.getAttribute('data-sheet-name');
                processCoursedata(apiData, clickedSheetName);
            });

            coursesList.appendChild(button);
        }

        var urlParams = new URLSearchParams(window.location.search);
        var sheetName = urlParams.get('sheet');

        processCoursedata(apiData, sheetName);
    } else {
        console.log('Error:', error);
    }
});


function processCoursedata(data, sheetName) {
    var currentRow = 0;

    if (sheetName) {
        var title = document.querySelector('.courseName');
        var h1 = document.createElement('h1');
        h1.textContent = sheetName;
        title.innerHTML = '';
        title.appendChild(h1);
    }

    // Use the sheet name as needed
    console.log('Sheet name:', sheetName);
    // Process the API data as needed
    var pythonData = data.data[sheetName];

    var chaptersTable = document.getElementById('chaptersTable');
    var tableBody = chaptersTable.querySelector('tbody');
    var contentframe = document.getElementById('iframeDiv');
    contentframe.innerHTML = '';
    tableBody.innerHTML = '';

    for (var i = 0; i < pythonData.length; i++) {
        var item = pythonData[i];
        var row = document.createElement('tr');
        row.className = "row m-3 p-2 shadow-lg custom-row";

        var chapterCell = document.createElement('td');
        chapterCell.textContent = item.Chapters;

        chapterCell.setAttribute('data-video-src', item.Videos);
        chapterCell.setAttribute('data-content-src', item.Content);

        row.appendChild(chapterCell);

        tableBody.appendChild(row);
    }

    var tableRows = chaptersTable.querySelectorAll('tbody tr td');
    var videoContainer = document.getElementById('videoContainer');

    videoContainer.innerHTML = '';

    var nextButton = document.querySelector('.btn-success.next');
    var previousButton = document.querySelector('.btn-success.previous');

    // Event listener for the "Next" button
    nextButton.addEventListener('click', function () {
        currentRow = Math.min(currentRow + 1, tableRows.length - 1);
        updateVideoContent();
    });

    // Event listener for the "Previous" button
    previousButton.addEventListener('click', function () {
        currentRow = Math.max(currentRow - 1, 0);
        updateVideoContent();
    });

    // Event listener for the table row click
    for (var i = 0; i < tableRows.length; i++) {
        tableRows[i].addEventListener('click', function () {
            currentRow = Array.from(tableRows).indexOf(this);
            updateVideoContent();
        });
        tableRows[i].style.cursor = 'pointer';
    }

    // Function to update the video content based on the current row
    function updateVideoContent() {
        for (var j = 0; j < tableRows.length; j++) {
            tableRows[j].parentElement.classList.remove('active-row');
        }
        tableRows[currentRow].parentElement.classList.add('active-row');

        // Scroll to the active row
        tableRows[currentRow].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        });

        var videoSrc = tableRows[currentRow].getAttribute('data-video-src');
        var videoId = getVideoIdFromLink(videoSrc);
        var videoEmbedUrl = "https://www.youtube.com/embed/" + videoId;

        var iframe = document.createElement('iframe');
        iframe.src = videoEmbedUrl;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameborder = '0';
        iframe.allow =
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowfullscreen = true;
        iframe.preload = 'auto';
        iframe.loading = 'eager';

        videoContainer.innerHTML = '';
        videoContainer.appendChild(iframe);


        var contentSrc = tableRows[currentRow].getAttribute('data-content-src');
        var contentId = getContentFromLink(contentSrc);
        var iframe = document.createElement('iframe');

        contentframe.innerHTML = '';
        if (contentId) {
            var iframe = document.createElement('iframe');
            iframe.src = contentId;
            iframe.width = '100%';
            iframe.height = '500px';
            contentframe.appendChild(iframe);
        } else {
            // Display the "Content Not Available" message
            var messageDiv = document.createElement('div');
            messageDiv.className ='empty';
            messageDiv.textContent = 'Content Coming Soon...';
            contentframe.appendChild(messageDiv);
        }
        // contentframe.appendChild(iframe);
    }

    // Display the first video by default
    updateVideoContent();

}

function getVideoIdFromLink(videoLink) {
    var regex = /\/([^/]+)\/?$/;
    var match = videoLink.match(regex);
    return match ? match[1] : "";
}

function getContentFromLink(content) {
    // var content = '<iframe src="https://docs.google.com/document/d/e/2PACX-1vSQZG3uReJj-mNcmfJLi1FO11vmJp-zUYwVw8FeU_1qYdrw27ZSRy7dmNtRMNtWq1AKw3idYUCzNkNh/pub?embedded=true"></iframe>';

    // Regular expression to match the entire iframe tag
    var iframeRegex = /<iframe.*?>.*?<\/iframe>/;

    // Extract the iframe tag using the regular expression
    var iframeTag = content.match(iframeRegex);

    // Check if the iframe tag is found
    if (iframeTag) {
        // Regular expression to extract the URL within the src attribute of the iframe tag
        var urlRegex = /src="(.*?)"/;

        // Extract the URL using the regular expression
        var match = iframeTag[0].match(urlRegex);

        // The extracted URL will be in the second element of the match array
        var extractedURL = match ? match[1] : null;

        // console.log(extractedURL); // Output: "https://docs.google.com/document/d/e/2PACX-1vSQZG3uReJj-mNcmfJLi1FO11vmJp-zUYwVw8FeU_1qYdrw27ZSRy7dmNtRMNtWq1AKw3idYUCzNkNh/pub?embedded=true"
        return extractedURL;
    }
    return "";
}
