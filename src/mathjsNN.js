// Arnold Siemens
// Summerproject 2018
// "AI lernt spielen"

/**
 * array[x][y]
 * @param {number} x length => array[x][y]
 * @param {number} y height => array[x][y]
 * @returns {number[]} random 2d Array
 */
function random2d(x, y) {
  let arr = [];
  for (let i = 0; i < x; i++) {
    arr.push([]);
    for (let j = 0; j < y; j++) {
      arr[i][j] = Math.random() * 2 - 1;
    }
  }
  return arr;
}

/**
 * array[x]
 * @param {number} x length => array[x][y]
 * @returns {number[]} random 1d Array
 */
function random1d(x) {
  const arr = [];
  for (let i = 0; i < x; i++) {
    arr[i] = Math.random() * 2 - 1;
  }
  return arr;
}

class NeuralNetwork {
  /**
   * if given :
   *   Create new Network based on an old one
   * 
   * else:
   *   Create a new Neural Network
   * @param {number|NeuralNetwork} inputNodes 
   * @param {number} hiddenNodes 
   * @param {number} outputNodes 
   */
  constructor(inputNodes, hiddenNodes, outputNodes) {
    if (inputNodes instanceof NeuralNetwork) {
      const newBrain = inputNodes;
      this.layers = {
        one: {
          weights: new math.matrix(newBrain.layers.one.weights),
          biases: new math.matrix(newBrain.layers.one.biases)
        },
        two: {
          weights: new math.matrix(newBrain.layers.two.weights),
          biases: new math.matrix(newBrain.layers.two.biases)
        }
      }
    } else {
      this.create(inputNodes, hiddenNodes, outputNodes);
    }
    this.learningrate = 0.1;
  }

  /**
   * Creates new Neural Network
   * @param {number} inputNodes 
   * @param {number} hiddenNodes 
   * @param {number} outputNodes 
   */
  create(inputNodes, hiddenNodes, outputNodes) {
    this.layers = {
      one: {
        weights: math.matrix(random2d(inputNodes, hiddenNodes)),
        biases: math.matrix(random1d(hiddenNodes))
      },
      two: {
        weights: math.matrix(random2d(hiddenNodes, outputNodes)),
        biases: math.matrix(random1d(outputNodes))
      }
    }
  }

  /**
   * 
   * @param {NeuralNetwork} brain for recreation
   * @param {boolean} mutate should the copy be mutated?
   * @returns {NeuralNetwork} copy of the network
   */
  copy() {
    return new NeuralNetwork(this);
  }

  /**
   * 
   * @param {number} lr learningrate (default 0.1)
   */
  setLearningrate(lr) {
    this.learningrate = lr;
  }

  /**
   * Mutates the Network by given leraning rate
   */
  mutate() {
    /**
     * 
     * @param {number} x number to be mutated
     * @param {number} learningrate % how often should be mutated
     */
    function mutateElement(x, learningrate) {
      if (Math.random() < learningrate) {
        let offset = Math.random() * 0.5;
        if (Math.random() < 0.5) {
          offset = -offset;
        }
        return x + offset;
      } else {
        return x;
      }
    }
    // loop through matricies
    // l1 biases
    for (let i = 0; i < this.layers.one.biases._size[0]; i++) {
      this.layers.one.biases._data[i] = mutateElement(this.layers.one.biases._data[i], this.learningrate);
    }
    // l1 weights
    for (let i = 0; i < this.layers.one.weights._size[0]; i++) {
      for (let j = 0; j < this.layers.one.weights._size[1]; j++) {
        this.layers.one.weights._data[i][j] = mutateElement(this.layers.one.weights._data[i][j]), this.learningrate;
      }
    }
    // l2 biases
    for (let i = 0; i < this.layers.two.biases._size[0]; i++) {
      this.layers.two.biases._data[i] = mutateElement(this.layers.two.biases._data[i], this.learningrate);
    }
    // l2 weights
    for (let i = 0; i < this.layers.two.weights._size[0]; i++) {
      for (let j = 0; j < this.layers.two.weights._size[1]; j++) {
        this.layers.two.weights._data[i][j] = mutateElement(this.layers.two.weights._data[i][j], this.learningrate);
      }
    }
  }

  /**
   * Signmoid activation function
   * @param {number[]} x 
   */
  sigmoid(x) {
    for (let i = 0; i < x.length; i++) {
      x[i] = 1 / (1 + Math.exp(-x[i]));
    }
    return x;
  }

  /**
   * 
   * @param {number[]} inputs 
   */
  predict(inputs) {
    // x = sum(w * i) + b
    let ys;
    ys = math.multiply(inputs, this.layers.one.weights);
    ys = math.add(ys, this.layers.one.biases);
    this.sigmoid(ys._data);
    ys = math.multiply(ys, this.layers.two.weights);
    ys = math.add(ys, this.layers.two.biases);
    ys = this.sigmoid(ys._data);
    return ys;
  }

  saveJSON() {
    return JSON.stringify(this.layers);
  }
}
