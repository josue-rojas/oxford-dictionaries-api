let https = require('https');

function httpsGetRequest(options){
  return new Promise((resolve, reject)=>{
    https.get(options, (res)=>{
      // error handling
      // some code from : https://nodejs.org/api/http.html#http_http_get_options_callback
      const { statusCode } = res;
      const contentType = res.headers['content-type'];
      let error;
      if(statusCode !== 200){
        error = new Error(`Status Code:${statusCode}`);
      }
      else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
          `Expected application/json but received ${contentType}`);
      }
      if(error){
        res.resume();
        reject(error);
      }
      // handle data
      let data = '';
      res.on('data', (chunk)=> { data += chunk; });
      res.on('end', ()=>{
        resolve(JSON.parse(data));
      })
      // other errors
      .on('error', (e)=>{
        reject(new Error(e));
      });
    });
  });
}

class OxfordDictionaries {
  constructor(app_id, app_key){
    // these options should be the same for most request
    // except the path should be different
    this.options = {
      host : 'od-api.oxforddictionaries.com',
      port : 443,
      method: 'GET',
      path: '/api/v1',
      headers : {
        'Accept': 'application/json',
        'app_id': app_id,
        'app_key': app_key
      }
    }

    // setup functions for not so direct names endpoints
    // first bind this
    this.languages = this.languages.bind(this);
    this.filters = this.filters.bind(this);
    this.lexicalcategories = this.lexicalcategories.bind(this);
    this.registers = this.registers.bind(this);
    this.domains = this.domains.bind(this);
    this.regions = this.regions.bind(this);
    this.grammaticalFeatures = this.grammaticalFeatures.bind(this);
    // then setup objects
    this.utility = {
      languages: this.languages,
      filters: this.filters,
      lexicalcategories: this.lexicalcategories,
      registers: this.registers,
      domains: this.domains,
      regions: this.regions,
      grammaticalFeatures: this.grammaticalFeatures
    };
  }

  entries({word_id, source_lang, region, filters}){
    let options = { ...this.options };
    options.path += '/entries' +
            `/${source_lang || 'en'}` +
            `/${word_id}` +
            `${region ? '/regions=${region}' : ''}` +
            `${filters ? `/${filters}` : ''}`;
    return httpsGetRequest(options);
  }

  lemmatron({word_id, source_lang, filters}){
    let options = { ...this.options };
    options.path += '/inflections' +
            `/${source_lang || 'en'}` +
            `/${word_id}` +
            `${filters ? `/${filters}` : ''}`;
    return httpsGetRequest(options);
  }

  // search(source_lang, )

  translation({source_translation_language, word_id, target_translation_language}){
    let options = { ...this.options };
    options.path += '/entries' +
            `/${source_translation_language}` +
            `/${word_id}` +
            `/${target_translation_language}`;
    return httpsGetRequest(options);
  }

  thesaurus({word_id, source_lang, synonyms, antonyms}){
    let options = { ...this.options };
    options.path += '/entries' +
            `/${source_lang || 'en'}` +
            `/${word_id}` +
            `/${synonyms ? 'synonyms' : ''}` +
            `${synonyms && antonyms ? ';' : ''}` +
            `${antonyms ? 'antonyms' : ''}`;
    return httpsGetRequest(options);
  }

  // basic wordlist search for now
  wordlist({filters_basic, source_lang, limit, offset}){
    let options = { ...this.options };
    options.path += '/wordlist' +
          `/${source_lang || 'en'}` +
          `/${filters_basic}` +
          `${limit || offset ? '?' : ''}` +
          `${limit ? `limit=${limit}` : ''}` +
          `${offset ? `?offset=${offset}` : ''}`;
    return httpsGetRequest(options);
  }

  sentences({word_id, source_lang}){
    let options = { ...this.options };
    options.path += '/entries' +
            `/${source_lang || 'en'}` +
            `/${word_id}` +
            '/sentences';
    return httpsGetRequest(options);
  }

  lexistats({source_lang, corpus, wordform, trueCase, lemma, lexicalCategory}){
    let options = { ...this.options };
    options.path += '/stats/frequency/words' +
            `/${source_lang}` +
            '/?' +
            `${corpus ? `corpus=${corpus}` : ''}` +
            `${wordform ? `&wordform=${wordform}` : ''}` +
            `${trueCase ? `&trueCase=${trueCase}` : ''}` +
            `${lemma ? `&lemma=${lemma}` : ''}` +
            `${lexicalCategory ? `&lexicalCategory=${lexicalCategory}` : ''}`;
    return httpsGetRequest(options);
  }

  // utility functions
  languages({sourceLanguage, targetLanguage} = {}){
    let options = { ...this.options };
    options.path += '/languages?' +
          `${sourceLanguage ? `sourceLanguage=${sourceLanguage}` : ''}` +
          `${targetLanguage ? `&targetLanguage=${targetLanguage}`: ''}`;
    return httpsGetRequest(options);
  }

  filters({endpoint} = {}){
    let options = { ...this.options };
    options.path += '/filters' +
            `${endpoint ? `/${endpoint}` : ''}`;
    return httpsGetRequest(options);
  }

  lexicalcategories({language} = {}){
    let options = { ...this.options };
    options.path += '/lexicalcategories' +
            `/${language || 'en'}`;
    return httpsGetRequest(options);
  }

  registers({source_language, target_register_language} = {}){
    let options = { ...this.options };
    options.path += '/registers' +
            `/${source_language || 'en'}` +
            `${target_register_language ? `/${target_register_language}` : ''}`;
    return httpsGetRequest(options);
  }

  domains({source_language} = {}){
    let options = { ...this.options };
    options.path += '/domains' +
            `/${source_language || 'en'}` +
            `${target_register_language ? `/${target_register_language}` : ''}`;
    return httpsGetRequest(options);
  }

  regions({source_language} = {}){
    let options = { ...this.options };
    options.path += '/regions' +
            `/${source_language || 'en'}`;
    return httpsGetRequest(options);
  }

  grammaticalFeatures({source_language} = {}){
    let options = { ...this.options };
    options.path += '/grammaticalFeatures' +
            `/${source_language || 'en'}`;
    return httpsGetRequest(options);
  }
}

module.exports = OxfordDictionaries;
