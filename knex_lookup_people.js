var myArgs = process.argv[2];

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

const reformatResults = function (resultsRow) {
  resultsRow.forEach((item, index) => {
    let firstName = item.first_name;
    let lastName = item.last_name;
    let birthDate = item.birthdate.toString().substring(0,15);
    console.log(`- ${index +1}: ${firstName} ${lastName}, born '${birthDate}'`);
  });
}

knex.select('*').from('famous_people')
.where('first_name', myArgs).orWhere('last_name', myArgs)
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  reformatResults(rows);
});

knex.destroy();





