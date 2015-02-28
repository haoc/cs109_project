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
    var guesses = guessTracker();

    var numGuesses = 0;
    var numGuessesToLose = 10;
    $("#guesses").html("Guesses Left: " + (numGuessesToLose - numGuesses));
    $("#word").html("word is: _ _ _ _ _ _ _ _");


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
        gameDictionary.guessLetter('w');
        guesses[1] = true;
    });
    $('#eButton').click(function(){ 
        if(!guesses[2])
        gameDictionary.guessLetter('e');
        guesses[2] = true;
    });
    $('#rButton').click(function(){
        if(!guesses[3])
        gameDictionary.guessLetter('r');
        guesses[3] = true;
    });
    $('#tButton').click(function(){
        if(!guesses[4])
        gameDictionary.guessLetter('t');
        guesses[4] = true;
    });
    $('#yButton').click(function(){ 
        if(!guesses[5])
        gameDictionary.guessLetter('y');
        guesses[5] = true;
    });
    $('#uButton').click(function(){ 
        if(!guesses[6])
        gameDictionary.guessLetter('u');
        guesses[6] = true;
    });
    $('#iButton').click(function(){ 
        if(!guesses[7])
        gameDictionary.guessLetter('i');
        guesses[7] = true;
    });
    $('#oButton').click(function(){ 
        if(!guesses[8])
        gameDictionary.guessLetter('o');
        guesses[8] = true;
    });
    $('#pButton').click(function(){ 
        if(!guesses[9])
        gameDictionary.guessLetter('p');
        guesses[9] = true;
    });


    $('#aButton').click(function(){ 
        if(!guesses[10])
        result = gameDictionary.guessLetter('a');
        guesses[10] = true;
        check(result);
    });
    $('#sButton').click(function(){ 
        if(!guesses[11])
        gameDictionary.guessLetter('s');
        guesses[11] = true;
    });
    $('#dButton').click(function(){ 
        if(!guesses[12])
        gameDictionary.guessLetter('d');
        guesses[12] = true;
    });
    $('#fButton').click(function(){ 
        if(!guesses[13])
        gameDictionary.guessLetter('f');
        guesses[13] = true;
    });
    $('#gButton').click(function(){ 
        if(!guesses[14])
        gameDictionary.guessLetter('g');
        guesses[14] = true;
    });
    $('#hButton').click(function(){ 
        if(!guesses[15])
        gameDictionary.guessLetter('h');
        guesses[15] = true;
    });
    $('#jButton').click(function(){ 
        if(!guesses[16])
        gameDictionary.guessLetter('j');
        guesses[16] = true;
    });
    $('#kButton').click(function(){ 
        if(!guesses[17])
        gameDictionary.guessLetter('k');
        guesses[17] = true;
    });
    $('#lButton').click(function(){ 
        if(!guesses[18])
        gameDictionary.guessLetter('l');
        guesses[18] = true;
    });


    $('#zButton').click(function(){ 
        if(!guesses[19])
        gameDictionary.guessLetter('z');
        guesses[19] = true;
    });
    $('#xButton').click(function(){ 
        if(!guesses[20])
        gameDictionary.guessLetter('x');
        guesses[20] = true;
    });
    $('#cButton').click(function(){ 
        if(!guesses[21])
        gameDictionary.guessLetter('c');
        guesses[21] = true;
    });
    $('#vButton').click(function(){ 
        if(!guesses[22])
        gameDictionary.guessLetter('v');
        guesses[22] = true;
    });
    $('#bButton').click(function(){ 
        if(!guesses[23])
        gameDictionary.guessLetter('b');
        guesses[23] = true;
    });
    $('#nButton').click(function(){ 
        if(!guesses[24])
        gameDictionary.guessLetter('n');
        guesses[24] = true;
    });
    $('#mButton').click(function(){ 
        if(!guesses[25])
        gameDictionary.guessLetter('m');
        guesses[25] = true;
    });
    
    function check(result)
    {
        if(result === false)
        {
            $("#guesses").html("Guesses Left: " + (numGuessesToLose - numGuesses));
        }
    }





});

function guessTracker()
{
    var array = new Array(26);
    for(var x = 0; x<array.length; x++)
    {
        array[x] = false;
    }
    return array;
}





function getDictionary()
{
	return ["aa", "aah", "aahed", "aahing", "aahs", "aal", "aalii", "aaliis", "aals", "aardvark", "aardvarks", 
	"aardwolf", "aardwolves", "aargh", "aas", "aasvogel", "aasvogels", "aba", "abaca", "abacas", "abaci", 
	"aback", "abacus", "abacuses", "abaft", "abaka", "abakas", "abalone", "abalones", "abamp", "abampere", 
	"abamperes", "abamps", "abandon", "abandoned", "abandoning", "abandonment", "abandonments", "abandons", 
	"abas", "abase", "abased", "abasedly", "abasement", "abasements", "abaser", "abasers", "abases", 
	"abash", "abashed", "abashes"];
}