/**
 * Created by root on 25/10/15.
 */

// http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

// Note: when creating a new object/class, methods should normally be associated to the object's prototype rather than defined into the object constructor.
// The reason is that whenever the constructor is called, the methods would get reassigned (that is, for every object creation).


$(document).ready(function(){

    // Objects
    function Person(name, age){
        this.name = name;
        this.age = age;
        this.weight = '0kg'
    }

    var shimon = new Person('shimon', 29);
    var yoav = new Person('yoav', 36);
    shimon.weight = '78kg';

    Person.prototype.height = 0;
    Person.prototype.print_details = function(){
        console.log(this.name + ', ' + this.age + ', ' + this.height + ', ' + this.weight);
    };

    shimon.height = '1.74m';
    yoav.height = '1.72m';
    shimon.print_details();
    yoav.print_details();

    // Arrays
    var arr = [1,2,3];
    Array.prototype.add_one = function(){
        for(var i = 0; i < this.length; i++){
            ++this[i];
        }
    };
    arr.add_one();
    console.log(arr);

    // Strings
    var str = 'shimon,swisa';
    String.prototype.array_me = function(){
        return this.split(',');
    };
    var str_arr = str.array_me();
    console.log(str_arr);

});