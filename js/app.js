/* Memory Game */

//varibales
let deck = ['fa-diamond', 'fa-diamond',
			'fa-paper-plane-o', 'fa-paper-plane-o',
 			'fa-anchor', 'fa-anchor',
 			'fa-bolt', 'fa-bolt',
 			'fa-cube', 'fa-cube',
 			'fa-leaf','fa-leaf',
 			'fa-bicycle', 'fa-bicycle',
			'fa-bomb', 'fa-bomb'];
let open = [];
let matched = 0;
let timer = {
	seconds : 0,
	minutes : 0,
	clearTime: -1
};
let moveCounter = 0;
let numStars = 3;
let hard = 16;
let medium = 25;

//Modal
let myModal = $('#myModal');

//Modal Box shows when you have won
function showModal() {
	myModal.css('display', 'block');
};

//remove the lasr star from the remaining then update HTML
function removeStar() {
	$('.fa-star').last().attr('class', 'fa fa-star-o');
	numStars--;
	$('.num-stars').text(String(numStars));
};

//resets stars to 3 updating HTML
function resetStars() {
	$('.fa-star').attr('class', 'fa fa-star');
	numStars = 3;
	$('.num-stars').text(String(numStars));
};

//Move counter updates, based on difficulty it will remove a star
function updateMoveCounter() {
	$('.moves').text(moveCounter);

	if (moveCounter === hard || moveCounter == medium) {
		removeStar();
	}
};
//timer
var startTimer = function(){
	if (matched <=15 ) {
		if (timer.seconds === 59) {
			timer.minutes++;
			timer.seconds = 0;
		} else {
			timer.seconds++;
		}
	}

	//precedes seconds
	let formattedSec = "0";
	if (timer.seconds < 10) {
		formattedSec += timer.seconds
	} else {
		formattedSec = String(timer.seconds);
	}

	var time = String(timer.minutes) + ":" + formattedSec;
	$('.timer').text(time);
}

//shuffles the deck it would be ready to click
function shuffleCards(){
	deck = shuffle(deck);
	let index = 0;
	$.each($('.card i'), function(){
		$(this).attr('class', 'fa ' + deck[index]);
		index++;
		});
	}
$(shuffleCards);

//checking if the card is open or match
function isValid(card){
	return !(card.hasClass('open') || card.hasClass('match'));
};

//check if cards are match
function checkMatch(){
	if (open[0].children().attr('class')===open[1].children().attr('class')) {
		return true;
	} else { return false; }
};

// Checks if you have won
function hasWon() {
	if ( matched === 16 ) {
		return true;
	} else {
		return false;
	} 
};

//keep cards open if they match
var setMatch = function() {
	open.forEach(function(card) {
		card.addClass('match');
	});

	open = [];
	matched += 2;

	if ( hasWon() ) {
		clearInterval(timer.clearTime);
		showModal();
	}
};

//reset open
var resetOpen = function() {
	open.forEach(function(card) {
		card.toggleClass('open');
		card.toggleClass('show');
	});

	open = [];
};

//open the card
function openCard(card){
 	if (!card.hasClass('open')){
 		card.addClass('open');
 		card.addClass('show');
 		open.push(card);
	}
};

//click function
$('.card').click(function onClick(){
	if (timer.seconds == 0 && timer.minutes == 0){
		resetTimer();
	}

 	if (isValid( $(this) )) {
 	  	if (open.length === 0) {
 	  		openCard( $(this) );
 	  	} else if (open.length === 1) {
 	  		openCard( $(this) );
 	  		moveCounter++;
 	  		updateMoveCounter();
 	    	if (checkMatch()) {
            	setTimeout(setMatch, 300);
        	} else {
            	setTimeout(resetOpen, 700);
        	}
    	} 
	}
});

//reset timer
function resetTimer() {
	clearInterval(timer.clearTime);
	timer.seconds = 0;
	timer.minutes = 0;
	$('.timer').text('0:00');
	timer.clearTime = setInterval(startTimer, 1000);
};

//reset button
$('.restart').click(function(card){
 	resetOpen();
 	$('li').removeClass('show');
 	$('li').removeClass('open');
 	$('li').removeClass('match');
 	shuffleCards();
 	moveCounter = 0;
 	updateMoveCounter();
    matched = 0;
    resetTimer();
    clearInterval(timer.clearTime);
    resetStars();
 });

//play again button
$('.play-again').click(function(card){
 	resetOpen();
 	$('li').removeClass('show');
 	$('li').removeClass('open');
 	$('li').removeClass('match');
 	shuffleCards();
 	moveCounter = 0;
 	updateMoveCounter();
    matched = 0;
    resetTimer();
    clearInterval(timer.clearTime);
	resetStars();
	myModal.css('display','none');
 });

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}