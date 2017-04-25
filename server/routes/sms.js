const express = require('express');
const router = express.Router({ mergeParams: true });
const rp = require('request-promise');
const shortUrl = require('../helper/shortUrl');
router.post('/', (req, res, next) => {
  console.log(req.body);
  // shortUrl.bitly('http://www.google.com')
  //   .then(shortResponse => {
  //     console.log('shortResponse', { shortResponse });
  //     return res.send({ data: 'hi' });
  //   });
  const to = req.body.phone;
  return shortUrl.replaceUrl(req.body.body)
    .then(sendingMsg => {
      console.log('sendingMsg', sendingMsg);
      // return res.send({ data: 'hi' });
      const user = 'cddd0f7a6282d6dddbe6a3fc465b6ec4';
      const pass = '4ce6b564cf3a6ebddd6d2826a7f0dddc';
      const options = {
        uri: 'https://api.transmitsms.com/send-sms.json',
        method: 'POST',
        formData: { message: sendingMsg, to: to || 61478297160 },
        auth: { user, pass }
      };
      return rp(options)
        .then(apiResponse => {
          console.log('apiResponse', { apiResponse });
          return res.send('respond with a resource');
        })
        .catch(err => {
          console.log('err', JSON.stringify({ err }));
          return next(err);
        });
    });


  // return rp(options)
  //   .then(apiResponse => {
  //     // Process html like you would with jQuery...
  //     console.log('apiResponse', { apiResponse });
  //     return res.send('respond with a resource');
  //   })
  //   .catch(err => {
  //     // Crawling failed or Cheerio choked...
  //     console.log('err', JSON.stringify({ err }));
  //     return next(err);
  //   });
});

module.exports = router;
