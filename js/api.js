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

export function resourcesBlogData() {
    return fetch('https://script.google.com/macros/s/AKfycbz9qTl2unUsWBS1MuNxh6h-V5eromJVPp6HCxFlVY9CSG-r3WPyAxM5hOl2PeKDR6AO/exec')
        .then(response2 => response2.json())
        .then(data2 => {
            return data2;
        })
        .catch(error2 => {
            console.log('ResourceBlog Error:', error2);
            throw error2;
        });
}

