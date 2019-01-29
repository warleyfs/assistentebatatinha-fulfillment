'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

// a. Constante com o nome da(s) actions mapeadas
const SUM_ACTION = 'welcome-no-yes-twonumbers';

// b. Os parêmetros identificáveis nas actions
const NUMBER1_ARGUMENT = 'numero1';
const NUMBER2_ARGUMENT = 'numero2';

exports.batatinhaAssistant = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  // c. A função de tratamento da action
  function sumNumbers (app) {
    let number1 = app.getArgument(NUMBER1_ARGUMENT);
    let number2 = app.getArgument(NUMBER2_ARGUMENT);
   
    app.tell(`OK, a soma de ${number1} e ${number2} é ${(parseFloat(number1) + parseFloat(number2))}! Eu espero que tenha gostado da demo. Vejo você em breve.`);
  }
  
  // d. A construção do mapa de actions, que liga as intenções pelas actions às funções
  let actionMap = new Map();
  actionMap.set(SUM_ACTION, sumNumbers);

  app.handleRequest(actionMap);
});