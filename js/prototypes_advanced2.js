/**
 * Created by root on 25/10/15.
 */

// http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

// Note: when creating a new object/class, methods should normally be associated to the object's prototype rather than defined into the object constructor.
// The reason is that whenever the constructor is called, the methods would get reassigned (that is, for every object creation).

"use strict";
$(document).ready(function(){

    var o = {
        a: 2,
        m: function(b){
            return this.a + 1;
        }
    };

    console.log(o.m()); // 3

    var p = Object.create(o); // p is an object that inherits from o

    p.a = 12;
    console.log(p.m()); // 13
    console.log(o.m()); // 3


    // Methods of creating objects in javascript

    // Objects created with syntax constructs
    var arr = [1,2,3];
    var obj = {a: 4, b: 5};
    function f(){
        return 6;
    }


    // With a constructor
    function Graph(){
        this.vertices = [];
        this.edges = [];
    }
    Graph.prototype = {
        addVertices: function(v){
            this.vertices.push(v);
        }
    };
    var graph = new Graph();
    graph.addVertices(5);


    // With Object.create (ECMAScript 5) USE Object.create() to inherit
    var a = {a: 1}; // a ---> Object.prototype ---> null

    var b = Object.create(a); // b ---> a ---> Object.prototype ---> null

    console.log(b.a); // 1 (inherited)

    var c = Object.create(b); // c ---> b ---> a ---> Object.prototype ---> null

    console.log('b.prototype: ' + b.isPrototypeOf(c)); // true (checking the prototype chain)

    var d = Object.create(null); // d ---> null
    console.log(d.hasOwnProperty); // undefined, because d doesn't inherit from Object.prototype


    // With the class keyword ECMAScript 6
    class Polygon{
        constructor(height, width){
            this.height = height;
            this.width = width;
        }
    }
    class Square extends Polygon{
        constructor(sideLength){
            super(sideLength, sideLength);
        }
        get area(){
            return this.height * this.width;
        }
        set sideLength(newLength){
            this.height = newLength;
            this.width = newLength;
        }
    }
    var square = new Square(4);
    console.log(square.area);

    //Performance
    //    The lookup time for properties that are high up on the prototype chain can have a negative impact on performance,
    //    and this may be significant in code where performance is critical.
    //    Additionally, trying to access nonexistent properties will always traverse the full prototype chain.
    //    Also, when iterating over the properties of an object, every enumerable property that is on the prototype chain will be enumerated.
    //    To check whether an object has a property defined on itself and not somewhere on its prototype chain,
    //    it is necessary to use the hasOwnProperty method which all objects inherit from Object.prototype.
    //    hasOwnProperty is the only thing in JavaScript which deals with properties and does not traverse the prototype chain.
    //    Note: It is not enough to check whether a property is undefined.
    //    The property might very well exist, but its value just happens to be set to undefined.


    //Bad practice: Extension of native prototypes
    //    One mis-feature that is often used is to extend Object.prototype or one of the other built-in prototypes.
    //    This technique is called monkey patching and breaks encapsulation.
    //    While used by popular frameworks such as Prototype.js, there is still no good reason for cluttering built-in types with additional non-standard functionality.
    //    The only good reason for extending a built-in prototype is to backport the features of newer JavaScript engines; for example Array.forEach, etc.


});
