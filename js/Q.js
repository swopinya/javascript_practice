/**
 * Created by root on 29/10/15.
 */


// https://github.com/kriskowal/q
// node.js project

var url = 'http://api.nal.usda.gov/ndb/reports/?ndbno=01009&type=b&format=json&api_key=DEMO_KEY';

function get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send();
    });
}

get(url).then(function(response) {
    console.log("Success!", response);
}, function(error) {
    console.error("Failed!", error);
});