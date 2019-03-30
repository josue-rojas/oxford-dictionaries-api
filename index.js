let https = require('https');

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
  }

  //
  entries(word_id, source_lang, region, filters){
    let options = {...this.options};
    options.path += '/entries/'+
            `${source_lang || 'en'}`+
            `/${word_id}`+
            `${region ? '/regions=${region}' : ''}`+
            `${filters ? `/${filters}` : ''}`;
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

}

module.exports = OxfordDictionaries;
