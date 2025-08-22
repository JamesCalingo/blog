---

title: "Tour de Go Part 6"
subtitle: "Concurrent Programming"
date: 11 January 2024
published: false

---

## Concurrency

Now comes the big stuff: Concurrency.

Before we dive into concurrency as it pertains to Go, I think we should define concurrency as a general programming concept.

In short, concurrency is when multiple things happen at the same time. In computing, this can create a whole mess of problems if these events are not handled properly.

To give an example from the real world, I remember one day in college about 10 years ago: I went to GameStop because they had partnered with Nintendo for exclusive rights to sell a special figure pertaining to one of their games. The way GameStop chose to handle selling these figures was to have those who wanted to get the figure preorder it from their local stores at a specific date and time (I don't remember the exact details, but it was around midday).

At that time, EVERY SINGLE GAMESTOP IN THE UNITED STATES was trying to access some central system from which the stock for these figures was being controlled. As you might expect, this caused CHAOS: The register got stuck loading for hours before the FIRST customers were served. I ended up being able to make my order after things calmed down a bit, but it was several hours after the whole thing stared (and I ended up late for a class because of it).

I'm still trying to learn more about concurrency (mainly through the idea of sockets), as it's paramount to an idea I've wanted to work on since I started coding back in 2019. 

Anyway, let's dive into how Go handles concurrency:

### Goroutines

Goroutines are, from what I can tell, the simplest form of asynchronous programming in Go. 

### Channels

Channels are connected to goroutines. A channel, by definition, is

The common way this works is that you have a variable - for simplicty's sake, we'll use the good ol' string "Hello, World" (and not "wrold" like I almost typed in when typing this). 