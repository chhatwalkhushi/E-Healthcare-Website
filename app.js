//c
//npm i -D nodemon
//npm i ejs bcrypt moment express http socket.io path express-ejs-layouts body-parser connect-mongo express-session mongoose
//npm run dev

//register  onsubmit="event.preventDefault(); validateMyForm();"





const express = require("express");
const path = require("path");


const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');





const expressLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);





const app = express();




const nodemailer = require('nodemailer');



//mongoose
mongoose.connect("mongodb+srv://admin:admin21@cluster0-5r6sn.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    },
    () => console.log("connected to DB!")
);

var db = mongoose.connection;


//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("yes");
});






//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  }));


//Bodyparser

//app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json());



var User = require('./models/user');



//ROUTES
app.use(express.static(path.join(__dirname, "public")));



app.get('/book1', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "book1.html"));
});


app.post('/book1', (req, res) => {

var d = new Date();
var da = d.getDate();
var ho = d.getHours();
var x = da*100 + ho;
console.log(Math.floor(2010%100));
User.findOne(
    { specialist: req.body.area },
 ).exec(function (error, user) {
    if (error) {
    return next(error);
    } else {
        if (ho<21 && (Math.floor(user.bookTime%100))<21 && da==(Math.floor(user.bookTime/100))) {
            if (ho>(Math.floor(user.bookTime%100))) {
                var tix = da*100+ho+1;
                var tix1 = user.appoint+1;
                User.updateOne({ _id: user._id }, { bookTime: tix }, function(err, res) {
                    
                  });
                  User.updateOne({ _id: user._id }, { appoint: tix1 }, function(err, res) {
                    
                  });
                  let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: "ehealthcareprovider@gmail.com" , // TODO: your gmail account
                            pass: "ehealthcare21+"  // TODO: your gmail password
                        }
                    });
                    
                    // Step 2
                    let mailOptions = {
                        from: 'ehealthcareprovider@gmail.com', // TODO: email sender
                        to: req.body.email, // TODO: email receiver
                        subject: 'Appointment Confirmation',
                        text: `Hi ${req.body.name}!!! Your appointment(${tix1}) for ${req.body.area} department is booked for today at ${Math.floor(tix%100)}:00. Kindly be ontime at Medistate Hospital, Noida.`
                    };
                    //'Hi, ''!Your appointment for dermatology department is booked. '
                    // Step 3
                    transporter.sendMail(mailOptions, (err, data) => {
                        if (err) {
                            return console.log('Error occurs');
                        }
                        
                        return res.redirect('/covid19-2');
                    });
                    
                  console.log(`rx-Appointment Booked for ${ho+1}`)
            } else {
                console.log(`ok-Appointment Booked for ${user.bookTime+1}`)
                var tox = da*100+Math.floor(user.bookTime % 100)+1;
                var tox1 = user.appoint+1;
                User.updateOne({ _id: user._id }, { bookTime: tox }, function(err, res) {
                    
                  });
                  User.updateOne({ _id: user._id }, { appoint: tox1 }, function(err, res) {
                    
                  });
                  let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "ehealthcareprovider@gmail.com" , // TODO: your gmail account
                        pass: "ehealthcare21+"  // TODO: your gmail password
                    }
                });
                
                // Step 2
                let mailOptions = {
                    from: 'ehealthcareprovider@gmail.com', // TODO: email sender
                    to: req.body.email, // TODO: email receiver
                    subject: 'Appointment Confirmation',
                    text: `Hi ${req.body.name}!!! Your appointment(${tox1}) for ${req.body.area} department is booked for today at ${Math.floor(tox%100)}:00. Kindly be ontime at Medistate Hospital, Noida.`
                };
                //'Hi, ''!Your appointment for dermatology department is booked. '
                // Step 3
                transporter.sendMail(mailOptions, (err, data) => {
                    if (err) {
                        return console.log('Error occurs');
                    }
                    
                    return res.redirect('/covid19-2');
                });
                
                }
            } else {
                if (da!=(Math.floor(user.bookTime/100)) && ho<21) {
                    console.log(`Date updated ${user.bookTime}`)
                    
                        var tix = ( da * 100 ) + ho + 1;
                        var tix1 = user.appoint+1;
                        console.log("I was here");
                        User.updateOne({ _id: user._id }, { bookTime: tix }, function(err, res) {
                            
                          });
                          User.updateOne({ _id: user._id }, { appoint: tix1 }, function(err, res) {
                            
                          });
                          let transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: "ehealthcareprovider@gmail.com" , // TODO: your gmail account
                                    pass: "ehealthcare21+"  // TODO: your gmail password
                                }
                            });
                            
                            // Step 2
                            let mailOptions = {
                                from: 'ehealthcareprovider@gmail.com', // TODO: email sender
                                to: req.body.email, // TODO: email receiver
                                subject: 'Appointment Confirmation',
                                text: `Hi ${req.body.name}!!! Your appointment(${tix1}) for ${req.body.area} department is booked for today at ${Math.floor(tix%100)}:00. Kindly be ontime at Medistate Hospital, Noida.`
                            };
                            //'Hi, ''!Your appointment for dermatology department is booked. '
                            // Step 3
                            transporter.sendMail(mailOptions, (err, data) => {
                                if (err) {
                                    return console.log('Error occurs');
                                }
                                //return log('Email sent!!!');
                                //alert("Appointment Booked!!!");
                                return res.redirect('/covid19-2');
                            });
        
                          console.log(`rx-Appointment Booked for ${ho+1}`)
                    
                } else {
                    //alert("Appointment not available today!!!");
                    console.log("No appointments available for today");
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: "ehealthcareprovider@gmail.com" , // TODO: your gmail account
                            pass: "ehealthcare21+"  // TODO: your gmail password
                        }
                    });
                    
                    // Step 2
                    let mailOptions = {
                        from: 'ehealthcareprovider@gmail.com', // TODO: email sender
                        to: req.body.email, // TODO: email receiver
                        subject: 'Appointment Confirmation',
                        text: `Sorry ${req.body.name}, your appointment for ${req.body.area} department cannot be booked for today, all slots are booked.`
                    };
                    //'Hi, ''!Your appointment for dermatology department is booked. '
                    // Step 3
                    transporter.sendMail(mailOptions, (err, data) => {
                        if (err) {
                            return console.log('Error occurs');
                        }
                        
                        return res.redirect('/covid19-2');
                    });
                    }
                
            }
    }

});

});










