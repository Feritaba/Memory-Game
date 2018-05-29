/* Memory Game */
let deck = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
 "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf",
 "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
let open = [];

//shuffles the deck it would be ready to click
function startGame(){
	deck = shuffle(deck);
	let index = 0;
	$.each($(".card i"), function(){
		$(this).attr("class", "fa " + deck[index]);
		index++;
		});
	}
$(startGame);

//checking if the card is open or match
function isValid(card){
	return !(card.hasClass("open") || card.hasClass("match"));
};

//open the card using classes to show the first and second card
function openCard(card){
 	if (!card.hasClass('open')){
 		card.addClass('open');
 		card.addClass('show');
 		open.push(card);
	}

};

//click to show the card, we can just click on 2 cards
 $(".card").click(function onClick(){
 	if (isValid( $(this) )) {
 		if (open.length < 2) {
 			openCard( $(this) );
 			setTimeout(function(){
            	open.forEach(function(card){
            		card.removeClass('open','show');
            	});
    		}, 1000);
 		}
 	}
 });

//test for restarting the cards
 $(".restart").click(function(){
 	startGame();
 	card.removeClass('open');
 	card.removeClass('show');
 	card.removeClass('match');
 	open = [];
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

// var allCards = document.querySelectorAll('.card');
// var openCards = [];

// allCards.forEach(function(card) {
// 	card.addEventListener('click', function(e) {
		

// 		if (openCards.length >= 2) {
// 			setTimeout (function(){
// 				openCards.forEach(function (card){
// 					card.classList.remove('open' , 'show');
// 				});
// 			}, 500);
// 		} else {
// 			openCards.push(card);
// 			card.classList.add('open', 'show');			
// 		}
// 	});
// });