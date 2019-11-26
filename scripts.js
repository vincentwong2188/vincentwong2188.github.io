const TypeWriter = function(txtElement, words, wait=3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = ''; // set to nothing by default
    this.wordIndex = 0; // index of the word, 0 by default
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false; // represents the state if it is deleting or not (true if it is backspacing)
}

// Type Method
TypeWriter.prototype.type = function(){ // we use a prototype

    // Get current index of word (in the array)
    const current = this.wordIndex % this.words.length; // total length of array
    // get full text of current word
    const fullTxt = this.words[current];

    // Check if it is in the deleting state
    if(this.isDeleting){
        // Remove character
        this.txt = fullTxt.substring(0, this.txt.length - 1);


    } else {
        // Add character
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;


    // Initial Type Speed (typing - slow, deleting - fast, get to end - pause): since this is dynamic, we use let
    let typeSpeed = 300;

    if (this.isDeleting){
        typeSpeed /= 2;
    }

    // check to see if the word is complete. if it matches, we move on to the next word

    if (!this.isDeleting && this.txt === fullTxt){
        typeSpeed = this.wait; // we want it to pause at end - set it to wait value
        // set delete to true
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === ''){ // when it is backspacing and has backspaced the full word, we want to switch words
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
    }


    setTimeout(() => this.type(), typeSpeed); // each time a character is being typed in/ deleted, this is still running. we want to run it at a certain pace

}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init); // we listen for the DOMContentLoaded event, and run function init
// init function will init our app

// Init App
function init(){
    //get span, attributes - words, data wait time, data attributes, etc

    //grab elements
    const txtElement = document.querySelector('.txt-type'); // class = 'txt-type'
    const words = JSON.parse(txtElement.getAttribute('data-words')); // must parse it so that we can get words out, else it will just be a string
    const wait = txtElement.getAttribute('data-wait');

    //Init Typewriter
    new TypeWriter(txtElement, words, wait)
}

