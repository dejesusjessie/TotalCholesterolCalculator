//Variables
var rowldlc = document.getElementById('rowldlc');
var rowtotalc = document.getElementById('rowtotalc');
var rowhdlc = document.getElementById('rowhdlc');
var rowtrig = document.getElementById('rowtrig');
var calculateButton = document.querySelector('.calculate');
var inputldlc = document.querySelector('.ldlc');
var inputtotalc = document.querySelector('.totalc');
var inputhdlc = document.querySelector('.hdlc');
var inputtrig = document.querySelector('.trig');
var resultDisplay = document.querySelector('.result');

function clearInput() {
	inputldlc.value = "";
	inputtotalc.value = "";
	inputhdlc.value = "";
	inputtrig.value = "";
	resultDisplay.innerHTML = "";
}

//Populates drop down options when selected
function addCategories() {	
	category.addEventListener('change', function() {
		if(category.value == 'ldlc'){
			rowldlc.style.display = 'none';
			rowtotalc.style.display = 'flex';
			rowtrig.style.display = 'flex';
			rowhdlc.style.display = 'flex';
			clearInput();

		}else if (category.value == 'totalc') {
			rowldlc.style.display = 'flex';
			rowtotalc.style.display = 'none';
			rowtrig.style.display = 'flex';
			rowhdlc.style.display = 'flex';
			clearInput();

		} else if (category.value == 'hdlc') {
			rowldlc.style.display = 'flex';
			rowtotalc.style.display = 'flex';
			rowtrig.style.display = 'flex';
			rowhdlc.style.display = 'none';
			clearInput();
			
		} else if (category.value == 'trig') {
			rowldlc.style.display = 'flex';
			rowtotalc.style.display = 'flex';
			rowtrig.style.display = 'none';
			rowhdlc.style.display = 'flex';
			clearInput();
		}
	});
}
addCategories();


document.querySelectorAll('label[for=ldlc]')[0].innerText = 'LDL-Cholesterol';
document.querySelectorAll('label[for=totalc]')[0].innerText = 'Total Cholesterol';
document.querySelectorAll('label[for=hdlc]')[0].innerText = 'HDL-Cholesterol';


//Keep same same page behavior when refreshed
if (category.value == 'prompt') {
	rowldlc.style.display = 'none';
	rowtotalc.style.display = 'none';
	rowtrig.style.display = 'none';
	rowhdlc.style.display = 'none';

}
else if (category.value == 'ldlc') {
	rowldlc.style.display = 'none';
	rowtotalc.style.display = 'flex';
	rowtrig.style.display = 'flex';
	rowhdlc.style.display = 'flex';
	
} else if (category.value == 'totalc') {
	rowldlc.style.display = 'flex';
	rowtotalc.style.display = 'none';
	rowtrig.style.display = 'flex';
	rowhdlc.style.display = 'flex';
	
} else if (category.value == 'hdlc') {
	rowldlc.style.display = 'flex';
	rowtotalc.style.display = 'flex';
	rowtrig.style.display = 'flex';
	rowhdlc.style.display = 'none';
	
} else if (category.value == 'trig') {
	rowldlc.style.display = 'flex';
	rowtotalc.style.display = 'flex';
	rowtrig.style.display = 'none';
	rowhdlc.style.display = 'flex';

}


// Calculate button event
calculateButton.addEventListener('click', (e) => {
	if (category.value == 'ldlc') {
		// If input box is empty, throw an alert
		if(inputtotalc.value.length == 0 ||inputtrig.value.length == 0 || inputhdlc.value.length == 0) {
			alert('All fields are required!');
			
		} else {
			totalcInput = inputtotalc.value;
			hdlcInput = inputhdlc.value;
			trigInput = inputtrig.value;
			fetchLDLC();
		}
		e.preventDefault()

	} else if (category.value == 'totalc') {
	
		// If input box is empty, throw an alert
		if(inputldlc.value.length == 0 || inputhdlc.value.length == 0 || inputtrig.value.length == 0) {
			alert("Type your given variable.");
		} else {
			ldlcInput = inputldlc.value;
			hdlcInput = inputhdlc.value;
			trigInput = inputtrig.value;
			fetchTotalC();
		}
		
		e.preventDefault()
	} else if (category.value == 'hdlc') {
		// If input box is empty, throw an alert
		if(inputtotalc.value.length == 0 || inputldlc.value.length == 0 || inputtrig.value.length == 0) {
			alert("Type your given variable.");
		} else {
			totalcInput = inputtotalc.value;
			ldlcInput = inputldlc.value;
			trigInput = inputtrig.value;
			fetchHDLC();
		}
		e.preventDefault()

	} else if (category.value == 'trig') {
		// If input box is empty, throw an alert
		if(inputtotalc.value.length == 0 || inputhdlc.value.length == 0 || inputldlc.value.length == 0) {
			alert("Type your given variable.");
		} else {
			totalcInput = inputtotalc.value;
			hdlcInput = inputhdlc.value;
			ldlcInput = inputldlc.value;
			fetchTrig();
		}
		
		e.preventDefault()
	}
});





//Get data from server(back-end)
function fetchLDLC() {
	
	fetch('/calculatedLDLC/'+totalcInput+'/'+hdlcInput+'/'+trigInput)
	.then(response => response.json())
	.then(data => {
		resultDisplay.innerHTML = 'Calculated LDL-C Level = ' + data['calculatedLDLC'] + ' mg/dL';
	});
}

function fetchTotalC() {
	fetch('/calculatedTotalC/'+ldlcInput+'/'+hdlcInput+'/'+trigInput)
	.then(response => response.json())
	.then(data => {
		resultDisplay.innerHTML = 'Calculated Total Cholesterol Level = ' + data['calculatedTotalC'] + ' mg/dL';
	});
}
function fetchHDLC() {
	fetch('/calculatedHDLC/'+totalcInput+'/'+ldlcInput+'/'+trigInput)
	.then(response => response.json())
	.then(data => {
		resultDisplay.innerHTML = 'Calculated HDL-C Level = ' + data['calculatedHDLC'] + ' mg/dL';
	});
}	
function fetchTrig() {
	fetch('/calculatedTrig/'+totalcInput+'/'+hdlcInput+'/'+ldlcInput)
	.then(response => response.json())
	.then(data => {
		resultDisplay.innerHTML = 'Calculated Triglycerides Level = ' + data['calculatedTrig'] + ' mg/dL';
	});
}
