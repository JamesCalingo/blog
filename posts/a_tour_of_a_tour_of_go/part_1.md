---

title: "Tour de Go Part 1"
subtitle: "The Basics: Part 1"
date: 11 January 2024
published: false

---

## PART 1: The Basics Part 1: Packages, Variables, and Functions

Based on [https://go.dev/tour/basics/1](https://go.dev/tour/basics/1)

In this section, we're going to go over the basic things you should know about Go.

The tour breaks the "Basics" into three distinct categories; each one is pretty hefty, so I'm going to give each category its own page.

### Packages

Packages are how Go programs are structured.

Every program requires a `main` package where the program starts running. This package has a `main` function that takes in no values and returns nothing (unlike other languages where you can take command line arguments and/or return an integer). Go will automatically execute this `main` function when you run the program.

We’re also introduced to the idea of…

### Imports

Imports are how we can get code from other areas of the Go ecosystem into our local program: either from Go’s built in libraries or from other packages online. 

Packages can be divided into directories (i.e. bits of the package with certain features). For example, Go’s `math` package has a directory called `rand` which generates (pseudo) random numbers and can be imported as `math/rand`. When this is done, Go imports the aspects of `rand` - but NOT `math`.

Go also has a feature that helps clean up code: If you’re importing multiple packages, you can “factor” the import statement; instead of having to write

```
import “fmt”
import “math”
```

We can simply write it as

```
import (
“fmt”
“math”
)
```

Something interesting I found: I’m not sure if it’s related to the official Go extension in VSCode, but Go code tends to autoformat itself when you hit save. If you’re importing things from outside the main library of Go, then the formatter adds a blank line between the main library imports and the external imports.

For example, I have a file that uses both standard Go library features, and a package from GitHub. Whenever I hit save, the import statement becomes

```
Import (
“fmt”

“github.com/package”
)
```

There is one other important thing to consider: In Go, things exported to or from other packages are capitalized (or, in technical terms, PascalCase). For example, if we wanted pi from Go’s `math` package, the way to import it is as `math.Pi` (as opposed to something like JavaScript’s `Math.PI`; if you’re wondering why “PI” is in all caps I think I know why but I’ll explain later).

### Functions

Functions in Go work pretty much like functions in other languages: they take values and do things with them. There are a few things to consider, however:

- First, Go’s keyword for declaring functions is `func` - short and easy (and probably a bit less confusing than Python's `def`). More importantlly, however, is that Go is a statically typed language. More often than not (and we'll get to the "not" in a sec), you have to explicitly state what type variables are going to be when declaring them(or function parameters and return values). This means that if there are any parameters for the function, their types must be declared, and the same goes for return values - with one exception. Seemingly, you don't need to do this if the function returns nothing (i.e. Go implicitly uses `nil` - its version of `null`/`None`/`void` - as the return type)

It’s noted that type declaration in Go occurs AFTER the variable is named rather than before it. This is because other languages (namely C and Java) have you declare the type BEFORE the variable name (I.e. `int x` in C and Java is `x int` in Go). Also, if you have multiple parameters of the same type, you can simply put the type after the last parameter (so instead of `a int, b int`, you can simply say `a, b int`).

Go has a couple of features within its functions that I’m willing to bet you haven’t really seen before; from what I can tell, it’s because they’re rather unique (i.e. most of the other “mainline” programming languages don’t use them).

They are:

### Multiple Results

You can return more than one thing from a function in Go! Other languages support something similar to this, but that's usually via something called a tuple (which is, more or less, a group of values that's immutable).

The other unique thing in Go:

### Named Returns

Sometimes referred to as a "naked" return, this one's kinda...weird.

In Go, you can use the `return` keyword at the end of a function without saying what you're returning so long as the parameters (i.e the inputs) are set within the function. In essence, you put the parameters in, set them in the function (i.e. give them some form of value rather than just having them do things inside the code), and then can just say "return these parameters" with just the `return` keyword.

I get that this makes little to no sense, so here's the example used in the tour:

```
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}
```

