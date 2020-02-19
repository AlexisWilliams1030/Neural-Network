function Neuron(name) {
    this.value = 0;
    this.name = name;
    this.links = [];
    this.x = 0;
    this.y = 0;
    this.addLink = function (link) {
        this.links.push(link);
    };
    this.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.stroke();
    };
}

function Link(neuron) {
    this.neuron = neuron;
    this.weight = Math.random();
}

function Layer() {
    this.neurons = [];
    this.addNeuron = function (neuron) {
        this.neurons.push(neuron);

    };
}


function NeuralNetwork() {
    this.layers = [];
    this.addLayer = function (layer) {
        this.layers.push(layer);
    };
    this.draw = function (ctx) {

    };
}

var inputLayer = new Layer();
var outputLayer = new Layer();
var red = new Neuron('red');
var green = new Neuron('green');
inputLayer.addNeuron(red);
inputLayer.addNeuron(green);
var go = new Neuron('go');
var stop = new Neuron('stop');
outputLayer.addNeuron(go);
outputLayer.addNeuron(stop);
var redGoLink = new Link(go);
red.addLink(redGoLink);
var redStopLink = new Link(stop);
red.addLink(redStopLink);
var greenGoLink = new Link(go);
green.addLink(greenGoLink);
var greenStopLink = new Link(stop);
green.addLink(greenStopLink);
var newNet = new NeuralNetwork();
newNet.addLayer(inputLayer);
newNet.addLayer(outputLayer);


//network.layers[0].neurons[0].neuron.links[0].weight;