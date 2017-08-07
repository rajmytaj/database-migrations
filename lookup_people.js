var myArgs = process.argv.slice(2);

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function rowReturn (result) {
  console.log('Searching...');
  for (let i = result.rowCount; i > 0; i--){
    console.log(result.rows[i])
  }
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text or last_name = $1::text", [myArgs[0]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    rowReturn(result);
    // console.log(result.rows[0]);
    client.end();
  });
});