This function will return 2 integers; for example, the input in the tour is 17, and the function returns 7 and 10 (TECHNICALLY 17*4/9 isn't 7, but due to this function being all integers we don't have access to what's after the decimal point).

This is markedly different from other languages; while I can’t speak for most languages, I’ve used `return` followed by nothing in JavaScript as a shorthand for `return false` (i.e. this code didn’t behave the way we wanted it to; let’s get the blank out of here before we ruin anything). Also, the tour states that, as you may expect from this feature, it should be EXTREMMELY situational as it can make things confusing.

### Variables

Variables are, as always, values used in your code. As mentioned in the functions section, Go is statically typed, so variables must have their type either explicitly declared (via keywords that we'll get into in a sec) or inferred (by setting the initial value of the variable to something). Also, s mentioned earlier, Go has you name the variables then their type rather than the other way around like C and Java.

Similar to function parameters, you can make a list of variables and give a type at the end, and all the variables will have that type. If you give values to every variable set this way, you don't have to give a type, and you can in fact use multiple types when declaring variables.

Variables in Go can be at "package" level or "function" level. From what I can glean from the code example, this is very similar to ES6's `let` and `const` keywords with local scope (i.e. you can declare a variable inside a block of code and say that only that code has access to the variable).

There are multiple ways to declare variables in Go:

- Much like (old school) JavaScript, you can use the `var` keyword. Notably, variables declared this way don’t need values, but again, they do need types (i.e. if you want to declare `var x` without a value, it still needs to have a type attached to it). If you initialize variables without values this way, each type in Go has a default “setting” otherwise referred to as a __zero value__: `int` is `0`,  `bool` is `false`, and `string` is `“”` to name a few (i.e. `var x int` creates a variable called `x` and sets its value to 0).
- You can also do something SIMILAR TO Python (emphasis on “similar to”): you can name a variable and then set it equal to a value using `:=`. For example, `x := 1` means "Create a variable called 'x' and set its value to 1 - thus making it an integer type". This is only available inside the body of a function however; you can't do it anywhere else (and from what I can gather, it's mainly a shorthand for local variables).

### Basic Types

Go has quite a few basic types - mainly surrounding integers.

The `string` and `bool` types are essentially the same as other languages (though I’m not sure if `string` here is more similar to its C definition or other languages). Integers, on the other hand, are broken down into various sizes (from 8-bit to 64-bit), whether or not they’re signed (I.e. can they be negative since that has significant effects on the range), and whether or not we want to include decimals (i.e. floats).

There’s also a few aliases Go uses:

- `byte` - an unsigned 8 bit integer (i.e. 0-255)
- `rune` - a regular 32- bit integer (used for Unicode purposes)

For the most part, though, unless you’re dealing with a situation where you specifically need a certain sized integer, `int` and/or `uint` should work fine - they’re sized based on the system they’re based in (32-bit or 64-bit).

### Type Conversions

You can convert a variable to another type (i.e. make an integer a float). The syntax to do this, in essence, is to use the type you want as a function with the value you want to convert as a parameter:

```
float64(64)
```

Note that in order to “return” a value in a different type, you must type convert explicitly. This is one of the places where Go is stricter than C, as C has the ability to infer when you're trying to type convert. For example, in order to get a `float64` for a divide function that takes two integers, you have to convert the result inside the function body (and even then, you have to convert BOTH integers or else you’re going to get the integer division result as an integer converted into a float).

### Type inference

The tour mentions type inference here. I discussed this back when we were discussing the basics of types, but for reference:

Go infers types for variables based on the values if no type is given. 

### Constants

Much like ECMAScript 6 (i.e. ES6; it’s basically the forerunner of current day JavaScript), you can declare constants using the `const` keyword. Note that in order to declare a constant, you MUST go the keyword route; you can’t declare constants with `:=`. Part of this is probably because, in practice, constants are more often declared outside of functions (where `:=` is totally unavailable).

There’s also Numeric constants, which I’m not sure of their use, but apparently they are higher precision values (i.e. bigger than the standard `int` range).

Also, as a side note, remember when I mentioned the fact that JavaScript had `math.PI` as opposed to something like `math.pi`? I believe that is because JavaScript did not have the `const` keyword until ES6; before then, if you needed to declare a value you wanted to make sure your fellow devs knew should remain constant, you named it in all caps (I assume; I wasn't doing computer programming in those days, but I've heard about pre-ES6 conventions). Notably, I believe Python currently still uses this convention as it doesn't use keywords to declare variables.

***

And that's it for now. Next up: Looping and conditionals.

[SECTION 2]()