//routes
app.get('/home', (req, res) => {
    //res.send('home2');
    res.sendFile(path.join(__dirname, "public", "home2.html"));
})

app.post('/home', function (req, res, next) {
    
    if (req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.passwordConf &&
      req.body.specialist &&
      req.body.islogin &&
      req.body.othermem) {

        if (req.body.password !== req.body.passwordConf) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            res.send("passwords dont match");
            return next(err);
          }
        
  
      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        specialist: req.body.specialist,
        islogin: req.body.islogin,
        othermem: req.body.othermem,
        mem: req.body.mem,
      }
  
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });
      
  
    } else if (req.body.logemail && req.body.logpassword) {
      User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = user._id;
          User.updateOne({ _id: user._id }, { islogin: 'false' }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
          });
          User.updateOne({ _id: user._id }, { othermem: 'false' }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
          });
          return res.redirect('/profile');
          //return res.redirect('/');
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  })
  
  
  app.get('/profile', function (req, res, next) {
    User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          if (user === null) {
            
           return res.redirect('/');
          } else {
            
            User.updateOne({ _id: user._id }, { islogin: 'false' }, function(err, res) {
                
              });
            User.updateOne({ _id: user._id }, { othermem: 'false' }, function(err, res) {
                
              });
            
            return res.redirect('/');
          }
        }
      });
  });



  


