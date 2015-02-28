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
            if(withoutLetter.length > allPossibilities[x].length)
            {
                dictionary = withoutLetter;
            }
            else
            {
                dictionary = allPossibilities[index];
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
        for(var x in countOne)
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
    $('#dictionary').click(function(){ 
        var gameDictionary = new Dictionary();
        gameDictionary.wordSize(5);
        gameDictionary.guessLetter('a');
    });

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