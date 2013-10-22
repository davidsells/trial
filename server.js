var express = require('express'),
    path = require('path'),
    http = require('http'),
    wine = require('./routes/wines');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});
//http://jsfiddle.net/nikoshr/8zS5a/
//http://localhost:3000/upcoming/Stanford%20University

app.get('/wines/uni/:uni', wine.findAll);
app.get('/wines', wine.findAll);
app.get('/upcoming/uni/:uni', wine.findUpcoming);
app.get('/upcoming', wine.findUpcoming);
app.get('/universities', wine.findUniversities);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);


app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
