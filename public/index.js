grecaptcha.ready(function () {
  grecaptcha.execute('6LcTXIsaAAAAAGWE4913KuaqU1tTT9uyqmvPADcn', { action: 'demo' })
    .then(function (token) {
      document.getElementsByClassName('g-recaptcha-response')[0].value = token;
      document.getElementsByClassName('g-recaptcha-response')[1].value = token;
    });
});