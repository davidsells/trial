var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('coursera', server, {safe: false });

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'coursera' database");
        db.collection('a', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'courses' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    db.collection('a', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findUniversities = function(req,res ) {
    console.log('findUniversities');
    db.collection('universities', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findUpcoming = function(req, res) {
    console.log('findUpcoming Courses look below');
    console.log("university", req.params.uni);
    var uni = req.params.uni;
    console.log("looking at params");
    console.log("Size: "+req.params.length);
    for (var i=0; i < req.params.length; i++) {
        console.log("Parameters: "+req.params[i]);
    }
    db.collection('upcoming', function(err, collection) {
        console.log("collection: "+collection.uni);
        console.log("ecollection: "+collection.data);
        console.log("data: "+req.params.data);
        console.log("University: "+uni);
        if (typeof uni === 'undefined') {
            collection.find().toArray(function(err, items) {
            if (err) {
                console.log("Error: "+err);
            } else {
                console.log("No Error");
                console.log("Count: "+items.length);
                res.send(items);
        }
        });
        } else {
        collection.find({university:uni}).toArray(function(err, items) {
            if (err) {
                console.log("Error: "+err);
            } else {
                console.log("No Error");
                console.log("Count: "+items.length);
                res.send(items);
        }
        });
        }
    });
 
};

exports.findAll = function(req, res) {
    console.log('findall wine');
    /* original
    db.collection('a', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
    */
    var uni = req.params.uni;
    db.collection('a', function(err, collection) {
       if (typeof uni === 'undefined') {
            collection.find().toArray(function(err, items) {
            if (err) {
                console.log("Error: "+err);
            } else {
                console.log("No Error");
                console.log("Count: "+items.length);
                res.send(items);
            }
            });
        } else {
            collection.find({university:uni}).toArray(function(err, items) {
            if (err) {
                console.log("Error: "+err);
            } else {
                console.log("No Error");
                console.log("Count: "+items.length);
                res.send(items);
            }
            });
        }
    });
}
    
    

exports.addWine = function(req, res) {
    var wine = req.body;
    console.log('Adding wine: ' + JSON.stringify(wine));
    db.collection('a', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateWine = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    delete wine._id;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(wine));
    db.collection('a', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
}
exports.deleteWine = function(req, res) {
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
    db.collection('a', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};