app.get('/logout', function (req, res, next) {
        User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
            return next(error);
            } else {
                

                if (user.mem == "none") {
                    req.session.destroy(function (err) {
                        if (err) {
                          return next(err);
                        } else {
                            User.updateOne({ _id: user._id }, { islogin: 'false' }, function(err, res) {
                                
                              });
                              User.updateOne({ _id: user._id }, { othermem: 'false' }, function(err, res) {
                                
                              });
                              User.updateOne({ _id: user._id }, { mem: 'none' }, function(err, res) {
                                
                               });
                          return res.redirect('/covid19-2');
                        }
                      });
                } else {
                    User.updateOne({ _id: user._id }, { othermem: 'false' }, function(err, res) {
                        
                      });
                    User.updateOne({ _id: user._id }, { mem: 'none' }, function(err, res) {
                        
                       });
                    return res.redirect('/covid19-2');
                }

            }
    
        });
      
    
  });





app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, "public", "index.html"));
  });


app.get('/msg', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "message.html"));
});


app.get('/chat', function (req, res, next) {

    User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          if (user === null) {
            /*var err = new Error('Not authorized! Go back!');
            err.status = 400;
            return next(err);
            */
           return res.redirect('/msg');
          } else {
            if (req.query.username == user.username && user.islogin == "false") {
             
                console.log(req.body.username);
                    console.log(user.username);
                    console.log("re");
                    //console.log(document.getElementById('username').innerText);
                console.log("re");
                console.log('/chat executed');
                   User.updateOne({ _id: user._id }, { islogin: 'true' }, function(err, res) {
                    
                   });
                   User.updateOne({ _id: user._id }, { othermem: 'false' }, function(err, res) {
                    
                   });
                   return res.sendFile(path.join(__dirname, "public", "chat.html"));
              } else {











                if (req.query.room == user.specialist && user.islogin == "true" && user.othermem == "false" && user.mem == "none") {
                   console.log('/chat executed');
                   User.updateOne({ _id: user._id }, { mem: req.query.username }, function(err, res) {
                    
                   });
                   User.updateOne({ _id: user._id }, { islogin: 'true' }, function(err, res) {
                    
                   });
                   User.updateOne({ _id: user._id }, { othermem: 'true' }, function(err, res) {
                    
                   });
                   return res.sendFile(path.join(__dirname, "public", "chat.html"));
                   //return res.send("sorry alll busy");
                  } else {
                    console.log("re1");
                    
                    console.log(req.query.username);
                    console.log("re1");
                    //console.log(req.body.username);
                    console.log(user.username);
                    //return res.send(req.query.username);
                    return res.redirect('/msg');
                    //return res.sendFile(path.join(__dirname, "public", "message.html"));

                  }



                console.log("re3");
                return res.send("sorry alll busy");

            //return res.redirect('/');
              }
        }
    }
 });

});




  

app.get('/covid19-2', (req, res) => {
    //the view we wanna render
    //res.send('covid19-2');
    res.sendFile(path.join(__dirname, "public", "covid19-2.html"));
});

app.get('/doctors2', (req, res) => {
    //the view we wanna render
    //res.send('doctors2');
    res.sendFile(path.join(__dirname, "public", "doctors2.html"));
});
















// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
  });

  

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });



  const PORT = process.env.PORT || 5000;

  

  const server = app.listen(PORT, console.log(`Server started on ${PORT}`));
  const io = require("socket.io")(server);
  
  const botName = 'E-Healthcare';
  






  io.on('connection', socket => {
    
    socket.on('joinRoom', ({username, room}) => {
    
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

        
    socket.emit('message', formatMessage(botName, 'We are here for you!!!'));


    
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

    io.to(user.room).emit('roomUsers' , {
        room: user.room,
        users: getRoomUsers(user.room)
    });

    
    
});
//.connect("http://localhost:5000/index");



socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id); 
        
    io.to(user.room).emit("message", formatMessage(user.username, msg));
});

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

            io.to(user.room).emit('roomUsers' , {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
        
    });
}); 















