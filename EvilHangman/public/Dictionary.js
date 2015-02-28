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

    return {
    	wordSize: wordSize,
	    guessLetter: guessLetter,
	    print: print,
	    printArray: printArray
	};
}


$(document).ready(function() {
    var gameDictionary = new Dictionary();
    var wordLength = 8;
    gameDictionary.wordSize(wordLength);
    var guesses = guessTracker();
    var numGuesses = 0;
    var numGuessesToLose = 10;
    var wordToGuess = wordToString(false);

    $("#guesses").html("Guesses Left: " + (numGuessesToLose - numGuesses));


    gameDictionary.wordSize(8);
    var result = {};
    console.log(result);
    $('#qButton').click(function(){ 
        if(!guesses[0])
        result = gameDictionary.guessLetter('q');
        guesses[0] = true;
        check(result);
    });
    $('#wButton').click(function(){
        if(!guesses[1])
        result = gameDictionary.guessLetter('w');
        guesses[1] = true;
        check(result);
    });
    $('#eButton').click(function(){ 
        if(!guesses[2])
        result = gameDictionary.guessLetter('e');
        guesses[2] = true;
        check(result);
    });
    $('#rButton').click(function(){
        if(!guesses[3])
        result = gameDictionary.guessLetter('r');
        guesses[3] = true;
        check(result);
    });
    $('#tButton').click(function(){
        if(!guesses[4])
        result = gameDictionary.guessLetter('t');
        guesses[4] = true;
        check(result);
    });
    $('#yButton').click(function(){ 
        if(!guesses[5])
        result = gameDictionary.guessLetter('y');
        guesses[5] = true;
        check(result);
    });
    $('#uButton').click(function(){ 
        if(!guesses[6])
        result = gameDictionary.guessLetter('u');
        guesses[6] = true;
        check(result);
    });
    $('#iButton').click(function(){ 
        if(!guesses[7])
        result = gameDictionary.guessLetter('i');
        guesses[7] = true;
        check(result);
    });
    $('#oButton').click(function(){ 
        if(!guesses[8])
        result = gameDictionary.guessLetter('o');
        guesses[8] = true;
        check(result);
    });
    $('#pButton').click(function(){ 
        if(!guesses[9])
        result = gameDictionary.guessLetter('p');
        guesses[9] = true;
        check(result);
    });


    $('#aButton').click(function(){ 
        if(!guesses[10])
        result = result = gameDictionary.guessLetter('a');
        guesses[10] = true;
        check(result);
    });
    $('#sButton').click(function(){ 
        if(!guesses[11])
        result = gameDictionary.guessLetter('s');
        guesses[11] = true;
        check(result);
    });
    $('#dButton').click(function(){ 
        if(!guesses[12])
        result = gameDictionary.guessLetter('d');
        guesses[12] = true;
        check(result);
    });
    $('#fButton').click(function(){ 
        if(!guesses[13])
        result = gameDictionary.guessLetter('f');
        guesses[13] = true;
        check(result);
    });
    $('#gButton').click(function(){ 
        if(!guesses[14])
        result = gameDictionary.guessLetter('g');
        guesses[14] = true;
        check(result);
    });
    $('#hButton').click(function(){ 
        if(!guesses[15])
        result = gameDictionary.guessLetter('h');
        guesses[15] = true;
        check(result);
    });
    $('#jButton').click(function(){ 
        if(!guesses[16])
        result = gameDictionary.guessLetter('j');
        guesses[16] = true;
        check(result);
    });
    $('#kButton').click(function(){ 
        if(!guesses[17])
        result = gameDictionary.guessLetter('k');
        guesses[17] = true;
        check(result);
    });
    $('#lButton').click(function(){ 
        if(!guesses[18])
        result = gameDictionary.guessLetter('l');
        guesses[18] = true;
        check(result);
    });


    $('#zButton').click(function(){ 
        if(!guesses[19])
        result = gameDictionary.guessLetter('z');
        guesses[19] = true;
        check(result);
    });
    $('#xButton').click(function(){ 
        if(!guesses[20])
        result = gameDictionary.guessLetter('x');
        guesses[20] = true;
        check(result);
    });
    $('#cButton').click(function(){ 
        if(!guesses[21])
        result = gameDictionary.guessLetter('c');
        guesses[21] = true;
        check(result);
    });
    $('#vButton').click(function(){ 
        if(!guesses[22])
        result = gameDictionary.guessLetter('v');
        guesses[22] = true;
        check(result);
    });
    $('#bButton').click(function(){ 
        if(!guesses[23])
        result = gameDictionary.guessLetter('b');
        guesses[23] = true;
        check(result);
    });
    $('#nButton').click(function(){ 
        if(!guesses[24])
        result = gameDictionary.guessLetter('n');
        guesses[24] = true;
        check(result);
    });
    $('#mButton').click(function(){ 
        if(!guesses[25])
        result = gameDictionary.guessLetter('m');
        guesses[25] = true;
        check(result);
    });
    
    function check(result)
    {
        if(result === false)
        {
            guessesToString(false);
            //Check IF LOST
        }
        else
        {
            wordToString(true, result.array, result.letter);
            //CHECK IF WON
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




});





function getDictionary()
{
	return ["aa", "aah", "aahed", "aahing", "aahs", "aal", "aalii", "aaliis", "aals", "aardvark", "aardvarks", 
	"aardwolf", "aardwolves", "aargh", "aas", "aasvogel", "aasvogels", "aba", "abaca", "abacas", "abaci", 
	"aback", "abacus", "abacuses", "abaft", "abaka", "abakas", "abalone", "abalones", "abamp", "abampere", 
	"abamperes", "abamps", "abandon", "abandoned", "abandoning", "abandonment", "abandonments", "abandons", 
	"abas", "abase", "abased", "abasedly", "abasement", "abasements", "abaser", "abasers", "abases", 
	"abash", "abashed", "abashes"];
}