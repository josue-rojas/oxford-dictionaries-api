# oxford-dictionaries-api
node module wraper for [Oxford dictionaries api](https://developer.oxforddictionaries.com)

## Install
```bash
npm install --save oxford-dictionaries-api
```

## Usage
### initial
Initialize an instance of the OxfordDictionaries class to use
```javascript
// need app_id and app_key
const app_id = 'your_appid'
const app_key = 'your_appkey';

let oxford= require('oxford-dictionaries-api');
let oxforddictionaries = new oxford(app_id, app_key);
```

### functions

#### entries({word_id, source_lang, region, filters})
function takes in an object with the following:


| Key | Type | Optional | About |
| --- | --- | -- | --- |
| word_id | String | No | An Entry identifier. Case-sensitive. |
| source_lang | String | Yes | IANA language code |
| region | String | Yes | Region filter parameter. gb = Oxford Dictionary of English. us = New Oxford American Dictionary. |
| filters | String | Yes | Separate filtering conditions using a semicolon. Conditions take values grammaticalFeatures and/or lexicalCategory and are case-sensitive. To list multiple values in single condition divide them with comma. |

Example:
```javascript
// https://developer.oxforddictionaries.com/documentation#!/Dictionary32entries/get_entries_source_lang_word_id
// Use this to retrieve definitions, pronunciations, example sentences, grammatical information and word origins
oxforddictionaries.entries({word_id: 'ace'})
  .then((data)=> console.log(data));

// https://developer.oxforddictionaries.com/documentation#!/Dictionary32entries/get_entries_source_lang_word_id_regions_region
// Use this filter to restrict the lookup to either our Oxford Dictionary of English (GB) or New Oxford American Dictionary (US).
oxforddictionaries.entries({word_id: 'ace', region: 'gb'})
  .then((data)=> console.log(data));

// https://developer.oxforddictionaries.com/documentation#!/Dictionary32entries/get_entries_source_lang_word_id_filters
// Use filters to limit the entry information that is returned.
oxforddictionaries.entries({word_id: 'ace', filter: 'grammaticalFeatures=singular,past;lexicalCategory=noun'})
  .then((data)=> console.log(data));

```

#### lemmatron({word_id, source_lang, filters})
function takes in an object with the following:

|Key | Type | Optional | About |
| --- | --- | -- | --- |
| word_id | String | No | The input word |
| source_lang | String | Yes | IANA language code |
| filters | String | Yes | Separate filtering conditions using a semicolon. Conditions take values grammaticalFeatures and/or lexicalCategory and are case-sensitive. To list multiple values in single condition divide them with comma.


#### translation({source_translation_language, word_id, target_translation_language})
function takes in an object with the following:

|Key | Type | Optional | About |
| --- | --- | -- | --- |
| source_lang | String | No | IANA language code |
| word_id | String| No| The source word|
| target_translation_language | String | No | IANA language code |

#### thesaurus({word_id, source_lang, synonyms, antonyms})
function takes in an object with the following:

|Key | Type | Optional | About |
| --- | --- | -- | --- |
| word_id | String | No | An Entry identifier. Case-sensitive |
| source_lang | String | Yes | IANA language code |
| synonyms | boolean | No | Flag to get synonyms |
| antonyms | boolean | No | Flag to get antonyms |

#### wordlist({filters_basic, source_lang, limit, offset})
function takes in an object with the following:

|Key | Type | Optional | About |
| --- | --- | -- | --- |
| filters_basic | | | |
| source_lang | | | |
| limit | | | |
| offset | | | |

#### sentences({word_id, source_lang})
function takes in an object with the following:

|Key | Type | Optional | About |
| --- | --- | -- | --- |
| word_id | String | No | An Entry identifier. Case-sensitive. |
| source_lang | String | Yes | IANA language code |

#### lexistats({source_lang, corpus, wordform, trueCase, lemma, lexicalCategory})
Note only endpoint: /stats/frequency/word/{source_lang}/

function takes in an object with the following:

|Key | Type | Optional | About |
| --- | --- | -- | --- |
| source_lang | String | No | ANA language code |
| corpus | String | No | For corpora other than 'nmc' (New Monitor Corpus) please contact api@oxforddictionaries.com |
| wordform | String | Yes | The written form of the word to look up (preserving case e.g., Books vs books) |
| trueCase | String | Yes | The written form of the word to look up with normalised case (Books --> books) |
| lemma | String | Yes | The lemma of the word to look up (e.g., Book, booked, books all have the lemma "book") |
| lexicalCategory | String | Yes | The lexical category of the word(s) to look up (e.g., noun or verb) |


### TODO:
(all for v2)
- lexistats

## Already implemented (need testing)
- entries
- lemmas
- search
- translation
- thesaurus
- sentences
- utility
