# Advent of Code 2019 in Node

Because I _like_ the pain. 

The goal this year is to go back and continually refactor and develop a library of sorts for working on advent
problems. I've seen people create specialized languages for such a task. I'm not nearly smart enough to do
that, so a library is the next best thing.

This means that earlier solutions may be refactored in light of new ideas in later days, and you can't really
refactor without tests, so those need to be added.

It also means that code is likely to get larger before the common features can be extracted. That's to be
expected. You can't eliminate boilerplates until you identify boilerplates. My first pass at a puzzle might be
very small, then get larger as I make it more "correct". It's possible I'm overthinking this.


## Setting up to run this

I don't know why you'd want to. Maybe you like pain as well...

First off, install the dependencies with `npm install`

To run a specific day's puzzle, do `node dayxx.js` (where xx is the day)

To run a specific day's test suit, do `npm test dayxx.test.js` (where xx is the day). If you don't specify a
day, then all tests will be run.

Not gonna lie, this syntax is funky. I'll make it better as I go.
