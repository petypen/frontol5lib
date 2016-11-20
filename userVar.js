//** РАБОТА С ПОЛЬЗОВАТЕЛЬСКИМИ ПЕРЕМЕННЫМИ **//
// обёртка, для более удобной работы с пользовательскими переменными
// userValueRemove - удалить переменную пользователя
// userValueSet - установить значение пользовательской переменной
// userValueAsString - получить значение пользовательской переменной преобразованное в строку
// userValueAsNumber - получить значение пользовательской переменной преобразованное в число
// userValueAsBoolean - получить значение пользовательской переменной преобразованное в тип булево

// удалить переменную пользователя
// параметры:
// cValueName - строка. Имя удаляемой переменной
function userValueRemove(cValueName) {
  if (cValueName != undefined) {
    frontol.userValues.remove(cValueName);
  }
}

// установить значение пользовательской переменной
// параметры:
// cValueName - строка. Имя переменной, значение которой будет установлено. 
//              Если переменной пользователя с таким именем ещё нет, она будет создана.
// anyValue - строка, число, булево. Значение, которое 
//              будет установлено переменной пользователя
function userValueSet(cValueName, anyValue) {
  var cValue;
  if (cValueName != undefined && anyValue != undefined) {
    switch (typeof (anyValue)) {
      case "string":
        cValue = anyValue;
        break;
      case "number":
        cValue = anyValue.toString(10);
        break;
      case "boolean":
        if (anyValue) {
          cValue = "1";
        } else {
          cValue = "0";
        }
        break;
      default:
        cValue = "";
        break;
    }
    frontol.userValues.set(cValueName, cValue);
  }
}

// получить значение пользовательской переменной преобразованное в строку
// параметры:
// cValueName - строка. Имя переменной, значение которой нужно получить
// возвращается строка значение переменной пользователя
function userValueAsString(cValueName) {
  if (cValueName != undefined) {
    return frontol.userValues.get(cValueName);
  }
}

// получить значение пользовательской переменной преобразованное в число
// параметры:
// cValueName - строка. Имя переменной, значение которой нужно получить
// возвращается число значение переменной пользователя или NaN
function userValueAsNumber(cValueName) {
  if (cValueName != undefined) {
    return parseFloat(frontol.userValues.get(cValueName));
  }
}

// получить значение пользовательской переменной преобразованное в тип булево
// параметры:
// cValueName - строка. Имя переменной, значение которой нужно получить
// возвращается тип булево значение переменной пользователя
function userValueAsBoolean(cValueName) {
  if (cValueName != undefined) {
    var bValue;
    var nValue = parseFloat(frontol.userValues.get(cValueName));
    if (nValue == 0) {
      bValue = false;
    } else {
      bValue = true;
    }
    return bValue;
  }
}