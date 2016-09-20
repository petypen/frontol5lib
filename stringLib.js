// Расширение строковых функций объекта String
// padr - дополнить строку заданными символами справа
// padl - дополнить строку заданными символами слева
// trimRight - убрать все пробелы в конце строки (справа)
// trimLeft - убрать все пробелы в начале строки (слева)
// trimAll - убрать все пробелы в начале и конце строки
// за основу взят код функций с сайта "Гараж программиста" http://garazh.biz/javascript/trim/

// Инициализация расширения строковых функций
function initStringLib() {	
	String.prototype.padl = padl;
	String.prototype.padr = padr;
	String.prototype.trimRight = trimRight;
	String.prototype.trimLeft = trimLeft;
	String.prototype.trimAll = trimAll;
}

// Дополнить строку заданными символами справа
// параметры:
// cPadChar - строка. Символ, которым дополняется строка. Символ по умолчанию " " (пробел) 
// nCount - целое число. Количество символов дополнения строки. Количество символов по умолчанию 0.
// возвращается - строка дополненная символами справа
function padr(cPadChar,nCount) {
	var cString = "";	
	if (cPadChar===undefined) {
        cPadChar = " ";
    }
	if (nCount===undefined) {
		nCount = 0;
	}
	cString = this;	
    while (cString.length < nCount) {
        cString = cString + cPadChar;
    }
    return cString;
}

// Дополнить строку заданными символами слева
// параметры:
// cPadChar - строка. Символ, которым дополняется строка. Символ по умолчанию " " (пробел) 
// nCount - целое число. Количество символов дополнения строки. Количество символов по умолчанию 0.
// возвращается - строка дополненная символами слева
function padl(cPadChar,nCount) {    
	var cString = "";
	if (cPadChar===undefined) {
        cPadChar = "0";
    }
	if (nCount===undefined) {
		nCount = 0;
	}
	cString = this;
    while (cString.length < nCount) {
        cString = cPadChar + cString;
    }
    return cString;
}

// Убрать все пробелы в конце строки (справа)
// параметры: отсутствуют
// возвращается - строка без пробелов в конце строки (справа)
function trimRight() {
	var r = /\s+$/g;
	return this.replace(r, '');
}

// Убрать все пробелы в начале строки (слева)
// параметры: отсутствуют
// возвращается - строка без пробелов в начале строки (слева)
function trimLeft() {
	var r = /^\s+/g;
	return this.replace(r, '');
}

// Убрать все пробелы в начале и конце строки
// параметры: отсутствуют
// возвращается - строка без пробелов в начале и конце строки
function trimAll() {
	return this.trimLeft().trimRight();
}