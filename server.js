var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json(); 

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

Storage.prototype.delete = function(id) {
   var item = "";
    console.log(this.items[id]);
    for(var i=0;i<this.items.length;i++){
        if(this.items[i].id == id){
            item = this.items[i];
            
            this.items.splice(i,1);
            console.log(this.items);
        }
    }
    return item;
};

Storage.prototype.update = function(id , name) {
    var item = "";
    
    for(var i = 0; i < this.items.length; i++){
        if(this.items[i].id == id){
            item = this.items[i];
            console.log(this.items[i]);
            item.name = name;
            return item;
        }
    }
    return storage.add(name); 

};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function (req, res){
    if (!req.body){
        return res.sendStatus(400);
    }
    
    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function (req, res){
    if (!req.body){
        return res.sendStatus(400);
    }
    console.log(req.params.id);
    var item = storage.delete(req.params.id);
    console.log(item);
    res.status(201).json(item);
});

app.put('/items/:id', jsonParser, function(req, res){
    if (!req.body){
        return res.sendStatus(400);
    }
    
    var item = storage.update(req.body.id, req.body.name);
    res.status(201).json(item);
    
});

app.get('/users', function(req, res){
    // if (!req.body){
    //     return res.sendStatus(400);
    // }
    
    // var item = storage.update(req.body.id, req.body.name);
    res.status(201);
    
});

exports.app = app;
exports.storage = storage;

app.listen(process.env.PORT || 8080);