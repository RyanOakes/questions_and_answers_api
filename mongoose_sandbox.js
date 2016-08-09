'use strict';

var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on("error", function(err){
    console.error("connection error:", err);
});

db.once("open", function(){
    console.log("db connection successful");
    // TODO: Put database communication logic

    var Schema = mongoose.Schema;
    var AnimalSchema = new Schema({
        type: {type: String, default: "goldfish"},
        size: {type: String, default: "small"},
        color: {type: String, default: "golden"},
        mass: {type: Number, default: 0.007},
        name: {type: String, default: "Angela"}
    });

    var Animal = mongoose.model("Animal", AnimalSchema);

    var elephant = new Animal({
        type: "elepant",
        size: "big",
        color: "gray",
        mass: 6000,
        name: "Bob"
    });

    var animal = new Animal({}); // Goldfish

    var whale = new Animal({
        type: "whale",
        size: "huge",
        mass: 190500,
        name: "Tom"
    });


    Animal.remove({}, function(err){
        if (err) console.error(err);
        elephant.save(function(err){
            if (err) console.error(err);
            animal.save(function(err){
                if (err) console.error(err);
                whale.save(function(err){
                    if (err) console.error(err);
                    Animal.find({size: "big"}, function(err, animals) {
                        animals.forEach(function(animal){
                            console.log(animal.name + " the " + animal.color +
                                " " + animal.type);
                        });
                        db.close(function(){
                        console.log("db connection closed");
                        });
                    });
                });
            });
        });
    });
});
