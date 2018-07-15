# AI.js

A neural network libary using [mathjs](https://github.com/josdejong/mathjs).

## Usage

```javascript
// create a new NN
const nn = new NeuralNetwork(inputNodes, hiddenNodes, outputNodes);

// create a new NN based on other
const newNN = new NeuralNetwork(nn);
// or copy
const newNN = brain.copy();

// predict
nn.predict(input);
// returns array[outputNodes]
// ex.: nn returns [0.2, 0.5]
// if (output[0] > output[1]) he thinks 0 is better choise

// mutate a network by learningrate
nn.mutate();

// change learningrate
nn.setLearningrate(value);
```
