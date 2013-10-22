var express = require('express'),
    path = require('path'),
    http = require('http'),
    course = require('./routes/courses');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});
//http://jsfiddle.net/nikoshr/8zS5a/
//http://localhost:3000/upcoming/Stanford%20University

app.get('/courses/uni/:uni', course.findAll);
app.get('/courses', course.findAll);
app.get('/upcoming/uni/:uni', course.findUpcoming);
app.get('/upcoming', course.findUpcoming);
app.get('/universities', course.findUniversities);
app.get('/courses/:id', course.findById);
app.post('/courses', course.addCourse);


app.put('/courses/:id', course.updateCourse);
app.delete('/courses/:id', course.deleteCourse);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
