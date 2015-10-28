/**
 * Created by root on 28/10/15.
 */

// http://www.html5rocks.com/en/tutorials/es6/promises/

// http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

// Note: when creating a new object/class, methods should normally be associated to the object's prototype rather than defined into the object constructor.
// The reason is that whenever the constructor is called, the methods would get reassigned (that is, for every object creation).



var img1 = document.querySelector('.img-1');
//
//function loaded() {
//    console.log('loaded');
//}
//
//if (img1.complete) {
//    loaded();
//}
//else {
//    img1.addEventListener('load', loaded);
//}
//
//img1.addEventListener('error', function() {
//    console.log('error');
//});



// a promiose example
var promise = new Promise(function(resolve, reject) {
    $.ajax({
        url: 'http://dorbel-staging.herokuapp.com/apartments',
        method: 'GET',
        success: function(res){
            resolve("Stuff worked!" + res);
        },
        error: function(err, data){
            reject('Broken' + err);
        }
    })
});

promise.then(function(result) {
    console.log(result); // "Stuff worked!"
}, function(err) {
    console.log(err); // Error: "It broke"
});


// or
$.ajax({
    url: 'http://dorbel-staging.herokuapp.com/apartments',
    method: 'GET'
}).then(function(response, statusText, xhrObj) {
    // ...
}, function(xhrObj, textStatus, err) {
    // ...
});



















































