/**
 * Created by root on 29/10/15.
 */

// JavaScript’s Bind Allows Us to Set the this Value on Methods - like a bitch

//function User(first_name, last_name){
//    this.first_name = first_name;
//    this.last_name = last_name;
//}
//
//var user_service = {
//    clickHandler: function(){
//        $('input').val(this.first_name + ', ' + this.last_name);
//    }
//};
//
//var shimon = new User('Shimon', 'Swisa');
//var danielle = new User('Danielle', 'Cohen');
//
//$('button').click(user_service.clickHandler.bind(shimon));











// Bind () Allows us to Borrow Methods

//var data = {
//    name: 'Shimon Swisa',
//    age: 29
//};
//
//var user = {
//    data: {
//        name: 'Danielle Cohen',
//        age: 24
//    },
//    showData: function(){
//        console.log(this.data.name, this.data.age);
//    }
//};
//
//var car = {
//    data: {
//        name: 'Renault Megan',
//        age: 25
//    }
//};
//
//var show_data = user.showData;
//show_data(); // Shimon Swisa 29
//
//show_data = user.showData.bind(user);
//show_data(); // Danielle Cohen 24

// The following method is not good because we might override an existing method called showData
// We would prefer using apply or call
//car.showData = user.showData.bind(car);
//car.showData();

// => Apply
// this way we didn't create a new method in car object
// user.showData.apply(car);

// => call
// this way we didn't create a new method in car object
// user.showData.call(car);










// JavaScript’s Bind Allows Us to Curry a Function 

//function greet (gender, age, name) {
//    // if a male, use Mr., else use Ms.​
//    var salutation = gender === "male" ? "Mr. " : "Ms. ";
//    if (age > 25) console.log("Hello, " + salutation + name + ".");
//    else console.log("Hey, " + name + ".");
//}
//
//// So we are passing null because we are not using the "this" keyword in our greet function.​
//var greetAnAdultMale = greet.bind (null, "male", 45);
//greetAnAdultMale ("John Hartlove"); // "Hello, Mr. John Hartlove."​
//var greetAYoungster = greet.bind (null, "", 16);
//greetAYoungster ("Alex"); // "Hey, Alex."​
//greetAYoungster ("Emma Waterloo"); // "Hey, Emma Waterloo."​







// JavaScript’s Apply and Call Methods

// The Apply and Call methods are two of the most often used Function methods in JavaScript, and for good reason:
// they allow us to borrow functions and set the this value in function invocation.
// In addition, the apply function in particular allows us to execute a function with an array of parameters,
// such that each parameter is passed to the function individually when the function executes—great for variadic functions;
// a variadic function takes varying number of arguments, not a set number of arguments as most functions do.

// Set the this value with Apply or Call

// global variable for demonstration​
//var avgScore = "global avgScore";
//
////global function​
//function avg (arrayOfScores) {
//    // Add all the scores and return the total​
//    var sumOfScores = arrayOfScores.reduce(function (prev, cur, index, array) {
//        return prev + cur;
//    });
//    // The "this" keyword here will be bound to the global object, unless we set the "this" with Call or Apply​
//    this.avgScore = sumOfScores / arrayOfScores.length;
//    console.log(this.avgScore);
//}
//
//var gameController = {
//    scores  :[20, 34, 55, 46, 77],
//    avgScore:null
//};
//
//avg(gameController.scores);
//// Proof that the avgScore was set on the global window object​
//console.log (window.avgScore); // 46.4​
//console.log (gameController.avgScore); // null​
//
//// reset the global avgScore​
//avgScore = "global avgScore";
//
//// To set the "this" value explicitly, so that "this" is bound to the gameController,​
//// We use the call () method:​
//avg.call (gameController, gameController.scores);
//
//console.log (window.avgScore); //global avgScore​
//console.log (gameController.avgScore); // 46.4​







// Use Call or Apply To Set this in Callback Functions

// Define an object with some properties and a method​
// We will later pass the method as a callback function to another function​
//var clientData = {
//    id: 94545,
//    fullName: "Not Set",
//    // setUserName is a method on the clientData object​
//    setUserName: function (firstName, lastName)  {
//        // this refers to the fullName property in this object​
//        this.fullName = firstName + " " + lastName;
//    }
//};
//
//function getUserInput (firstName, lastName, callback, callbackObj) {
//    // The use of the Apply method below will set the "this" value to callbackObj​
//    var details = [firstName, lastName];
//    callback.apply (callbackObj, details);
//}
//
//// The clientData object will be used by the Apply method to set the "this" value​
//getUserInput ("Barack", "Obama", clientData.setUserName, clientData);
//// the fullName property on the clientData was correctly set​
//console.log (clientData.fullName); // Barack Obama​









// An array-like object: note the non-negative integers used as keys
//var anArrayLikeObj = {
//    0: "Martin",
//    1: 78,
//    2: 67,
//    3: ["Letta", "Marieta", "Pauline"],
//    length: 4
//
//};

// Make a quick copy and save the results in a real array:​
// First parameter sets the "this" value​
//var newArray = Array.prototype.slice.call (anArrayLikeObj, 0);
//console.log (newArray); // ["Martin", 78, 67, Array[3]]​

// Search for "Martin" in the array-like object​
//console.log (Array.prototype.indexOf.call (anArrayLikeObj, "Martin") === -1 ? false : true); // true​

// Try using an Array method without the call () or apply ()​
//console.log (anArrayLikeObj.indexOf ("Martin") === -1 ? false : true); // Error: Object has no method 'indexOf'​

// Reverse
//Array.prototype.reverse.call(anArrayLikeObj);
//console.log(anArrayLikeObj);

// Pop
//console.log(Array.prototype.pop.call(anArrayLikeObj));

// Push
//console.log(Array.prototype.push.call(anArrayLikeObj, 'Shimon'));
//console.log(Array.prototype.pop.call(anArrayLikeObj));
















