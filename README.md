# Node.js Sort Explorer
### A simple CLI tool that gives step-by-step output for a few common search algorithms

## WHY???
Basically, I made this thing to help myself better understand these algorithms, because even though most developers will never need to implement them in real life, it's valuable to understand.

## How Do I Use It?
This thing works from the command line and you run it like any other node script, but with some arguments: number of elements, type of element, and algorithm. For example:
```node sort.js 10 integers bubble``` will generate an array of 10 random integers and apply a bubble sort to them, and give you a bunch of info about what is happening along the way.

### Types
Currently the only two accepted arguments are ```integers``` and ```strings```.  The ```integers``` are between 0 and 100, and ```strings``` consist of random capital letters and have a length between 3 and 8 characters.

### Algorithms
I've implemented a ```bubble```, ```selection```, ```merge``` and ```quick``` sort.

## Recap
```node sort.js 1000 strings bubble``` will perform and attempt to describe a bubble sort on an array of random strings of length 1000.
```node sort.js 100 integers merge``` will perform and attempt to describe a merge sort on an array of random integers of length 100.
