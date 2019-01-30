var mongoose = require('mongoose');

// mongodb://root:password@34@ds119024.mlab.com:19024
function dbConnection () {
    mongoose.connect('mongodb://127.0.0.1:27017/fabric',{ useNewUrlParser: true },function(err) {
        if (err) {
            console.log('MongoDB connection error: ' + err);
            process.exit(1);
        }else{
            console.log("Connected Successfully")
        }
    });
    
    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    
    var conn = mongoose.connection;
    
    conn.on('error',function(){
        console.error.bind(console, 'connection error:')
    });
    conn.once('open', function() {
        console.log("Mongodb is up and Running");
    });
    
};

module.export = dbConnection ()