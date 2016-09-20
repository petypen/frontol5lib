// Получить код EAN-13 с контрольным символом
// параметры:
// anyCode - число или строка длиной 10 символов. Код товара (без префикса)
// cPreffix - строка. Преффикс кода EAN13. Значение по умолчанию "25"
// возвращается строка с кодом EAN13 
 function getEAN13(anyCode, cPreffix) {

	var nEAN13Digit = 13; // Для EAN13 - 13; для EAN8 - 8
	var cPreffixDifault = "25";
	
	var nControlSum = 0;
	var nDigit = 0;
	var cCode = "";

	if (typeof anyCode == "string") {
		if (anyCode.trimAll().length > 10){
			cCode = "0000000000";
			cPreffix = "00";
		} else {
			cCode = anyCode.trimAll().padl(10,"0");	
		}
	} else {
		if (anyCode <= 0 || anyCode > 9999999999) {
			cCode = "0000000000";
			cPreffix = "00";
		} else {
			cCode = Math.round(anyCode).toString(10).padl(10,"0");
		}
	}
		
	var cEan13 = ((cPreffix == "" || cPreffix == undefined) ? cPreffixDifault : cPreffix) + cCode;
	for (var index = 0; index < nEAN13Digit - 1; index++) {
		nDigit = parseInt(cEan13.substr(index, 1), 10);
		if ((index + 1) % 2 == 0) {
			nControlSum = nControlSum + nDigit * 3;
		} else {
			nControlSum = nControlSum + nDigit * 1;
		}
	}
	nControlSum = (10 - (nControlSum % 10)) % 10;
	cEan13 = cEan13 + nControlSum.toString(10);

	return cEan13
}