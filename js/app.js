/* Memory Game */
let deck = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
 "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf",
 "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

function startGame(){
	deck = shuffle(deck);
	let index = 0;
	$.each($(".card i"), function(){
		$(this).attr("class", "fa " + deck[index]);
		index++;
		});
	}
$(startGame);

function openCard(){
	let counter = 0;
	if (counter < 2) {
		counter++;
		$(this).toggleClass('open');
	}
	else {
		$(this).toggleClass('close');
	}
}

 $(".card").click(function onClick(){
 	openCard();
 });


 $(".restart").click(function(){
 	startGame();
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
