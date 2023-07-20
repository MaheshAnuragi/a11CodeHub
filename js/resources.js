
// Check if the script has been updated
function isScriptUpdated(serverTimestamp) {
    const localTimestamp = localStorage.getItem('scriptTimestamp');
    return Number(localTimestamp) !== Number(serverTimestamp);
}


fetch('https://script.google.com/macros/s/AKfycbz9qTl2unUsWBS1MuNxh6h-V5eromJVPp6HCxFlVY9CSG-r3WPyAxM5hOl2PeKDR6AO/exec')
    .then(response => response.json())
    .then(data => {
        console.log(data.resources);

        // Check if the script has been updated
        if (isScriptUpdated(data.timestamp)) {
            // Script has been updated, update the local session
            populateData(data.resources);
            localStorage.setItem('scriptTimestamp', data.timestamp);
            localStorage.setItem('resourcesData', JSON.stringify(data.resources));
        } else {
            // Script has not been updated, use the data from the local session
            const resourcesData = localStorage.getItem('resourcesData');
            if (resourcesData) {
                console.log(resourcesData);
                const resources = JSON.parse(resourcesData);
                populateData(resources);
            }
        }

        // ... Your code to handle the data goes here
    })
    .catch(error => {
        console.error('Error:', error);
    });

function populateData(jsonData) {
    var container = document.getElementsByClassName("container")[0];

    for (var j = 0; j < jsonData.length; j++) {
        var classData = jsonData[j];

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

            scrollContainer.appendChild(customRow);
        }

        container.appendChild(scrollContainer);
    }
}

// Rest of the code...

function getDriveFileId(url) {
    var match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : null;
}
