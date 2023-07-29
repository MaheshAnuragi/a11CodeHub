// function fetchDataAndUpdateLocalStorage() {
//     fetch('https://script.google.com/macros/s/AKfycbz9qTl2unUsWBS1MuNxh6h-V5eromJVPp6HCxFlVY9CSG-r3WPyAxM5hOl2PeKDR6AO/exec')
//         .then(response => response.json())
//         .then(data => {
//             localStorage.setItem('resourceData', JSON.stringify(data.resources));
//             console.log(data.resources);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }

import { getresourcesBlogData } from './apidata.js';

// Check if the data is already in local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const resource = getresourcesBlogData().resources;
    console.log(resource);
    populateData(resource);
});

function populateData(jsonData) {
    var container = document.getElementsByClassName("container")[0];

    for (var j = 0; j < jsonData.length; j++) {
        var classData = jsonData[j];

        var blog = document.createElement("div");
        blog.className = "blog";

        var heading = document.createElement("div");
        heading.className = "row";

        var headingTitle = document.createElement("div");
        headingTitle.className = "heading-title";

        var icon = document.createElement("i");
        icon.className = "fas fa-angle-double-right";

        var headingText = document.createElement("h2");
        headingText.textContent = classData[0];

        headingTitle.appendChild(icon);
        headingTitle.appendChild(headingText);
        heading.appendChild(headingTitle);
        container.appendChild(heading);
        blog.appendChild(heading);

        var scrollContainer = document.createElement("div");
        scrollContainer.className = "m-4 p-1 shadow-lg custom-row scroll-container";

        for (var i = 1; i < classData.length; i++) {
            var subTopicData = classData[i];

            var subTopicName = subTopicData.Sub_Topic_Name;
            var subTopicLink = subTopicData.Sub_Topic_Link;

            var customRow = document.createElement("div");
            customRow.className = "row m-4 p-3 shadow-lg custom-row";

            var col1 = document.createElement("div");
            col1.className = "col-md-6 d-flex align-items-center";
            col1.style.fontWeight = "bold";
            col1.style.fontSize = "18px";
            col1.textContent = subTopicName;

            var col2 = document.createElement("div");
            col2.className = "col-md-6 d-flex justify-content-center align-items-center";
            col2.style.fontWeight = "bold";
            col2.style.fontSize = "17px";

            var link = document.createElement("a");
            link.href = "https://drive.google.com/uc?export=download&id=" + getDriveFileId(subTopicLink);
            link.className = "download-link";
            link.textContent = "Download";
            link.setAttribute("download", "");

            col2.appendChild(link);

            customRow.appendChild(col1);
            customRow.appendChild(col2);
            customRow.setAttribute('aria-label', 'list' + (i) + subTopicName + " " + 'Download');

            scrollContainer.appendChild(customRow);
        }
        blog.appendChild(scrollContainer);
        container.appendChild(blog);
    }
}

function searchContent(event) {
    var searchTerm = event.target.value.toLowerCase();
    var blogs = document.getElementsByClassName("blog");

    for (var i = 0; i < blogs.length; i++) {
        var blog = blogs[i];
        var blogContent = blog.textContent.toLowerCase();
        var display = blogContent.includes(searchTerm) ? "block" : "none";
        blog.style.display = display;
    }
}


// Rest of the code...

function getDriveFileId(url) {
    var match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : null;
}
