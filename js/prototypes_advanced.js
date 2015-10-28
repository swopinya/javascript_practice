/**
 * Created by root on 25/10/15.
 */

// http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

// Note: when creating a new object/class, methods should normally be associated to the object's prototype rather than defined into the object constructor.
// The reason is that whenever the constructor is called, the methods would get reassigned (that is, for every object creation).


$(document).ready(function(){

    var Person = function(){
        this.can_talk = true;
    };

    Person.prototype.greet = function(){
        if(this.can_talk){
            console.log('Hello, I am ' + this.name);
        }
    };

    var Employee = function(name, title){
        Person.call(this); // Employee inherits all attributes of Person which becomes a base class
        this.name = name;
        this.title = title;
    };

    Employee.prototype.greet = function(){
        if(this.can_talk){
            console.log('Hey, I am ' + this.name + ', the ' + this.title);
        }
    };

    Employee.prototype = Object.create(Person.prototype);
    Employee.prototype.constructor = Employee; // constructor of all employee objects becomes employee, without this, the constructor will be Person

    var shimon = new Employee('Shimon', 'programmer');

    console.log(shimon.can_talk); // true
    shimon.greet();

    console.log('shimon constructor is: ' + shimon.constructor);

});