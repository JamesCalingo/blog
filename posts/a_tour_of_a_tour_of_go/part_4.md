---

title: "Tour de Go Part 4"
description: "Methods and Interfaces"
date: 11 January 2024
published: false

---

## PART 4: Methods and Interfaces

Based on [https://go.dev/tour/methods/1](https://go.dev/tour/methods/1)

We're largely going to discuss a few things involving functions in Go here. Be aware that a lot of this is rather unique to Go, so let's dive in:

### Methods

Go, much like C, does not natively have classes (heck, C++ was originally “C with Classes”). However, it does still have the ability to declare _methods_ for types and structs using something known as a receiver. A receiver is a special argument added when declaring a function BEFORE the name of said function; for example, if you wanted a struct named Animal with a string field called "Name", you could declare it like this:

```
type Animal struct {
Name string
}
```

then declare a method for animal as follows:

```
func (a Animal) SayHello() string {
return fmt.Sprintf("%v says \"Hello!\"", a.Name)
}
```

and finally, to name an animal "Bob" and have it "speak" in main:

```
func main() {
bob = Animal{"Bob"}
fmt.Println(bob.SayHello())
}
```
You can make this receiver a pointer as well - something that, IMO, is EXTREMELY important to know. When you do this, you can modify the value of what the function is pointing to. Notably, this ends up being pretty common in practice, as value receivers work on copies of the values and not the values themselves. Note that if you're using a pointer as a function argument, you have to provide a pointer (with the `&` indicator); however, methods that take pointers can be done without pointers (you just won't get what you may expect); also, the reverse is true (using a value in a function argument means you have to supply a non-pointer value).

Finally, the tour indicates the different reasons to use pointer or value receivers, concluding that mixing them is bad (but doesn't quite get into why, though it promises to do it soon).

## Interfaces

An _Interface_ is a type similar to a struct in that it's a set of values; however, it's a set of method signatures (i.e. function names).

Multiple types/structs can use the same interface.

I realize this is sorta confusing, so let's look at the tour's example (or at least the relevant parts of it):

```
type Abser interface {
	Abs() float64
}

func main() {
	var a Abser
	f := MyFloat(-math.Sqrt2)
	v := Vertex{3, 4}

	a = f  // a MyFloat implements Abser
	a = &v // a *Vertex implements Abser


	a = v

	fmt.Println(a.Abs())
}

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
```

Let's break this down:

1. We start by declaring an interface called `Abser`, which has a method called `Abs` which returns a float.
2. `main` is declared next, but we'll come back to it since it's more or less the endpoint of what's going on here. Instead, let's go to the `MyFloat` type declaration: Methods can't be declared on types that aren't defined locally (i.e. the built in types), so we have to create our own version of `float` to be able to declare a method on it.
3. The `MyFloat` type is given its version of the `Abs` method.
4. A struct called `Vertex` is created, and the `Abs` method is added to POINTERS of verticies - not on instances of `Vertex` itself.
5. With all that established, let's go back to `main`. First, a variable called `a` is declared with no initial value and given the type of `Abser` (i.e. the interface). Then, we throw in a `MyFloat` and a `Vertex` and set `a` to be the `MyFloat`, then as a pointer to the `Vertex`, then finally the `Vertex` itself. We then ask the program to print `a.Abs()` - i.e. asking it to print the value of `Vertex.Abs()`. However, remember that we declared the `Abs` method on POINTERS to `Vertex`, NOT `Vertex` itself. Therefore, `Vertex` does not have the `Abs` method, and this we get an error.

Anyway, we can implicitly implement an interface

Another thing to consider: interface values also come paired with the type of the value.

There's also _nil interface values_, which do something.
We also have _empty interfaces_, which can hold values of any type useful for internal things (like printing when you don't know what type of value is going to be printed).

### Type assertions

---

At this point, we're just introduced to a few standard interfaces from in and around the Go library.

### Stringers

_Stringer_ is an interface within the `fmt` package (i.e. one of the most standard packages in Go). The tour 

### Errors

One of the most common error handling processes in Go is to check that the error is not `nil`.

### Readers

Readers is from the `io` package (input/output). It 

### Images

Finally, there's `package image` and its `image` interface.

***

Hopefully that helps us understand these important features better (again, I strongly recommend staying with these examples and re-reading them until you understand them clearly). Up next: something a bit more...generic.

[SECTION 5]()