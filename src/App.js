import React, { useEffect } from 'react';
import {useState} from 'react';
import './index.css';

function App() {
	// useState hook returns an array/string
	// object/array destructuring: https://www.youtube.com/watch?v=NIq3qLaHCIs
	// first para = every value, second para = function to update first para
	const [calculation, setCalculation] = useState([]);
	const [result, setResult] = useState('');

	const operators = ['mod', '÷', '×', '+', '-', '.'];

	const updateCalculation = input => {
		// When new input is operator after clicking '=' -> continue calculation with prior result
		if (result !== '' && operators.includes(input)) {
			setCalculation([result]);
			setResult('');
		}
		// When new input is number after clicking '=' -> start new calculation
		if (result !== '' && !operators.includes(input)) {
			clearDisplay();
		}
		// When a syntax error was raised before -> start new calculation
		if (result === 'SYNTAX ERROR!') {
			clearDisplay();
		}
		// "concatenate" calculation array with input https://prnt.sc/-CFhM-NhkFTm
		setCalculation(calculation => [...calculation, input]);
	};

	const printResult = () => {
		let calculationStrWithRealOperator = calculation.join('')
		.replace('mod', '%')
		.replace('÷', '/')
		.replace('×', '*');

		if (calculation.length !== 0) {
			try {
				setResult(Function('return ' + calculationStrWithRealOperator));
			} catch (error) {
				setResult('SYNTAX ERROR!')
			}
		}
	};

	const clearDisplay = () => {
		setCalculation([]);
		setResult('');
	};

	const removeLastInput = () => {
		// When the current result is a syntax error -> remove the result section
		if (result === 'SYNTAX ERROR!') {
			setResult('');
		}
		setCalculation(calculation => calculation.slice(0, -1));
	};

	// blinking animation if calculator display shows "_" by changing rescpective css id
	let displayCalculationID;
	if (calculation.length === 0) {
		displayCalculationID = 'displayCalculationEmpty';
	} else {
		displayCalculationID = 'displayCalculation';
	}

	// hide calculator result if result is empty by changing rescpective css id
	let displayResultID;
	if (result === '') {
		displayResultID = 'displayResultEmpty';
	} else {
		displayResultID = 'displayResult';
	}

	// https://bobbyhadz.com/blog/react-detect-escape-key (Listen for input via keyboard)
	useEffect(() => {
		const keyDownHandler = e => {

			for (let i = 0; i <= 9; i++) {
				switch(true) {
					case (e.key === i): {
						updateCalculation(i);
						break;
					}
					default:
						//
				}
			}
	
			switch(e.key) {
				case '+':
					updateCalculation('+');
					break;
				case '-':
					updateCalculation('-');
					break;
				case '/':
					updateCalculation('÷');
					break;
				case '*':
					updateCalculation('×');
					break;
				case '.':
					updateCalculation('.');
					break;
				case 'm':
					updateCalculation('mod');
					break;
				
				case 'c':
					clearDisplay();
					break;
				case '=':
					printResult();
					break;
				case 'Backspace':
					removeLastInput();
					break;
	
				default:
					//
			}
		};
		document.addEventListener('keydown', keyDownHandler);
		return () => {
		  document.removeEventListener('keydown', keyDownHandler);
		};
	});

	return (
		<div className="App">

			<div className="calculator">

				<div className="display">
					<span id={displayCalculationID}>
						{calculation.length === 0 ? ['_'] : calculation}
					</span>
					<br/>
					<span id={displayResultID}>
						{result === '' ? '_' : result}
					</span>
				</div>

				<div className="numPad">
					<button id="clearButton" onClick={clearDisplay}>AC</button>
					<button onClick={removeLastInput}>◄</button>
					<button className="operatorsButton" onClick={()=>updateCalculation('mod')}>mod</button>
					<button className="operatorsButton" onClick={()=>updateCalculation('÷')}>÷</button>

					<button onClick={()=>updateCalculation('7')}>7</button>
					<button onClick={()=>updateCalculation('8')}>8</button>
					<button onClick={()=>updateCalculation('9')}>9</button>
					<button className="operatorsButton" onClick={()=>updateCalculation('×')}>×</button>

					<button onClick={()=>updateCalculation('4')}>4</button>
					<button onClick={()=>updateCalculation('5')}>5</button>
					<button onClick={()=>updateCalculation('6')}>6</button>
					<button className="operatorsButton" onClick={()=>updateCalculation('+')}>+</button>

					<button onClick={()=>updateCalculation('1')}>1</button>
					<button onClick={()=>updateCalculation('2')}>2</button>
					<button onClick={()=>updateCalculation('3')}>3</button>
					<button className="operatorsButton" onClick={()=>updateCalculation('-')}>-</button>

					<button id="emptyButton"></button>

					<button onClick={()=>updateCalculation('0')}>0</button>
					<button onClick={()=>updateCalculation('.')}>.</button>

					<button id="equalButton" onClick={printResult}>=</button>
				</div>

			</div>

		</div>
	);
}

export default App;
