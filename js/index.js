// index.js
// import { fetchAPIData } from './api.js';

// let apiDataPromise = fetchAPIData();

// document.addEventListener('DOMContentLoaded', function () {
//     apiDataPromise
//         .then(function (data) {
//             // Use the API data as needed in index.js
//             console.log('API data in index.js:', data);
//         })
//         .catch(function (error) {
//             console.log('Error:', error);
//         });
// });

// export { apiDataPromise };

// import { fetchAPIData } from './api.js';

// let apiDataPromise = null;
// console.log(apiDataPromise);
// function getAPIData() {
//     if (!apiDataPromise) {
//         apiDataPromise = fetchAPIData();
//     }
//     return apiDataPromise;
// }

// export { getAPIData };

import { fetchAPIData } from './api.js';
import { setAPIData } from './apiData.js';

document.addEventListener('DOMContentLoaded', function () {
    const storedData = null;

    if (storedData) {
        console.log('API data from storage:', storedData);
    } else {
        fetchAPIData()
            .then(function (data) {
                setAPIData(data);
                console.log('API data fetched:', data);
            })
            .catch(function (error) {
                console.log('Error:', error);
            });
    }
});
