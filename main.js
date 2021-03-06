var game = document.getElementById("game");
var slider = document.getElementById("slider");
var playerValue = document.getElementById("playerValue");
var groupValue = document.getElementById("groupValue");
var image = document.getElementById("image");
var compareButton = document.getElementById("compareButton");
var nextButton = document.getElementById("nextButton");
var main = document.getElementById("main");
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var modalText = document.getElementById("modalText");

nextButton.disabled = true;

var firstRoundDone = false;
var secondRoundDone = false;

var counter = 1;

var firstValues = [];
var secondValues = [];
var groupValues = [8,1,5,3,5,7,3,7,4,5,2,1,1,4,7,5,2,7,1,4,5,8,5,2,8,8,2,3,4,4,1,1];
var delta;

var numberOfChangedAnswers = 0;
var conformism = 0;

playerValue.innerHTML = slider.value;
updateGroupValue();

modal.style.display = "block";

slider.oninput = function() {
	playerValue.innerHTML = slider.value;
};

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
} 

function compare() {
	savePlayerValue();
	toogleButtons();
	if (!firstRoundDone){
		delta = firstValues[counter-1] - groupValues[counter-1];
		delta = Math.abs(delta);
		if (delta <= 2 && delta > 0) {
			groupValue.style.borderColor = "yellow";
		} else if (delta > 2){
			groupValue.style.borderColor = "red";
		} else  if (delta == 0){
			groupValue.style.borderColor = "green";
		}
		toogleGroupValue();
	}
	
}

function toogleGroupValue() {
	if (groupValue.style.opacity == 0) {
		groupValue.style.opacity = 1;
	} else {
		groupValue.style.opacity = 0;
	}
}

function toogleButtons() {
	if (nextButton.disabled){
		nextButton.disabled = false;
	} else {
		nextButton.disabled = true;
	}

	if (compareButton.disabled){
		compareButton.disabled = false;
	} else {
		compareButton.disabled = true;
	}
}
//Тут какая-то лажа со счетчиком...
function next() {
	
	toogleButtons();
	if(!firstRoundDone){
		toogleGroupValue();
	}
	groupValue.style.borderColor = "white";
	counter++;
	if (!secondRoundDone){
		if (counter <= groupValues.length){
		image.src = "assets/images/image" + counter + ".jpg";
		updateGroupValue();
		} else if (!firstRoundDone){
			firstRoundDone = true;
			alert("Отлично! Теперь пройдите тест снова, но на этот раз общественное мнение будет от вас скрыто!")
			compareButton.innerHTML = "Оценить!";
			counter = 1;
			console.log("Второй тур!");
			image.src = "assets/images/image" + counter + ".jpg";
			updateGroupValue();
			groupValue.style.opacity = 0;
		} else {
			secondRoundDone = true;
		}
	} else {
		console.log("END!");
		countDifference();
		showResults();
	}
}

function savePlayerValue() {
	if(!firstRoundDone){
		firstValues.push(parseInt(slider.value));
	} else {
		secondValues.push(parseInt(slider.value));
	}
	
}

function updateGroupValue() {
	groupValue.innerHTML = groupValues[counter-1];
}

function showResults() {
	conformism = Math.floor(100 * numberOfChangedAnswers / groupValues.length);
	game.style.display = "none";

	var final = document.createElement('p');
	var finalText = document.createTextNode("Ваш уровень конформности составляет " + conformism + "%. Вы изменили своё мнение под давлением общественности " + numberOfChangedAnswers + " раз.");
	final.appendChild(finalText);
	final.style.color = "white";

	var kluchImage = document.createElement('img');
	kluchImage.src = "assets/images/Kluch.jpg";

	main.appendChild(final);
	main.appendChild(kluchImage);
}

function countDifference() {
	var firstDelta, secondDelta;
	for (var i = 0; i < groupValues.length -1; i++){
		firstDelta = groupValues[i] - firstValues[i];
		firstDelta = Math.abs(firstDelta);

		secondDelta = groupValues[i] - secondValues[i];
		secondDelta = Math.abs(secondDelta);

		if(secondDelta < firstDelta) {
			numberOfChangedAnswers++;
		}
	}
}