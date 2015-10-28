/**
 * Created by root on 28/10/15.
 */

// http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

// Note: when creating a new object/class, methods should normally be associated to the object's prototype rather than defined into the object constructor.
// The reason is that whenever the constructor is called, the methods would get reassigned (that is, for every object creation).

// Closures are functions that refer to independent (free) variables.
// In other words, the function defined in the closure 'remembers' the environment in which it was created.


// Lexical scoping
var name = 'Shimon';

function init() {
    var name = "Mozilla"; // name is a local variable created by init
    function displayName() { // displayName() is the inner function, a closure
        console.log(name); // use variable declared in the parent function => 'Mozilla'
    }
    displayName(); // nested functions have access to variables declared in their outer scope.
}

// displayName(); // undefined

//init();





// Closure
function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        console.log(name);
    }
    return displayName;
}

var myFunc = makeFunc(); // myFunc has become a closure.
//myFunc(); // 'Mozilla'



function makeAdder(x) { //  makeAdder is a function factory — it creates functions which can add a specific value to their argument.
    return function(y) {
        return x + y;
    };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

//console.log(add5(), add10()); // => NaN NaN
//console.log(add5(2), add10(2)); // => 7 12







// Practical closures
function makeSizer(size) {
    return function() {
        document.body.style.fontSize = size + 'px';
    };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;





// Emulating private methods with closures
var counter = (function() {
    var privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        increment: function() {
            changeBy(1);
        },
        decrement: function() {
            changeBy(-1);
        },
        value: function() {
            return privateCounter;
        }
    };
})();

//console.log(counter.value()); // logs 0
//counter.increment();
//counter.increment();
//console.log(counter.value()); // logs 2
//counter.decrement();
//console.log(counter.value()); // logs 1



//var counter1 = counter(); // counter is not a function
//var counter1 = counter; // ok






var makeCounter = function() {
    var privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        increment: function() {
            changeBy(1);
        },
        decrement: function() {
            changeBy(-1);
        },
        value: function() {
            return privateCounter;
        }
    }
};

//var counter1 = makeCounter();
//var counter2 = makeCounter();
//console.log(counter1.value()); /* Alerts 0 */
//counter1.increment();
//counter1.increment();
//console.log(counter1.value()); /* Alerts 2 */
//counter1.decrement();
//console.log(counter1.value()); /* Alerts 1 */  data hiding and encapsulation. each one has is session
//console.log(counter2.value()); /* Alerts 0 */  data hiding and encapsulation. each one has is session




// Creating closures in loops: A common mistake
function showHelp(help) {
    document.getElementById('help').innerHTML = help;
}

function makeHelpCallback(help) {
    return function() {
        showHelp(help);
    };
}

function setupHelp() {
    var helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

    for (var i = 0; i < helpText.length; i++) {
        var item = helpText[i];
        document.getElementById(item.id).onfocus = makeHelpCallback(item.help); // solution 1
        //document.getElementById(item.id).onfocus = function(){  // problem
        //    showHelp(item.help);
        //};
        //commit(item); // solution 2
    }
}

function commit(item){
    document.getElementById(item.id).onfocus = function() {
        showHelp(item.help);
    }
}

setupHelp();






// Note: when creating a new object/class, methods should normally be associated to the object's prototype rather than defined into the object constructor.
// The reason is that whenever the constructor is called, the methods would get reassigned (that is, for every object creation).

// Consider the following impractical but demonstrative case:

function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
    this.getName = function() {
        return this.name;
    };

    this.getMessage = function() {
        return this.message;
    };
}


// The previous code does not take advantage of the benefits of closures and thus could instead be formulated:

function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
}
MyObject.prototype = {
    getName: function() {
        return this.name;
    },
    getMessage: function() {
        return this.message;
    }
};


// However, redefining the prototype is not recommended, so the following example is even better because it appends to the existing prototype:

function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
}
MyObject.prototype.getName = function() {
    return this.name;
};
MyObject.prototype.getMessage = function() {
    return this.message;
};



// The above code can also be written in a cleaner way with the same result:

function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
}
(function() {
    this.getName = function() {
        return this.name;
    };
    this.getMessage = function() {
        return this.message;
    };
}).call(MyObject.prototype);

// In the two previous examples, the inherited prototype can be shared by all objects and the method definitions need not occur at every object creation



function print_i(i){
    setTimeout(function(){
        console.log(i);
    }, 1000);
}

function timer(){
    for(var i = 0; i < 100; i++){
        print_i(i);
    }
}

timer();


































