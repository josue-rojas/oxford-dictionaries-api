const env = require('dotenv').config();
let oxforddic= require('./index');
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

let oxforddictionaries = new oxforddic(app_id, app_key);

// .entries test
test("entries function returns object", () => {
  return oxforddictionaries.entries({ word_id: 'ace' })
    .then((data) => {
      expect(typeof data).toBe("object");
    });
});

// .lemmas test
test("lemmas function returns object", () => {
  return oxforddictionaries.lemmas({ word_id: 'ace' })
    .then((data) => {
      expect(typeof data).toBe("object");
    });
});

// not testing the rest of the functions because i do not have an the right api keys for it. (i have the prototype account read more here: https://developer.oxforddictionaries.com/documentation/getting_started) 

// .search test
// test("search function returns object", () => {
//   return oxforddictionaries.search({q: 'cat'})
//   .then((data) => {
//     expect(typeof data).toBe("object");
//   });
// });

// same failing as above (this is part of search i think)
// .translation test
// test("translation function returns object", () => {
//   return oxforddictionaries.translation({ word_id: 'ace' })
//     .then((data) => {
//       expect(typeof data).toBe("object");
//     });
// });

// same failing as above
// .thesaurus test
// test("thesaurus function returns object", () => {
//   return oxforddictionaries.lemmas({word_id: 'ace'})
//   .then((data) => {
//     expect(typeof data).toBe("object");
//   });
// });
