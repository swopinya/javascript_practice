/**
 * Created by root on 28/10/15.
 */

// http://www.html5rocks.com/en/tutorials/es6/promises/

// http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

// Note: when creating a new object/class, methods should normally be associated to the object's prototype rather than defined into the object constructor.
// The reason is that whenever the constructor is called, the methods would get reassigned (that is, for every object creation).



// var url = 'http://api.nal.usda.gov/ndb/reports/?ndbno=01009&type=b&format=json&api_key=DEMO_KEY';





// Promise example 1 - deffered (the number of returned arguments) jquery promise

//var promise = $.ajax({ url: url, method: 'GET' });
//promise.then(function(res, statusText, xhrObj) {
//    console.log(res);
//}, function(xhrObj, textStatus, err) {
//    console.log(err);
//});






// Promise example 2 - javascript promise - ignores all returned arguments but the two first

//var jsPromise = Promise.resolve($.ajax({ url: url, method: 'GET' }));
//jsPromise.then(function(res) {
//    console.log(res);
//}, function(xhrObj) {
//    console.log(xhrObj);
//});







// Promise example 3 - Promisifying XMLHttpRequest

//function get(url) {
//    // Return a new promise.
//    return new Promise(function(resolve, reject) {
//        // Do the usual XHR stuff
//        var req = new XMLHttpRequest();
//        req.open('GET', url);
//
//        req.onload = function() {
//            // This is called even on 404 etc
//            // so check the status
//            if (req.status == 200) {
//                // Resolve the promise with the response text
//                resolve(req.response);
//            }
//            else {
//                // Otherwise reject with the status text
//                // which will hopefully be a meaningful error
//                reject(Error(req.statusText));
//            }
//        };
//
//        // Handle network errors
//        req.onerror = function() {
//            reject(Error("Network Error"));
//        };
//
//        // Make the request
//        req.send();
//    });
//}
//get(url).then(function(response) {
//    console.log("Success!", response);
//}, function(error) {
//    console.error("Failed!", error);
//});








// Chaining
// "then" isn't the end of the story, you can chain "then"s together to transform values or run additional async actions one after another.

// example 1 = Transforming values

//var promise = new Promise(function(resolve, reject) {
//    resolve(1);
//});
//
//promise.then(function(val) {
//    console.log(val); // 1
//    return val + 2;
//}).then(function(val) {
//    console.log(val); // 3
//});







// example 2 - Transforming values

//get(url).then(function(response) {
//    //console.log(response);
//    return JSON.parse(response);
//}).then(function(response) {
//    console.log("Yey JSON!", response);
//});
//
//// OR cleaner
//
//get(url).then(JSON.parse).then(function(response) {
//    console.log("Yey JSON!", response);
//});






// The get function above easily - chaining

//function getJSON(url) { // returns a promise
//    return get(url).then(JSON.parse); // promise one fetches the url, promise two parsing the json
//}
//getJSON(url).then(function(res){ // promise 3 - printing the json to the console
//    console.log(res);
//});






// Queuing asynchronous actions - You can also chain "then"s to run async actions in sequence.

// make async request to "story.json", which gives us a set of URLs to request, then we request the first of those.
//getJSON('story.json').then(function(story) {
//    return getJSON(story.chapterUrls[0]);
//}).then(function(chapter1) {
//    console.log("Got chapter 1!", chapter1);
//});




// You could even make a shortcut method to get chapters:

//var storyPromise;
//function getChapter(i) {
//    storyPromise = storyPromise || getJSON('story.json');
//
//    return storyPromise.then(function(story) {
//        return getJSON(story.chapterUrls[i]);
//    })
//}
//// and using it is simple:
//getChapter(0).then(function(chapter) {
//    console.log(chapter);
//    return getChapter(1);
//}).then(function(chapter) {
//    console.log(chapter);
//});
// We don't download "story.json" until getChapter is called,
// but the next time(s) getChapter is called we reuse the story promise, so story.json is only fetched once. Yay Promises!




// Error handling

//get(url).then(function(response) {
//    console.log("Success!", response);
//}, function(error) {
//    console.log("Failed!", error);
//});


