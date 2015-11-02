/**
 * Created by root on 02/11/15.
 */

// Operator	Description
// ==	equal to
// ===	equal value and equal type
// !=	not equal
// !==	not equal value or not equal type
// >	greater than
// <	less than
// >=	greater than or equal to
// <=	less than or equal to

$(document).ready(function(){

    var str1 = '';
    var str2 = '';
    if(str1 === str2){
        console.log('equal value and equal type');
    }
    else{
        console.log('not equal value or not equal type');
    }

});
