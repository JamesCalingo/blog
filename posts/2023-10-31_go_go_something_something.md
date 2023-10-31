---

title: "Go Go...Something Something"
description: "Or how to be a Go getter"
date: 31 October 2023
published: true

---

In my never ending quest to learn as many of the things as I can (within reason), I like to try doing small projects to see how I do with them. 

This time, I decided to do something I’d been meaning to do for a while: a simple game.

The “Psychic game”, as I call it, is one of the first “real” programming things I did in a coding bootcamp back in the day. The idea is that a letter is randomly selected from the alphabet, and the player has to guess which letter. You can check out my original (HTML/JavaScript) version [here] (https://jamescalingo.dev/PsychicGame/), complete with probably-inspired-by-Chandler-Bing pithy comments that are probably not necessary at all (RIP Matthew Perry).

Many moons ago, I did a Python version of it inspired by something I saw on LinkedIn. After I finished that, I even attempted to do a version in Rust using the Rust book’s tutorial for a number game (I haven’t gotten it past that point, however, because Rust is not a great beginners language). However, there’s one language that I’d been meaning to check out that I hadn’t yet: Go.

Until last Friday.

I decided to try making the game in Go to see how I would do with a 100% blank slate: No guides, no tutorials - just googling things and trying them out to see what stuck.

Today, I’d like to talk a little bit about the process of doing this. I’m going to be a bit broad about this because I think it's better for those learning coding to see a broader picture of what it is rather than specifics.

**STEP 1: Identify the pieces you need**

The first thing you need is a “platform”, if you will, to play the game on. Yes, you’re playing this on a computer, but the “how” is what I’m trying to talk about here. This is part of why HTML/JavaScript are popular for newcomers: there’s a super easy way to see code work because it runs (almost) natively in the browser. Go, on the other hand, isn’t natively supported by most web browsers, so I had to find something else to run the game in, and that something is known as a command line interface. I won’t get too deep into what that is, but if you’re using a Mac, it’s the Terminal program (I know there are equivalents for Windows and Linux, but I’m not sure what they’re known as).

Next, you need the letters and a way of selecting one of them. Typically, you’d use an array with all the letters of the alphabet - preferably in one case for VERY IMPORTANT reasons I’ll get into in a sec (I typically use lower). Generally, you’d want to use an array that contains the 26 letters of the alphabet, but I believe some languages would let you use a string if you so chose (though I’d argue an array is easier for multiple reasons).

You also need some way of selecting a random letter from said array. Thankfully, some programming languages (or at least the ones I’ve used save for maybe SQL) come with a way to generate random numbers, and thus make the randomization part of this game quite trivial.

The last few things you need for this are, like the number randomizer, generally standard with most languages: ways to guide the player via print statements, ways to accept player input (more on this later because Go does something rather unique in this regard), ways to tell the program what to do based on the guess (i.e. if statements), and a way to “run” the game, so to speak, which brings me to…

**STEP 2: Design the game loop**

 When a player inputs a guess, one of two things should happen: Either the player will have guessed correctly and the game ends, or the player guessed incorrectly and the game continues. Some form of loop is required for this, as without it, the player gets only one guess.

However, there’s one thing I forgot to mention in the last section that we need to consider: whether or not we want the player to have infinite guesses. My original version of this game had a 10-guess limit which I’ve carried to subsequent versions, but in writing this post I’ve realized that maybe a 5/13 chance of “winning” isn’t so great. If we are going to use a guess limit, though, it’s important to remember that numbers can go negative, so we need to make sure the game stops once the player hits 0 chances left.

In any case, most programming languages use something called a “while loop” to facilitate this, but in doing this project, I found out that the “while” keyword doesn’t exist in Go! Instead, Go uses the “for” keyword and you can simply put your condition in (i.e. our guess limit in the form of guesses > 0).

However, if we tried running this, once the player either wins or loses, the program doesn’t actually stop running! This leads to something that’s we need to stop our loop: the break keyword. This tells the program to get out of the loop after whatever is before it in its code block is executed. For our purposes, this is how we’re going to end the game when the player either wins (guesses the correct letter) or loses (runs out of guesses).

So we have our pieces, and through loops and if statements, have at least some of our logic down. However, I’d like to go a bit further.

**STEP 3: “Idiotproofing”**

This is something I feel like a lot of newer programmers would potentially overlook, but I think it’s important: some people are either going to not understand your game at all, or try REALLY HARD to break it because why not. Therefore, I like to try to “safeguard” the game by checking if something potentially gamebreaking happens and being ready for it. Here are a few of the ways a player could end up going outside the intentions of the game:

A. Putting in a number or symbol like 9, +, or even ñ. Personally, I’d rather not penalize the player for guessing the number 0 instead of the letter O.

B. Putting in a capital or lower case letter when expecting the other.

For those of you learning coding, upper case and lower case letters are considered completely different things in just about every programming language due to something known as The Unicode Standard (imagine an echoey voice saying that). This standard provides unique identifiers for characters in different languages (i.e. things like accents typically found in Spanish or French but not English), but also provides identifiers for other characters such as [the logo of that website whose owner wants you to forget used to be Twitter](https://www.compart.com/en/unicode/U+1D54F).

Upper and lower case letters have their own Unicode identifiers, and since the game is actually checking those identifiers rather than the letters themselves, it sees “A’, and “a” as two different things, which would mean that should one be the answer and the other was the guess, would be considered incorrect.

To “get around” this, many languages have methods that change the case of letters in a string (i.e. a "to*Other*Case" method). 

C. Putting in more than one character.

We’re expecting only one letter as an answer, so we should account for if the player “fat fingers” an answer (like “we”), or worse, tries to somehow cheat by doing something like trying to guess “thequickbrownfoxjumpedoverthelazydog” since the answer’s gotta be in there somewhere, right?

For all of these cases, I put in a statement that tells the player that these are not going to work without penalizing them, and for the most part, this works!

Keyword “for the most part”.

Notably, Go does something interesting where multiple inputs separated by whitespaces are evaluated individually - if you put multiple single letters in separated by spaces, they will ALL be evaluated for whether or not they’re correct. This poses an interesting quandary for our game - and one I’m still trying to figure out how to “solve”.

Finally, there’s one other thing I’m still trying to figure out: protecting against guessing a letter that’s already been guessed - I have this in other versions but am still trying to get it to work in Go. If you know how to do this (or see something important that I missed in this version), let me know!

Anyway, that's been quite a bit, but I hope it gives some insight on how learning how to code works.

(Also, yes I know I'm publishing this on Halloween)