// You can also use "catch":
//get(url).then(function(response) {
//    console.log("Success!", response);
//}).catch(function(error) {
//    console.log("Failed!", error);
//});

// The above catch is equivalent to
//get(url).then(function(response) {
//    console.log("Success!", response);
//}).then(undefined, function(error) { //catch is another word for then
//    console.log("Failed!", error);
//});





// The difference is subtle, but extremely useful.
// Promise rejections skip forward to the next "then"
// with a rejection callback (or "catch", since it's equivalent).
// With then(func1, func2), func1 or func2 will be called, never both.
// But with then(func1).catch(func2), both will be called if func1 rejects,
// as they're separate steps in the chain. Take the following:


//asyncThing1().then(function() { // the chaining is very clear, each one knows where he is going synchronisly
//    return asyncThing2();
//}).then(function() {
//    return asyncThing3();
//}).catch(function(err) {
//    return asyncRecovery1();
//}).then(function() {
//    return asyncThing4();
//}, function(err) {
//    return asyncRecovery2();
//}).catch(function(err) {
//    console.log("Don't worry about it");
//}).then(function() {
//    console.log("All done!");
//});






// JavaScript exceptions and promises
// Rejections happen when a promise is explicitly rejected, but also implicitly if an error is thrown in the constructor callback:

//var jsonPromise = new Promise(function(resolve, reject) {
//    // JSON.parse throws an error if you feed it some
//    // invalid JSON, so this implicitly rejects:
//    resolve(JSON.parse("This ain't JSON"));
//});
//
//jsonPromise.then(function(data) {
//    // This never happens:
//    console.log("It worked!", data);
//}).catch(function(err) {
//    // Instead, this happens:
//    console.log("It failed!", err);
//});






//get('/').then(JSON.parse).then(function() {
//    // This never happens, '/' is an HTML page, not JSON
//    // so JSON.parse throws
//    console.log("It worked!", data);
//}).catch(function(err) {
//    // Instead, this happens:
//    console.log("It failed!", err);
//});



// this
//getJSON('story.json').then(function(story) {
//    return getJSON(story.chapterUrls[0]);
//}).then(function(chapter1) {
//    addHtmlToPage(chapter1.html);
//}).catch(function() {
//    addTextToPage("Failed to show chapter");
//}).then(function() {
//    document.querySelector('.spinner').style.display = 'none';
//});

// is equivalent to that: (spinner will always be invoked)
//try {
//    var story = getJSONSync('story.json');
//    var chapter1 = getJSONSync(story.chapterUrls[0]);
//    addHtmlToPage(chapter1.html);
//}
//catch (e) {
//    addTextToPage("Failed to show chapter");
//}
//
//document.querySelector('.spinner').style.display = 'none';




// You may want to "catch" simply for logging purposes, without recovering from the error.
// To do this, just rethrow the error. We could do this in our getJSON method:
//function getJSON(url) {
//    return get(url).then(JSON.parse).catch(function(err) {
//        console.log("getJSON failed for", url, err);
//        throw err;
//    });
//}




// Parallelism and sequencing - Getting the best of both
//getJSON('story.json').then(function(story) {
//    addHtmlToPage(story.heading);
//
//    // TODO: for each url in story.chapterUrls, fetch & display
//}).then(function() {
//    // And we're all done!
//    addTextToPage("All done");
//}).catch(function(err) {
//    // Catch any error that happened along the way
//    addTextToPage("Argh, broken: " + err.message);
//}).then(function() {
//    // Always hide the spinner
//    document.querySelector('.spinner').style.display = 'none';
//});



// But how can we loop through the chapter urls and fetch them in order? This DOESNT WORK:
//story.chapterUrls.forEach(function(chapterUrl) {
//    // Fetch chapter
//    getJSON(chapterUrl).then(function(chapter) {
//        // and add it to the page
//        addHtmlToPage(chapter.html);
//    });
//});


// Fix - Creating a sequence
// Start off with a promise that always resolves
//var sequence = Promise.resolve();
//
//// Loop through our chapter urls
//story.chapterUrls.forEach(function(chapterUrl) {
//    // Add these actions to the end of the sequence
//    sequence = sequence.then(function() {
//        return getJSON(chapterUrl);
//    }).then(function(chapter) {
//        addHtmlToPage(chapter.html);
//    });
//});


