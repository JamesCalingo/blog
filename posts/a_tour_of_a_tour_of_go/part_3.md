---

title: "Tour de Go Part 3"
description: "The Basics: Part 3"
date: 11 January 2024
published: false

---

## PART 3: The Basics Part 3: More Types

Based on [https://go.dev/tour/moretypes/1](https://go.dev/tour/moretypes/1)

This is the final section of "The Basics" as defined by the tour. This is where we're starting to REALLY see how Go is different from some of its contemporaries.

### Pointers

If you haven't worked with a language that uses pointers in the past, then you're probably going to want to spend some time with this.

A pointer is, in short, a variable that holds the memory address of a value - if you have no clue what on earth any of that means, let's try and .

Imagine, if you will, an old school filing cabinet (like [this one](https://upload.wikimedia.org/wikipedia/commons/1/16/Metal_File_Cabinet.jpg)). A memory address is, in this example, one of the drawers of this cabinet. When we declare a variable `x`, it gets placed into one of the drawers in this cabinet.

A pointer would be, in essence, like those little slots on the front of the drawers where you can put a label. In our case, the label is the pointer `p` saying "This is where `x` is stored in the computer's memory".

This leads to an idea that, while a bit hidden in things like JavaScript, is still pretty important: __reference__ and __value__. The importance of pointers (at least in Go) is that when you run functions involving your variables, most of the time you're simply using references of the values (You take `x` out of the drawer, see what it is, and then make a copy of it and work with that copy). If you use a pointer, you actually run the function on the value itself, changing whatever's in that drawer (i.e. taking `x` out of the drawer, working with `x` itself, and then putting the new thing back into the drawer).

In Go, to generate a pointer, a variable is declared with `&` (i.e. `p=&x` means "Create a variable 'p' that points to the memory address of 'x"), and then accessing the pointer is done with `*` (`*p` means "Go to the value p is pointing to").

There's one fairly important application of pointers as it pertains to C, but it's coming up pretty soon so I'll wait until then.

### Struct

A struct is a collection of fields. That’s all the tour says about structs.

However, since we’re trying to understand Go, I think we need to discuss this more.

Go does not necessarily have key:value objects in the same way other languages do (and as we'll see soon, it absolutely does not have classes). In addition, remember that every variable in Go needs to have a type attached to it when it’s declared.

With a struct, you can basically define a type of your own. For example, say we wanted to create a `User` for some website. We could do it like this:

```
type Person struct {
    FirstName string
    LastName string
}

user = Person("John", "Doe")
```

If we wanted to access either of the fields we defined, we do it the same way to access properties in more object oriented languages: `user.FirstName`.

In addition, we can use pointers to access the fields of a struct, and can write the fields as a "struct literal", though I'm still a bit hazy on what exactly is meant by this syntax.

### Arrays

If you’re coming from C, you’re probably familiar with how arrays are handled in Go. For those coming from Python or JavaScript, arrays in C/Go are very similar to the arrays/lists you know with one BIG new rule: You MUST declare how big the array is when declaring it.

This is because of an important detail that gets abstracted away: memory.

In C (and other lower level languages), an array is more of a series of values rather than a collection in that the elements of an array have consecutive memory addresses. If element 1 is at a certain address, element 2 will be at the very next address in memory, and so on until you hit the end of the array. Going back to the filing cabinet, you can think of an array as multiple things that are related to each other in consecutive drawers in the filing cabinet (plus a special "null terminator" in C; not sure if anything similar exists in Go).

I mentioned strings in C earlier; that's because in C, the "string" type _doesn't exist_. Instead, what most languages consider strings are arrays of characters in C. In fact, going back to pointers, one of the ways to declare a string in C is `char *` - a pointer to the first element of said array.

### Slices

If we can't change the size of an array, then what do we do if we want to collect data but don't know how big it's going to be?

That's where slices come in.

In at least one respect, slices in Go are similar to slices in other languages: a subset of an array created by selecting certain elements from said array. However, remember that in Go, the size of an array must be defined upfront. Slices do not have that same restriction, and are thus more flexible than arrays (and, in practice, more common).

It should be noted that slices do not actually store data within them; rather, they're references to arrays (a la shallow copying). If you change data in a slice, then you change data in the array that the slice comes from (in essence a slice is a shallow copy of an array). Also, both arrays and slices have the following syntax available to declare them:

```
[3]int{1, 2, 3}
```

This is an array literal. The slice literal version of this omits the 3 between the square brackets:

```
[ ]int{1, 2, 3}
```

One of the more notable features of slices is its capacity: the number of elements in the array the slice comes from, starting from the first element of the slice. Remember: arrays are fixed size in Go, and technically every slice in Go is built on top of some array, so you do have to be careful because in some instances, it's possible to overrun the end of the array.

Go also has the `make` keyword to create new values; for slices, you can `make` a slice by specifying what type of slice you want (i.e. a slice of ints or strings), its length, and the capacity of the underlying array (though this third argument is optional).

Finally, slices can contain values of any type - including other slices (I THINK this is getting into matrix territory, but I'll leave that for others to discuss).

### Appending to a slice

Appending (adding elements) to a slice is SIMILAR to other languages, but is somewhat different syntactially. Go uses a built in `append` function that takes in two arguments:
1. The slice you wish to append items to
2. The items you wish to append; you can append more than one item at a time

For example, to append 4 into the 1, 2, 3, slice from earlier (which we'll name `kimbo`):

```
kimbo = append(kimbo, 4)
```

It is a little different from other languages which typically use a method that arrays/slices have inherently (for example, this action in Python would be `kimbo.append(4)`).

Similar to other languages, you can append multiple things at a time...but wait: don't we have to worry about capacity?

Not really.

If the array behind Kimbo Slice (RIP) is too small to hold our new values, then Go will allocate a bigger array to hold the values, and our newly appended slice will point to the new array.

### Range

`range` is, in essence, Go's version of a JavaScript `forEach` loop (or, if you're more familiar with Python, list comprehension). It iterates over each value of a slice (or map, which we'll get into in a sec).

Going back to Go's idea of multiple returns, `range` returns two values for each iteration:

1. The index of the value (or `i` as it's usually referred to)
2. A copy of the element at said index ()

However, only one value is necessary when trying to declare something using `range`; if you want just the range, you can omit the second argument.

### Maps

This is about as close as we get to key:value pairs in Go (at least for now).

The tour says that "A map maps keys to values", which, let's be honest, isn't super helpful - especially since the example doesn't use the standard "key:value" syntax other languages are known for.

Maps can be created using Go's built in `make` function, or by using __map literals__ - essentially creating key:value pairs. Note that the type of the value must be declared when doing this (again, Go is statically typed), and you can only use one type in creating a map.

Similar to objects in other languages, you can mutate elements in the map using bracket notation to access the values.

### Function values

Functions in Go, similar to other languages, are values. This means that they can be passed around to other functions and/or used as values for variables.

This leads to an important concept that is probably not well understood by a lot of newer folk: __closures__. In short, a closure is when a function returns another function (but not exactly; it's just that this is the most common case of closure). This "new" function has access to variables outside its body (i.e. from its parent function).

***

That's a lot, but I hope it gives an idea of a lot of these concepts, as some of them are relevant to other languages (and CS in general). Up next: a side effect of Go's design.

[SECTION 4]()