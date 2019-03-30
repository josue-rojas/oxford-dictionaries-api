# oxford-dictionaries-api
node module wraper for [Oxford dictionaries api](https://developer.oxforddictionaries.com)

### TODO:
- need to implement search api
- need to implement lexistats (/words and /ngrams) api
- need to implement utility api
- need to implement wordlist with advance filter api
- need to add testing and test
- need to update readme

## Already implemented
- entries
- lemmatron
- translation
- thesaurus
- wordlist (basic filters only, not advance filters)
- sentences
- lexistats (only /word)

a quick how to...
```bash
npm install --save oxford-dictionaries-api
```

```javascript
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;


let oxford= require('oxford-dictionaries-api');
// create a new oxforddictionaries class with set id and key
let oxforddictionaries = new oxford(app_id, app_key);

// get entries
oxforddictionaries.entries('ace')
  .then((data)=>{
    console.log('entries');
    console.log(data);
  })

// get wordlist
oxforddictionaries.wordlist('registers=Rare;domains=Art')
  .then((data)=>{
    console.log('wordlist');
    console.log(data);
  })
```
