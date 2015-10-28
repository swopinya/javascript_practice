/**
 * Created by root on 27/10/15.
 */

// http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

// Note: when creating a new object/class, methods should normally be associated to the object's prototype rather than defined into the object constructor.
// The reason is that whenever the constructor is called, the methods would get reassigned (that is, for every object creation).

// 1. Global context
console.log(this.document === document); // true

// In web browsers, the window object is also the global object:
console.log(this === window); // true

this.a = 37;
console.log(window.a); // 37





// 2. Function context
function f1(){
    return this;
}
console.log(f1() === window); // true





function f2(){
    "use strict"; // see strict mode
    return this;
}
console.log(f2() === undefined); // true




var o = {
    prop: 37,
    f: function() {
        return this.prop;
    }
};
console.log(o.f()); // logs 37





var o2 = {
    prop: 37
};
function independent() {
    return this.prop;
}
o2.f = independent;
console.log(o2.f()); // logs 37
o2.b = {
    g: independent,
    prop: 42
};
console.log(o2.b.g()); // logs 42





var o3 = {
    f: function(){
        return this.a3 + this.b3;
    }
};
var p = Object.create(o3);
p.a3 = 1;
p.b3 = 4;
console.log(p.f()); // 5








function modulus(){
    return Math.sqrt(this.re * this.re + this.im * this.im);
}
var o4 = {
    re: 1,
    im: -1,
    get phase(){
        return Math.atan2(this.im, this.re);
    }
};
Object.defineProperty(o4, 'modulus', {
    get: modulus,
    enumerable:true,
    configurable:true
});
console.log(o4.phase, o4.modulus); // logs -0.78 1.4142






/*
 * Constructors work like this:
 *
 * function MyConstructor(){
 *   // Actual function body code goes here.
 *   // Create properties on |this| as
 *   // desired by assigning to them.  E.g.,
 *   this.fum = "nom";
 *   // et cetera...
 *
 *   // If the function has a return statement that
 *   // returns an object, that object will be the
 *   // result of the |new| expression.  Otherwise,
 *   // the result of the expression is the object
 *   // currently bound to |this|
 *   // (i.e., the common case most usually seen).
 * }
 */

function C(){
    this.a = 37;
}

var o5 = new C();
console.log(o5.a); // logs 37


function C2(){
    this.a = 37;
    return {a:38};
}

o5 = new C2();
console.log(o5.a); // logs 38







function add(c, d){
    return this.a + this.b + c + d;
}
var o6 = {a:1, b:3};
// The first parameter is the object to use as
// 'this', subsequent parameters are passed as
// arguments in the function call
add.call(o6, 5, 7); // 1 + 3 + 5 + 7 = 16
// The first parameter is the object to use as
// 'this', the second is an array whose
// members are used as the arguments in the function call
add.apply(o6, [10, 20]); // 1 + 3 + 10 + 20 = 34





function bar() {
    console.log(Object.prototype.toString.call(this));
}
bar.call(7); // [object Number]






function f(){
    return this.a;
}
var g = f.bind({a:"azerty"});
console.log(g()); // azerty

var o7 = {a:37, f:f, g:g};
console.log(o7.f(), o7.g()); // 37, azerty





// When called as a listener, turns the related element blue
function bluify(e){
    // Always true
    console.log(this === e.currentTarget);
    // true when currentTarget and target are the same object
    console.log(this === e.target);
    this.style.backgroundColor = '#A5D9F3';
}

// Get a list of every element in the document
var elements = document.getElementsByTagName('*');

// Add bluify as a click listener so when the
// element is clicked on, it turns blue
for(var i=0 ; i<elements.length ; i++){
    elements[i].addEventListener('click', bluify, false);
}









































