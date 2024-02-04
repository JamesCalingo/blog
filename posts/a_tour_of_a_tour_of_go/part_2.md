---

title: "Tour de Go Part 2"
description: "The Basics: Part 2"
date: 11 January 2024
published: false

---

## PART 2: The Basics Part 2: Flow Control Statements

Based on [https://go.dev/tour/flowcontrol/1](https://go.dev/tour/flowcontrol/1)

Flow control, or how programs make decisions, is vital knowledge for any programming language. Here, we're going to look at how Go handles this concept. SPOILER ALERT: If you've ever worked in just about any programming language (save for Markup or Style languages), you've most likely worked with flow control before.

### For

If you’re coming from JavaScript, you SHOULD already know how this works (though I’ve heard stories about "React Randys" not knowing how to do this). However, if you're not familiar with `for` loops, let's start by breking down the 

```
for i := 0; i < 10; i++
```

- `for i := 0` is the *init statement*. This starts the loop at its first iteration.
- `i < 10` is the *condition statement*. This tells the program when to stop running; if it's true, the program will stop.
- `i++` is the *post statement*. If the condition is false, this will run and then the code in the loop will execute (BTW, ++ is a common shorthand for "add 1")

There does exist, however, a SLIGHT syntax difference in Go: the init, condition, and post statements aren’t wrapped in parentheses (i.e. in JavaScript), and brackets declaring the code to be run are ALWAYS required (JavaScript, notably, allows the omission of brackets if you’re doing short one-liners mainly).

The init (`i := 0`) and post (`i++`) statements are optional, which leads to a bit of a twist: `for` is the only word used in Go for declaring loops! Our replacement for `while` (probably the second most common looping keyword): a simple `for` loop with only a condition statement (typically involving an integer, but can be `true`). If you were to eliminate the condition statement, your `for` loop could, in theory, run infinitely (though you'd likely end up crashing your computer at some point).

### if

Again, this should be familiar if coming from other programming languages. For those unfamiliar, `if` is a common keyword in programming meant to indicate a conditional statement (i.e. if something is true, do x).

 Much like for loops, `if` statements do not use parentheses. You can also run small bits of code (i.e. declare a variable you want to compare) inside of an `if` statement; I BELIEVE other languages let you do this, but it's fairly uncommon. It should also be noted that a variable declared this way is, to borrow from JavaScript, _block scoped_; it can only be used inside of the `if...else` block (Oh yeah, we also have `else` statements here, and functionally they're the same as other languages).

### switch

It's generally considered unwise to have a bunch of `if...else` statements in a program as it can become (moderately) unreadable. Therefore, it's common to use something called a `switch` statement as syntactic sugar over `if...else`.

As you may expect (especially if you've done enough coding), the statements in a switch statement are evaluated top to bottom: the first thing you write gets checked first, and if it's true it runs; if it's false then the next statement is checked.

Go is no different...except when it is, and that is because each `case` in a Go `switch` statement implicitly ends with `break`. The `break` keyword is used to escape loops or switch statements in other languages, meaning that multiple things can occur if more than one of the switch conditions is met. Go, however, does not do this - it immediately stops running once it hits the first true statement.

IF this is a bit confusing, imagine the following code (note that it's...a bit not quite right, but we'll ignore that for our purposes):

```
switch x:
    case x > 10 {
        print("X is greater than 10")
    }
    case x > 20 {
        print ("X is also greater than 20")
    }
```

In languages such as JavaScript, both statements will trigger, so you'll have both `X ix greater than 10` and `X is also greater than 20` in your output unless you add `break` to the first statement (though in theory it's better to have it for all statements). Go, however, implicitly breaks at the first statement, so even if X is, say, 21, you'll only see `X is greater than 10`.

If you don't put a condition into the `switch` statement, the default behavior is to run it as `switch true`.

(Small sidenote: the example here uses Go's `time` module, and a note indicates that the Go playground's "epoch" is November 10, 2009 - the date the first version of Go was released)

### defer

I THINK this is, in essence, the start of learning about asynchronous programming, but I'd have to `defer` to someone who knows this stuff better than I do.

Sorry about that. Anyway...

The `defer` keyword holds off on executing whatever function is being deferred until the surrounding code finishes executing (it's akin to JavaScript's `async/await` pattern).

Deferred functions run in a stack (i.e. last-in-first-out). That is to say that the last thing to be deferred executes first, and the first thing to be deferred executes last. The tour uses this block to illustrate:

```
    fmt.Println("counting")

	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}

	fmt.Println("done")
```

When executed, the program will print "counting", then take printing "0" and put it in the stack (not stack memory IIRC), then take printing "1" and put it "on top" of printing "0", then take printing "2" and put it on top of printing "1", and so on. As soon as printing "9" is put on the stack, the program prints "done", goes to the stack, and takes printing "9" off the top and executes it. Then, it takes printing "8" from the stack and executes, and so on until the stack is empty (printing "0").

***

Next up: more on data types - some of which will be rather new if you've never used a language with memory access.

[SECTION 3]()