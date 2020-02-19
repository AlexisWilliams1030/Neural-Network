function Neuron(name) {
    this.value = 0;
    this.name = name;
    this.links = [];
    this.x = 0;
    this.y = 0;
    this.drawEdges = function (ctx) {
        for (var idx = 0; idx < this.links.length; idx++) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.links[idx].x, this.links[idx].y);
            ctx.stroke();
        }
    };
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
    this.length = function () {
        return this.neurons.length;
    };
    this.drawEdges = function (ctx) {
        for (var idx = 0; idx < this.neurons.length; idx++) {
            this.neurons[idx].drawEdges(ctx);
        }
    };
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
    this.drawEdges = function (ctx) {
        for (var idx = 0; idx < this.layers.length; idx++) {
            this.layers[idx].drawEdges(ctx);
        }
    };
    this.create = function (topology) {

        for (var idx = 0; idx < topology.length; idx++) {
            var layer = new Layer();
            for (var jdx = 0; jdx < topology[idx]; jdx++) {
                var neuron = new Neuron('Neuron ' + idx + ' - ' + jdx);
                neuron.x = idx * 50;
                layer.addNeuron(neuron);
                //console.log('adding ' + neuron.name);
            }
            this.addLayer(layer);
        }
        this.mapEdges();
    };
    this.mapEdges = function () {
        for (var layer = 0; layer < this.layers.length - 1; layer++) {
            //console.log('layer ' + layer);
            for (var neuron = 0; neuron < this.layers[layer].length(); neuron++) {
                //console.log(' neuron ' + layer + ' - ' + neuron);
                for (var neuron2 = 0; neuron2 < this.layers[layer + 1].length(); neuron2++) {
                    //console.log('  connects to ' + (layer + 1) + ' - ' + neuron2);
                    this.layers[layer].neurons[neuron].addLink(this.layers[layer + 1].neurons[neuron2]);
                }

            }
        }
    };
    this.draw = function (ctx) {
        var width = ctx.canvas.width;
        var inc = width / this.layers.length;
        for (var idx = 0; idx < this.layers.length; idx++) {
            var x = inc / 2 + idx * inc;
            this.layers[idx].draw(ctx, x);
        }
        this.drawEdges(ctx);
    };
}

window.onload = function () {
    const app = new Vue({
        el: '#app',
        data: {
            layerInput: '',
            neuronInput: ''
        }
    });
};

$(document).ready(function () {
    document.getElementById('neuronInput').value = '[2, 2]';
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