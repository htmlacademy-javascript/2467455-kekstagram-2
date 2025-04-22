function getLength (string, maxLength) {
  return string.length <= maxLength;
}

console.log(getLength('проверяемая строка', 20));
console.log(getLength('проверяемая строка', 18));
console.log(getLength('проверяемая строка', 10));


function getPalindrome(str) {
  const normalized = str.replaceAll(' ', '').toLowerCase();

  let reversed = '';
  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }
  return normalized === reversed;
}

console.log(getPalindrome('топот'));
console.log(getPalindrome('ДовОд'));
console.log(getPalindrome('Кекс'));
console.log(getPalindrome('Лёша на полке клопа нашёл '));


function separate (value) {
  const str = value.toString();
  let digits = '';

  for (let i = 0; i < str.length; i++) {
    const variant = str[i];
    const num = parseInt(variant);

    if (!Number.isNaN(num)) {
      digits += num;
    }
  }

  if (digits === '') {
    return NaN;
  }

  return parseInt(digits);
}
console.log(separate('2023 год'));
console.log(separate('ECMAScript 2022'));
console.log(separate('1 кефир, 0.5 батона'));
console.log(separate('агент 007'));
console.log(separate('а я томат'));

console.log(separate(2023));
console.log(separate(-1));
console.log(separate(1.5));
