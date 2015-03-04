function Dictionary()
{
    var dictionary = getDictionary();
    var DEBUG = true;
    
    // destructive method
    function wordSize(length)
    {
    	// back end traversal because much faster when removing in an arrayList (at least when removing a huge %)
        for(var x in dictionary)
        {
            var temp = dictionary[x];
            if(temp.length != length)
            	delete dictionary[x];
        }
        return wordCount();
    }
    function guessLetter(letter)
    {
        var withLetter = [];
        var withoutLetter = [];
        for(var x in dictionary)
        {
        	var word = dictionary[x];
        	if(contains(word,letter))
        	{
        		withLetter.push(word);
        	}
        	else
        	{
        		withoutLetter.push(word);
        	}
        }
        if(DEBUG)
        {
        	console.log("num words with letter "+letter+": "+withLetter.length+"/"+wordCount());
        	console.log("num words without letter "+letter+": "+withoutLetter.length+"/"+wordCount());
        }
        // CHANGE TO ADD DIFICULTY + RANDOMIZATION
        if((withoutLetter.length*1.0)/(wordCount()*1.0) > .5)
        {
        	dictionary = withoutLetter;
            return false;
        }
        else
        {
        	var allPossibilities = possibilities(letter, withLetter);
        	console.log(allPossibilities);
            var index = 0;
            var max = 0;
            for(var x in allPossibilities)
            {
                if(allPossibilities[x].length > max)
                {
                    index = x;
                    max = allPossibilities[x].length;
                }
            }
            if(DEBUG)
            {
                console.log("max size is " + max);
                for(var x in allPossibilities)
                {
                    console.log("itteration " + x + " with size " + allPossibilities[x].length);
                    //print(allPossibilities[x]);
                }
            }
            if(withoutLetter.length > allPossibilities[index].length)
            {
                dictionary = withoutLetter;
                return false;
            }
            else
            {
                dictionary = allPossibilities[index];
                return {
                    array: locations(allPossibilities[index][0],letter,count(allPossibilities[index][0],letter)),
                    letter: letter
                };
            }
        }
    }
    function firstDefined(array)
    {
    	for(var x in array)
    	{
    		if(array[x] != undefined)
    		{
    			return x;
    		}
    	}
    	return -1;
    }
    function possibilities(letter, wordPool)
    {
    	var allPossibilities = [];//*************************************************************************************************************************************************************************************************************************************************************************
        var firstWordIndex = firstDefined(wordPool);
        while(firstWordIndex != -1)
        {
	    	var matching = [];
	        var firstWord = wordPool[firstWordIndex];
	        for(var x in wordPool)
	        {
	            var temp = wordPool[x];
	            if(temp === undefined)
	            	continue;
	            if(match(firstWord,temp,letter))
	            {
	            	matching.push(temp);
	            	delete wordPool[x];
	            }
	        }
	        allPossibilities.push(matching);
            firstWordIndex = firstDefined(wordPool);
        }
        return allPossibilities;
    }
    function match(one, two, letter)
    {
    	var countOne = count(one,letter);
    	var countTwo = count(two,letter);
    	if(countOne != countTwo)
    		return false;
        var indexOne = locations(one, letter, countOne);
        var indexTwo = locations(two, letter, countTwo);
        for(var x in indexOne)
        {
        	if(indexOne[x] != indexTwo[x])
        		return false;
        }
        return true;
    }
    function contains(word, letter)
    {
        for(var x in word)
        {
            if(word[x] === letter)
                return true;
        }
        return false;
    }
    function count(word, letter)
    {
        var count = 0;
        for(var x in word)
        {
            if(word[x] === letter)
                count++;
        }
        return count;
    }
    function locations(word, letter, count)
    {
    	var output = new Array(count);
    	var counter = 0;
    	for(var x in word)
    	{
    		if(word[x] === letter)
    			output[counter++] = x;
    	}
    	return output;
    }
    function wordCount()
    {
    	var count = 0;
        for(var x in dictionary)
        {
            if(dictionary[x] != undefined)
                count++;
        }
        return count;
    }
    //too slow for any use on full dictionary
    function print()
    {
        for(var x in dictionary)
        {
        	if(dictionary[x] != undefined)
            	console.log(dictionary[x]);
        }
    }
    function printArray(array)
    {
        for(var x in array)
        {
        	if(array[x] != undefined)
            	console.log(array[x]);
        }
    }
    function reconOne(keyList)
    {
        if(dictionary.length === 1)
        {
            var word = dictionary[0];
            for(var x = 0; x < word.length; x++)
            {
                console.log(word);
                if(!keyList[word[x]])
                {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    return {
    	wordSize: wordSize,
	    guessLetter: guessLetter,
	    print: print,
	    printArray: printArray,
        reconOne: reconOne
	};
}


$(document).ready(function() {
    var gameOver = false;
    var gameDictionary = new Dictionary();
    var wordLength = 8;
    gameDictionary.wordSize(wordLength);
    var guesses = guessTracker();
    var numGuesses = 0;
    var numGuessesToLose = 10;
    var wordToGuess = wordToString(false);

    var keyList = {'q':0, 'w':0, 'e':0, 'r':0, 't':0, 'y':0, 'u':0, 'i':0, 'o':0, 'p':0, 
                   'a':0, 's':0, 'd':0, 'f':0, 'g':0, 'h':0, 'j':0, 'k':0, 'l':0, 
                   'z':0, 'x':0, 'c':0, 'v':0, 'b':0, 'n':0, 'm':0};
    $("#guesses").html("Guesses Left: " + (numGuessesToLose - numGuesses));


    gameDictionary.wordSize(8);
    var result = {};

    $('#qButton').click(function(){
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#wButton').click(function(){
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#eButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#rButton').click(function(){
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#tButton').click(function(){
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#yButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#uButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#iButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#oButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#pButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });


    $('#aButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#sButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#dButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#fButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#gButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#hButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#jButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#kButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#lButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });


    $('#zButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#xButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#cButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#vButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#bButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#nButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    $('#mButton').click(function(){ 
        $(this).css('color','red');
        guessEvent(this, $(this).html()[0].toLowerCase());
    });
    
    function check(result)
    {
        if(result === false)
        {
            guessesToString(false);
            if((numGuessesToLose - numGuesses) <= 0)
            {
                alert("YOU SUCK");
                gameOver = true;
            }
        }
        else
        {
            wordToString(true, result.array, result.letter);
            if(gameDictionary.reconOne(keyList))
            {
                alert("YOU WIN");
                gameOver = true;
            }
        }
    }
    function wordToString(initialized, array, letter)
    {
        var tempWord = '';
        if(initialized === false)
        {
            for(var x = 0; x < wordLength; x++)
            {
                tempWord+= '_';
                if(x !== wordLength-1)
                    tempWord += ' ';
            }
            $("#word").html("word is: " + tempWord);
            return tempWord;
        }

        for(var x in array)
        {
            while(tempWord.length < array[x]*2)
                tempWord += wordToGuess[tempWord.length] + ' ';
            if(x != wordLength-1)
                tempWord += letter + ' ';
            else
                tempWord += letter;
        }
        while(tempWord.length < wordLength*2-2)
            tempWord += wordToGuess[tempWord.length] + ' ';
        if(tempWord.length < wordToGuess.length)
            tempWord += wordToGuess[tempWord.length];
        wordToGuess = tempWord;
        $("#word").html("word is: " + wordToGuess);
        return wordToGuess;
    }
    function guessesToString(correct)
    {
        if(correct === false)
        {
            numGuesses++;
            $("#guesses").html("Guesses Left: " + (numGuessesToLose - numGuesses));
        }
    }
    function guessTracker()
    {
        var array = new Array(26);
        for(var x = 0; x<array.length; x++)
        {
            array[x] = false;
        }
        return array;
    }
    function guessEvent(evt,guessedLetter)
    {
        if(!gameOver)
        {
            if(!keyList[guessedLetter])
            {
                keyList[guessedLetter] = 1;
                result = gameDictionary.guessLetter(guessedLetter);
                check(result);
            }
            else
                console.log("happend before");
        }


    }
});






function getDictionary()
{
	return ["aa", "aah", "aahed", "aahing", "aahs", "aal", "aalii", "aaliis", "aals", "aardvark", "aardvarks", 
	"aardwolf", "aardwolves", "aargh", "aas", "aasvogel", "aasvogels", "aba", "abaca", "abacas", "abaci", 
	"aback", "abacus"];
}