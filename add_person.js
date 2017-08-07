var myArgs = process.argv.slice(2,5);

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : 'localhost',
    user : 'development',
    password : 'development',
    database : 'vagrant'
  }
});

console.log(myArgs);
// console.log("rohit ", myArgs[2]);

knex('famous_people').insert({first_name: myArgs[0], last_name: myArgs[1], birthdate: myArgs[2]})
.asCallback(function(err, rows) {
  if (err) return console.error(err);
});

knex.destroy();