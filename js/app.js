/* Memory Game */
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
let moves = 0;
let counter = document.querySelector(".moves");

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

//keep cards open if they match
var setMatch = function() {
	open.forEach(function(card) {
		card.addClass('match');
	});
	open = [];
	matched += 2;
};

//reset open
var resetOpen = function() {
	open.forEach(function(card) {
		card.toggleClass('open');
		card.toggleClass('show');
	});
	open = [];
};

//open the card using classes to show the first and second card
function openCard(card){
 	if (!card.hasClass('open')){
 		card.addClass('open');
 		card.addClass('show');
 		open.push(card);
	}
};

//click function, using match and time
$('.card').click(function onClick(){
 	if (isValid( $(this) )) {
 	  	if (open.length === 0) {
 	  		openCard( $(this) );
 	  	} else if (open.length === 1) {
 	  		openCard( $(this) );
 	  		moveCounter();
 	    	if (checkMatch()) {
            	setTimeout(setMatch, 300);
        	} else {
            	setTimeout(resetOpen, 700);
        	}
    	} 
	}
});

//move counter
function moveCounter(){    
    moves++;    
    counter.innerHTML = moves;
}

//test for restarting the cards
 $('.restart').click(function(card){
 	resetOpen();
 	$('li').removeClass('show');
 	$('li').removeClass('open');
 	$('li').removeClass('match');
 	shuffleCards();

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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */