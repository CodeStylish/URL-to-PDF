
let teststr = '790830-1±è261111abc';

var isSpecialChar = function (str) { 
    var special_pattern = /[-`~!@#$%^&*|\\\'\";:\/?]/gi;  // '-' Ãß°¡.
    if(special_pattern.test(str) == true) { 
        //console.log("true");
        return true;
    } else {
        //console.log("false");
        return false;
    } 
}
//console.log(isSpecialChar('-'));
//console.log(isNaN('a'));

var isKorean = function (str){
    const regExpKor = /[¤¡-¤¾¤¿-¤Ó°¡-ÆR]/g;
    if (regExpKor.test(str)){
        return true;
    }else{
        return false;
    }
}


var isHangul = function (str){
    let ch = str.charCodeAt(0);
    if (0x1100 <= ch && ch <= 0x11FF) return true;
    if (0x3130 <= ch && ch <= 0x318F) return true;
    if (0xAC00 <= ch && ch <= 0xD7A3) return true;
    return false;
}
//console.log(isHangul('¤¡'));
//console.log(isKorean('¤¡'));


var CheckPerOneChar = function(str){
    let UnionChar = '';
    for (var i = 0; i < str.length; i++){
        let CharAtChar = str.charAt(i);
        if (isSpecialChar(CharAtChar))
            UnionChar = UnionChar + CharAtChar;
        else if (isKorean(CharAtChar))
            UnionChar = UnionChar + CharAtChar;
        else {
            if (isNaN(CharAtChar))
               UnionChar = UnionChar + 'S';
            else 
               UnionChar = UnionChar + 'I';
        }
    }
    return UnionChar;
}
console.log(CheckPerOneChar(teststr));


/* /\d / g

*/