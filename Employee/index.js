//const { SQLServerStatementColumnEncryptionSetting } = require('tedious/lib/always-encrypted/types');

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;



const config = {
    server: 'mycrud123.database.windows.net',
    authentication: {
        type: 'default',
        options: { 
            userName: 'azureuser', 
            password: 'Annu@12345'
        }
    },
    options: {
        encrypt: true,
        database: 'mycrudapi'
    }
};
const connection = new Connection(config);


function Start(cb){
    console.log('Starting...');
    cb(null,'yyy','USA')
}

function Insert(name,location,cb){
    console.log("Inserting '" + name + "' into Table...");
    request = new Request(
        'INSERT INTO TestSchema.employees(Name,Loaction) OUTPUT INSERTED.Id VALUES (@Name,@Location);',
        function(err,rowCount,rows){
            if(err){
                cb(err)
            }else{
                console.log(rowCount + 'row(s) inserted');
                cb(null,'Annu','India');
            }
        }
    )
    request.addParameter('Name',TYPES.NVarChar,name);
    request.addParameter('Location',TYPES.NVarChar,location);

    connection.execSql(request)
}

function Update(name,location,cb){
    console.log("Updating Location to '" + location + "' for '" + name + "'...")

    request = new Request(
        'UPDATE TestSchema.Employees SET loaction=@Location WHERE Name = @Name;',
        function(err,rowCount,rows){
            if(err){
                cb(err)
            }else{
                console.log(rowCount + 'row(s) updated');
                cb(null,'Akash')
            }
        }
    );

    request.addParameter('Name',TYPES.NVarChar,name);
    request.addParameter('Location', TYPES.NVarChar,location);

    connection.execSql(request);

}

function Delete(name,calbacks){
    console.log("Deleting '" + name + "' from Table...");

    request = new Request(
        'DELETE FROM TestSchema.Employees Where Name = @Name;',
        function(err,rowCount,rows) {
            if(err){
                cb(err);
            } else {
                console.log(rowCount + 'row(s) deleted');
                cb(null)
            }
        }
    )

    request.addParameter('Name',TYPES.NVarChar,name);

    connection.execSql(request);
}

function Read(cb){
    console.log('Reading rows from the table....');
    request = new Request(
        'SELECT Id,Name,Location FROM TestSchema.Employees;',
        function(err,rowCount,rows){
            if(err){
                cb(err)
            }else{
                console.log(rowCount + 'row(s) returned');
                cb(null);
            }
        }
    );

    const result = " ";
    request.on('row',function(column){
        column.forEach(function(column){
            if(column.value === null){
                console.log('NULL');
            }else {
                result += column.value + "";
                //result = result + column.Value
            }
        });
        console.log(result);
        result = "";
    })
    connection.execSql(request)
}

function Complete(err,result){
    if(err){
        cb(err)
    }else{
        console.log("Done!");
    }
}

connection.on('connect',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('connected');

        async.waterfall([
            Start,
            Insert,
            Update,    
            Delete,
            Read
        ],Complete)
    }
 })