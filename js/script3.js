
const n1 = document.querySelector('#n1');
const n2 = document.querySelector('#n2');
const n3 = document.querySelector('#n3');
const n4 = document.querySelector('#n4');
const n5 = document.querySelector('#n5');
const n6 = document.querySelector('#n6');
const n7 = document.querySelector('#n7');
const n8 = document.querySelector('#n8');
const n9 = document.querySelector('#n9');
const n0 = document.querySelector('#n0');
const nDec = document.querySelector('#nDec');
const divide = document.querySelector('#divide');
const times = document.querySelector('#times');
const minus = document.querySelector('#minus');
const plus = document.querySelector('#plus');
const equals = document.querySelector('#equals');
const displayed = document.querySelector('#displayed');

const numBtnArr = [n0, n1, n2, n3, n4, n5, n6, n7, n8, n9, nDec];

let curTotal = 0;
let curInput;
let opFunc = "empty";
let curPushed;
let lastClicked;
let equalspsh = "not pushed";


//OPERATOR FUNCTIONS
const preDivide = a => b => a / b;
const preTimes = a => b => a * b;
const preMinus = a => b => a - b;
const prePlus = a => b => a + b;

//add the number click function to each number button
for (let i = 0; i < numBtnArr.length; i++) {
	numBtnArr[i].addEventListener('click', function(){
		// if (equalspsh = "pushedLast") { curTotal = 0};
		equalspsh = "not pushed";
		debugger;
		curPushed = this.innerHTML;
		//if a new calculation is started
		if (opFunc === "empty") {
			//if it is the first number input by user eg. "1"
			if (lastClicked !== "number") {
				lastClicked = "number"
				curInput = curPushed;
				displayed.innerHTML = curInput;
			} else {
				debugger;
				//if there is multidigit input eg. "14"
				curInput += curPushed;
				displayed.innerHTML = curInput;
			}
		}	else if (opFunc && opFunc !== "empty") {
			//if it is the first number input by user eg. "1" after presing operator
			if (lastClicked !== "number") {
				lastClicked = "number";
				//go ahead
				curInput = curPushed;
				displayed.innerHTML = curInput;
			} else {
				debugger;
				//if there is multidigit input eg. "14" after using operator
				curInput += curPushed;
				displayed.innerHTML = curInput;
			}
		}
	});
}


//OPERATOR BUTTONS
divide.addEventListener('click', function(){
	doTheMath(preDivide);
});

times.addEventListener('click', function(){
	doTheMath(preTimes);
});

minus.addEventListener('click', function(){
	doTheMath(preMinus);
});

plus.addEventListener('click', function(){
	doTheMath(prePlus);
});

equals.addEventListener('click', function(){
	debugger;
	if (lastClicked && lastClicked !== "operator") {
		debugger;
		lastClicked = "operator";
		//evaluate current
		//is there any number to work with?
		if (curTotal && opFunc !== "empty") {
			debugger;
			curTotal = opFunc(Number(curInput));
			opFunc = "empty"
		} else {
			debugger;
			curTotal = Number(curInput);
			opFunc = "empty"
		}
		displayed.innerHTML = curTotal;
	} else {
		debugger;
		//reset
		opFunc = "empty"
		displayed.innerHTML = curTotal;
	}
	equalspsh = "pushedLast";
});



//Processes the numbers
function doTheMath(mathOperator){
	//checks to see if the button clicked last was a number
	//if a num was clicked last, the current input and the subtotal are evaluated
	if (lastClicked !== "operator" || equalspsh === "pushedLast") {
		equalspsh = "not pushed";
		lastClicked = "operator";
		//checks to see if there are numbers to work with
		if (curTotal) {
			debugger;
			if (opFunc === "empty") {
				debugger;
				opFunc = mathOperator(Number(curTotal));
				debugger;
				return
			}
			//opFunc preloaded with previous total is evaluated against current input and stored as current total
			curTotal = opFunc(Number(curInput));
			//new current total is stored in the operator closure
			opFunc = mathOperator(Number(curTotal))
		} else {
			//if first operation, current total receives value of current input
			curTotal = Number(curInput);
			//current total is stored in operator closure
			opFunc = mathOperator(Number(curInput))
		}
		displayed.innerHTML = curTotal;
	} else {
	//if a num was not clicked last, the operator func is cleared, and the current total is shown
		opFunc = "empty"
		displayed.innerHTML = curTotal;
	}
}