// another way:
// Loop through our chapter urls
//story.chapterUrls.reduce(function(sequence, chapterUrl) {
//    // Add these actions to the end of the sequence
//    return sequence.then(function() {
//        return getJSON(chapterUrl);
//    }).then(function(chapter) {
//        addHtmlToPage(chapter.html);
//    });
//}, Promise.resolve());



// Let's put it all together…
//getJSON('story.json').then(function(story) {
//    addHtmlToPage(story.heading);
//
//    return story.chapterUrls.reduce(function(sequence, chapterUrl) {
//        // Once the last chapter's promise is done…
//        return sequence.then(function() {
//            // …fetch the next chapter
//            return getJSON(chapterUrl);
//        }).then(function(chapter) {
//            // and add it to the page
//            addHtmlToPage(chapter.html);
//        });
//    }, Promise.resolve());
//}).then(function() {
//    // And we're all done!
//    addTextToPage("All done");
//}).catch(function(err) {
//    // Catch any error that happened along the way
//    addTextToPage("Argh, broken: " + err.message);
//}).then(function() {
//    // Always hide the spinner
//    document.querySelector('.spinner').style.display = 'none';
//});









// Browsers are pretty good at downloading multiple things at once, so we're losing performance by downloading chapters one after the other.
// What we want to do is download them all at the same time, then process them when they've all arrived.
// Thankfully there's an API for this:

//getJSON('story.json').then(function(story) {
//    addHtmlToPage(story.heading);
//
//    // Take an array of promises and wait on them all
//    return Promise.all(
//        // Map our array of chapter urls to
//        // an array of chapter json promises
//        story.chapterUrls.map(getJSON)
//    );
//}).then(function(chapters) {
//    // Now we have the chapters jsons in order! Loop through…
//    chapters.forEach(function(chapter) {
//        // …and add to the page
//        addHtmlToPage(chapter.html);
//    });
//    addTextToPage("All done");
//}).catch(function(err) {
//    // catch any error that happened so far
//    addTextToPage("Argh, broken: " + err.message);
//}).then(function() {
//    document.querySelector('.spinner').style.display = 'none';
//});




// However, we can still improve perceived performance.
// When chapter one arrives we should add it to the page.
// This lets the user start reading before the rest of the chapters have arrived.
// When chapter three arrives, we wouldn't add it to the page because the user may not realise chapter two is missing.
// When chapter two arrives, we can add chapters two and three, etc etc.

// To do this, we fetch JSON for all our chapters at the same time, then create a sequence to add them to the document:
//getJSON('story.json').then(function(story) {
//    addHtmlToPage(story.heading);
//
//    // Map our array of chapter urls to
//    // an array of chapter json promises.
//    // This makes sure they all download parallel.
//    return story.chapterUrls.map(getJSON)
//        .reduce(function(sequence, chapterPromise) {
//            // Use reduce to chain the promises together,
//            // adding content to the page for each chapter
//            return sequence.then(function() {
//                // Wait for everything in the sequence so far,
//                // then wait for this chapter to arrive.
//                return chapterPromise;
//            }).then(function(chapter) {
//                addHtmlToPage(chapter.html);
//            });
//        }, Promise.resolve());
//}).then(function() {
//    addTextToPage("All done");
//}).catch(function(err) {
//    // catch any error that happened along the way
//    addTextToPage("Argh, broken: " + err.message);
//}).then(function() {
//    document.querySelector('.spinner').style.display = 'none';
//});





// Bonus round: Promises and Generators - ECMA6
// This next bit involves a whole bunch of new ES6 features, but it's not something you need to understand to use promises in your code today.
// Treat it like a movie trailer for some upcoming blockbuster features.
// ES6 also gives us generators, which allow functions to exit at a particular point,
// like "return", but later resume from the same point and state. Eg:

//function *addGenerator() {
//    var i = 0;
//    while (true) {
//        i += yield i;
//    }
//}
//
//
//var adder = addGenerator();
//adder.next().value; // 0
//adder.next(5).value; // 5
//adder.next(5).value; // 10
//adder.next(5).value; // 15
//adder.next(50).value; // 65






















































