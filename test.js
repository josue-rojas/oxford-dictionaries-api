const env = require('dotenv').config();

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

let oxforddic= require('./index');
let oxforddictionaries = new oxforddic(app_id, app_key);

oxforddictionaries.entries({word_id: 'ace'})
  .then((data)=>{
    console.log('entries',data);
  })

oxforddictionaries.wordlist({filters_basic:'registers=Rare;domains=Art'})
  .then((data)=>{
    console.log('wordlist',data);
  })

oxforddictionaries.utility.languages()
  .then((data)=> console.log('languages',data));
