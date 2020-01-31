# negamax-alpha-beta

A fast, clean, modular JavaScript implementation of the negamax depth-first 
tree search algorithm with alpha-beta pruning.

# About

This module searches the game tree of any zero-sum two-player game in an efficient manner,
finding the optimal move for the current player-to-move in the given gameState. 
You can model your gameState and move objects however you see fit.  They
can be javascript objects, numbers, strings, anything you want.  The requirements
of the functions you must supply are detailed below in the [Usage](#Usage) section.

*Note: this implementation assumes in-place modification of the game states in the
user-supplied `makeMove` and `unmakeMove` functions.  This tends to be faster and
less memory-intensive than having a single `makeMove` function that clones the 
game state and returns a new, modified game state.  **It is critical that the 
`makeMove` and `unmakeMove` match one another perfectly**.  Calling 
`makeMove(gameState, move)` and then `unmakeMove(gameState, move)` must result
in an identical gameState to the one before calling the two functions.*

# Installation

    npm install negamax-alpha-beta
    
# Usage

    const NegamaxAlphaBeta = require("negamax-alpha-beta");
    
    let config = {
      generateMoves: (gameState) => { return [] },
      makeMove: (gameState, move) => { return true },
      unmakeMove: (gameState, move) => { return },
      evaluate: (gameState) => { return 0 },
      evaluateTerminal: (gameState) => { return null }
    };
    
    let negamax = new NegamaxAlphaBeta(config);

    let result = negamax.search(gameState, depth);
    
    console.log(`Result: score = ${result.score}, bestMove = ${result.bestMove}`);
    
### Constructor: `NegamaxAlphaBeta (config) { }`

The constructor takes one argument, a configuration object containing 
several user-defined functions that operate on your generic gameState object:

#### `generateMoves: function (gameState) { }`

Your `generateMoves` function must take a gameState object and return an array
of all legal moves for that game state.  You can represent the moves however
you see fit: integers, objects, strings, etc.

#### `makeMove: function (gameState, move) { }`

Your `makeMove` function must take a gameState object and a move object, perform
the move upon the gameState, altering it in place, and return a boolean value
that represents whether or not the side-to-move has changed after having performed 
the move.

#### `unmakeMove: function (gameState, move) { }`

Your `unmakeMove` function must take a gameState object and a move object, un-perform
the move upon the gameState, altering it in place.  This must end up producing the 
exact same gameState as before having called `makeMove`.

#### `evaluate: function (gameState) { }`

Your `evaluate` function must take a gameState object and return a numeric value
representing the score of the gameState from the perspective of the gameState's current 
player-to-move.  Higher numbers mean the gameState is better for the current 
player-to-move.

#### `evaluateTerminal: function (gameState) { }`

Your `evaluateTerminal` function must take a gameState object and either return 
`null` if the gameState is not in a terminal state (i.e. the game is not over), 
or return a numeric value representing the the score of the terminal gameState
from the perspective of the gameState's current player-to-move.  Higher numbers 
mean the gameState is better for the current player-to-move.  Typically you
would return `0` for a draw, some extreme positive number for a win, or some 
extreme negative number for a loss.  The values returned for win and loss
should be more extreme than any possible return value from calling `evaluate` 
on non-terminal states.

### Function: `search (gameState, depth) { }`

The `search` method takes a gameState object and a depth integer, searches the
game tree and returns an object like `{ score: 1.2345, bestMove: {some move object} }`.

# License

The MIT License (MIT)

Copyright (c) 2019 Aaron Hanson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
