// function fetchDataAndUpdateLocalStorage() {
//     console.log('fetch');
//     fetch('https://script.google.com/macros/s/AKfycbz9qTl2unUsWBS1MuNxh6h-V5eromJVPp6HCxFlVY9CSG-r3WPyAxM5hOl2PeKDR6AO/exec')
//         .then(response => response.json())
//         .then(data => {
//             localStorage.setItem('blogData', JSON.stringify(data.blog));
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }

import { getresourcesBlogData } from './apidata.js';

document.addEventListener('DOMContentLoaded', () => {
    const blog = getresourcesBlogData().blog;
    console.log(blog);
    populateData(blog);
});



function populateData(jsonData) {
    var container = document.getElementsByClassName("container")[0];
    // Store all the article containers in an array for easy access
    var articleContainers = [];

    for (var j = 0; j < jsonData.length; j++) {
        var categoryData = jsonData[j];

        var blog = document.createElement("div");
        blog.className = "blog";

        var heading = document.createElement("div");
        heading.className = "row";

        var headingTitle = document.createElement("div");
        headingTitle.className = "heading-title";

        var icon = document.createElement("i");
        icon.className = "fas fa-angle-double-right";

        var headingText = document.createElement("h3");
        headingText.textContent = categoryData[0];

        headingTitle.appendChild(icon);
        headingTitle.appendChild(headingText);
        heading.appendChild(headingTitle);
        blog.appendChild(heading);

        articleContainers.push(heading);

        for (var i = 1; i < categoryData.length; i++) {
            var articleData = categoryData[i];

            var articleContainer = document.createElement("div");
            articleContainer.className = "m-4 p-1 shadow-lg custom-row";

            var articleH4 = document.createElement("div");
            articleH4.className = "row m-4 p-2 shadow-lg custom-row d-flex justify-content-center";

            var articleTitle = document.createElement("h4");
            articleTitle.textContent = articleData.Article_Name;

            var articleRow = document.createElement("div");
            articleRow.className = "row m-4 p-4 shadow-lg custom-row";


            var articleContent = document.createElement("div");
            articleContent.className = "d-flex align-items-center justify-content-md-start col-md-6";
            articleContent.style.fontWeight = "bold";
            articleContent.style.fontSize = "16px";
            articleContent.innerHTML = "<p>" + articleData.Article_Content + "</p>";

            var articleVideo = document.createElement("div");
            articleVideo.className = "d-flex justify-content-md-center align-items-center col-md-6";

            var videoId = getVideoIdFromLink(articleData.Video_Link);
            var videoEmbedUrl = "https://www.youtube.com/embed/" + videoId;

            var videoIframe = document.createElement("iframe");
            videoIframe.width = "100%";
            videoIframe.height = "280";
            videoIframe.src = videoEmbedUrl;
            videoIframe.title = "YouTube video player";
            videoIframe.frameBorder = "0";
            videoIframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            videoIframe.allowFullscreen = true;

            articleVideo.appendChild(videoIframe);

            articleH4.appendChild(articleTitle);
            articleRow.appendChild(articleContent);
            articleRow.appendChild(articleVideo);

            articleContainer.append(articleH4);
            articleContainer.appendChild(articleRow);
            blog.appendChild(articleContainer);

            // Add the article container to the array
            articleContainers.push(articleContainer);
        }
        container.append(blog);
    }
}


// js file
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
function getVideoIdFromLink(videoLink) {
    var regex = /\/([^/]+)\/?$/;
    var match = videoLink.match(regex);
    return match ? match[1] : "";
}

