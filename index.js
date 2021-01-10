const resultEle=document.getElementById("result");
const lengthEle=document.getElementById("length");
const uppercaseEle=document.getElementById("uppercase");
const lowercaseEle=document.getElementById("lowercase");
const numbersEle=document.getElementById("numbers");
const symbolsEle=document.getElementById("symbols");
const generatorButtonEle=document.getElementsByClassName("generatorButton")[0];
const copyButton=document.getElementById("copy");

generatorButtonEle.addEventListener('click', ()=>{

	const length=lengthEle.value;
	const hasUpper=uppercaseEle.checked;
	const hasLower=lowercaseEle.checked;
	const hasNumber=numbersEle.checked;
	const hasSymbol=symbolsEle.checked;

	resultEle.textContent= generatePassword(hasLower, hasUpper, hasSymbol, hasNumber, length);

});

copyButton.addEventListener('click', ()=> {
	const textarea = document.createElement('textarea');
	const password = resultEle.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
}
	);


function generatePassword(lower,upper,symbol,number,length)
{
	let generatedPassword = '';

	let typeCount= lower+upper+symbol+number;

	let typeArr= [{lower},{upper} ,{symbol},{number}].filter(
		item=> Object.values(item)[0]
		);

	if(typeCount === 0)
	{
		return '';
	}

	for(let i=0; i<length ;i+=typeCount)
	{
		typeArr.forEach(type=> {
			const funcName = Object.keys(type)[0];

			generatedPassword += randomFunc[funcName]();
		});
	}

	generatedPassword=generatedPassword.slice(0,length);

	return generatedPassword;
}

const randomFunc=
{
	upper: getUpperRandom,
	lower: getLowerRandom,
	number: getNumberRandom,
	symbol: getSymbolRandom
}
function getUpperRandom()
{
	return String.fromCharCode(Math.floor(Math.random()*26)+65);

}
function getLowerRandom()
{
	return String.fromCharCode(Math.floor(Math.random()*26)+97);

}
function getNumberRandom()
{
	return String.fromCharCode(Math.floor(Math.random()*10)+48);

}

function getSymbolRandom()
{
	const symbols='!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random()*symbols.length)];

}