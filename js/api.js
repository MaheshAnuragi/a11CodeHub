// api.js
export function fetchAPIData() {
    return fetch('https://script.google.com/a/macros/iiitd.ac.in/s/AKfycbyLvp8puTy933s_LUKC9sG1IiEK1wZwFiCqWLnlnWnpW_yoJke82GcO8OIkB4Mlt-lv/exec')
        .then(response => response.json())
        .then(data => {
            // Process the data as needed
            return data;
        })
        .catch(error => {
            console.log('Error:', error);
            throw error;
        });
}
