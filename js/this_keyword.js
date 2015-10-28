/**
 * Created by root on 26/10/15.
 */

// http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

// Note: when creating a new object/class, methods should normally be associated to the object's prototype rather than defined into the object constructor.
// The reason is that whenever the constructor is called, the methods would get reassigned (that is, for every object creation).


var person = {
    firstName: 'Penelope',
    lastName: 'Barrymore',
    fullName: function() {
        // Notice we use "this" just as we used "he" in the example sentence earlier?:​
        console.log(this.firstName + " " + this.lastName);
        // We could have also written this:​​
        console.log(person.firstName + " " + person.lastName);
    }
};

var person2 = {
    firstName   :"Penelope",
    lastName    :"Barrymore",
    // Since the "this" keyword is used inside the showFullName method below, and the showFullName method is defined on the person object,​
    // "this" will have the value of the person object because the person object will invoke showFullName ()​
    showFullName:function() {
        console.log (this.firstName + " " + this.lastName);
    }

};

person.fullName();
person2.showFullName(); // Penelope Barrymore

// A very common piece of jQuery code​
$ ("button").click (function (event) {
    // $(this) will have the value of the button ($("button")) object​
    // because the button object invokes the click () method​
    console.log ($ (this).prop ("name"));
});

// There are a few scenarios where this does not have the value of the invoking object. I touch on those scenarios later.
var firstName = "Peter",
    lastName = "Ally";

function showFullName() {
    // "this" inside this function will have the value of the window object​
    // because the showFullName () function is defined in the global scope, just like the firstName and lastName​
    console.log(this.firstName + " " + this.lastName);
}

showFullName(); // Peter Ally​

// window is the object that all global variables and functions are defined on, hence:​
window.showFullName(); // Peter Ally​

// "this" inside the showFullName () method that is defined inside the person object still refers to the person object, hence:​
person2.showFullName(); // Penelope Barrymore


// If we invoke showFullName with a different object:​
var anotherPerson = {
    firstName   :"Rohit",
    lastName    :"Khan"
};

// We can use the apply method to set the "this" value explicitly—more on the apply () method later.​
// "this" gets the value of whichever object invokes the "this" Function, hence:​
person2.showFullName.apply(anotherPerson); // Rohit Khan​

// So the context is now anotherPerson because anotherPerson invoked the person.showFullName ()  method by virtue of using the apply () method​




$(document).ready(function(){

    // 1. Fix this when used in a method passed as a callback
    // http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/
    // We have a simple object with a clickHandler method that we want to use when a button on the page is clicked​
    var user = {
        data:[
            {name:"T. Woods", age:37},
            {name:"P. Mickelson", age:43}
        ],
        clickHandler:function (event) {
            var randomNum = ((Math.random () * 2 | 0) + 1) - 1; // random number between 0 and 1​

            // This line is printing a random person's name and age from the data array​
            console.log (this.data[randomNum].name + " " + this.data[randomNum].age);
        }
    };

    user.clickHandler();
    // The button is wrapped inside a jQuery $ wrapper, so it is now a jQuery object​
    // And the output will be undefined because there is no data property on the button object​
    $ ("input[name=non-bind]").click (user.clickHandler); // Cannot read property '0' of undefined
    $ ("input[name=bind]").click (user.clickHandler.bind(user)); // correct output of user





    // 2. Fix this inside closure
    var user2 = {
        tournament:"The Masters",
        data      :[
            {name:"T. Woods", age:37},
            {name:"P. Mickelson", age:43}
        ],

        clickHandler:function () {
            // the use of this.data here is fine, because "this" refers to the user object, and data is a property on the user object.​
            console.log(this.tournament); // The masters
            var theUserObj = this;
            this.data.forEach (function (person) {
                // But here inside the anonymous function (that we pass to the forEach method), "this" no longer refers to the user object.​
                // This inner function cannot access the outer function's "this"​

                console.log ("What is This referring to? " + this); //[object Window]​
                console.log ("What is This referring to? " + theUserObj); // [object Object]​

                console.log (person.name + " is playing at " + this.tournament); // undefined
                console.log (person.name + " is playing at " + theUserObj.tournament); // The Masters
                // T. Woods is playing at undefined​
                // P. Mickelson is playing at undefined​
            })
        }
    };
    user2.clickHandler(); // What is "this" referring to? [object Window]

});



// 3. Fix this when method is assigned to a variable
// This data variable is a global variable​
var data2 = [
    {name:"Samantha", age:12},
    {name:"Alexis", age:14}
];
var user3 = {
    // this data variable is a property on the user object​
    data2    :[
        {name:"T. Woods", age:37},
        {name:"P. Mickelson", age:43}
    ],
    showData:function (event) {
        var randomNum = ((Math.random () * 2 | 0) + 1) - 1; // random number between 0 and 1​
        // This line is adding a random person from the data array to the text field​
        console.log (this.data2[randomNum].name + " " + this.data2[randomNum].age);
    }
};
// Assign the user.showData to a variable​
var showUserData1 = user3.showData;
// When we execute the showUserData function, the values printed to the console are from the global data array, not from the data array in the user object​
showUserData1(); // Samantha 12 (from the global data array)​

// Bind the showData method to the user object​
var showUserData2 = user3.showData.bind(user3);
// Now we get the value from the user object, because the <em>this</em> keyword is bound to the user object​
showUserData2();  // P. Mickelson 43




// 4. Fix this when borrowing methods
// We have two objects. One of them has a method called avg () that the other doesn't have​
// So we will borrow the (avg()) method​
var gameController = {
    scores  :[20, 34, 55, 46, 77],
    avgScore:null,
    players :[
        {name:"Tommy", playerID:987, age:23},
        {name:"Pau", playerID:87, age:33}
    ]
};
var appController = {
    scores  :[900, 845, 809, 950],
    avgScore:null,
    avg     :function () {

        var sumOfScores = this.scores.reduce (function (prev, cur, index, array) {
            return prev + cur;
        });

        this.avgScore = sumOfScores / this.scores.length;
    }
};
//If we run the code below,​
// the gameController.avgScore property will be set to the average score from the appController object "scores" array​

// Don't run this code, for it is just for illustration; we want the appController.avgScore to remain null​
//gameController.avgScore = appController.avg();

// Note that we are using the apply () method, so the 2nd argument has to be an array—the arguments to pass to the appController.avg () method.​
appController.avg.apply (gameController);

// The avgScore property was successfully set on the gameController object, even though we borrowed the avg () method from the appController object​
console.log (gameController.avgScore); // 46.4​

// appController.avgScore is still null; it was not updated, only gameController.avgScore was updated​
console.log (appController.avgScore); // null

































