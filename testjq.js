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
        ctx.arc(this.x, this.y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.stroke();
        ctx.fillText(this.name, this.x, this.y - 15);
    };
}

function Link(neuron) {
    this.neuron = neuron;
    this.weight = Math.random();
}

function Layer(layerNumber) {
    this.layerNumber = layerNumber;
    this.neurons = [];
    this.addNeuron = function (neuron) {
        this.neurons.push(neuron);

    };
    this.draw = function draw(ctx, x) {
        var height = ctx.canvas.height;
        var inc = height / this.neurons.length;
        for (var idx = 0; idx < this.neurons.length; idx++) {
            this.neurons[idx].y = inc / 2 + idx * inc;
            this.neurons[idx].x = x;
            this.neurons[idx].draw(ctx);
        }
    };
}


function NeuralNetwork() {
    this.layers = [];
    this.addLayer = function (layer) {
        this.layers.push(layer);
    };
    this.create = function (topology) {
        
        for (var idx = 0; idx < topology.length; idx++) {
            var layer = new Layer();
            for (var jdx = 0; jdx < topology[idx]; jdx++) {
                var neuron = new Neuron('Neuron ' + idx + ' - ' + jdx);
                neuron.x = idx * 50;
                layer.addNeuron(neuron);
                console.log('adding.. ' + neuron.name);
            }
            this.addLayer(layer);
        }
    };
    this.draw = function (ctx) {
        var width = ctx.canvas.width;
        var inc = width / this.layers.length;
        for (var idx = 0; idx < this.layers.length; idx++) {
            var x = inc / 2 + idx * inc;
            this.layers[idx].draw(ctx, x);
        }
    };
}

$(document).ready(function () {
    $('#submit').on('click', () => {
        var canvas = document.getElementById('nnCanvas');
        var ctx = canvas.getContext('2d');
        
        var network = new NeuralNetwork();
        network.create(JSON.parse($('#neuronInput').val()));
        network.draw(ctx);
    });
    $('#clearCanvas').on('click', function () {
        var canvas = document.getElementById('nnCanvas');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
});
window.onload = function () {
    const app = new Vue({
        el: '#app',
        data: {
            neuronInput: ''
        }
    });
};

/*for (idx = 0; idx < numOfNeurons.length; idx++) {
var neuron = new Neuron(idx.toString());
neuron.x = 425;
neuron.y = 150 + idx * 100;
layer.push(neuron);
  } */


/*var inputLayer = new Layer();
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
*/

//network.layers[0].neurons[0].neuron.links[0].weight;