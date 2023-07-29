import { fetchAPIData } from './api.js';
import { setAPIData } from './apidata.js';
import { resourcesBlogData } from './api.js';
import { setresourcesBlogData } from './apidata.js';

document.addEventListener('DOMContentLoaded', function () {

    fetchAPIData()
        .then(function (data) {
            setAPIData(data);
            console.log('API data fetched:', data);
        })
        .catch(function (error) {
            console.log('API Error:', error);
        });

    resourcesBlogData()
        .then(function (data2) {
            setresourcesBlogData(data2);
            console.log('resourceBlog data fetched:', data2);
        })
        .catch(function (error2) {
            console.log('resourceBlog Error:', error2);
        });

});
