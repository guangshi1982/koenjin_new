'use strict';

var _ = require('lodash');
var braintree = require('braintree');

// for sandbox of Braintree
var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'p755xhndy9ky3dqt',
    publicKey:    'vyc6fz6n2w3stkyb',
    privateKey:   '4484d28e1069b9994a625730344fd32e'
});

// Get list of users
exports.index = function(req, res) {
  res.json([{"users": "none"}]);
};

// Create client token and send id for pay
exports.token = function(req, res) {
  console.log('token');
  gateway.clientToken.generate({
    customerId: ""
  }, function (err, response) {
  	console.log('clientToken:%s', response.clientToken);
    res.send(response.clientToken);
  });
};

// Receive a payment method and create a transaction
exports.purchase = function(req, res) {
  var nonce = req.body.payment_method_nonce;
  // Use payment method nonce here
  console.log('payment_method_nonce:%s', nonce);
  
  gateway.transaction.sale({
    amount: '10.00',
    //paymentMethodNonce: nonce,
    //paymemtMethodNonce: braintree.Test.Nonces.Transactable,
    //paymemtMethodNonce: braintree.Test.Nonces.Consumed,
    paymemtMethodNonce: braintree.Test.Nonces.PayPalOneTimePayment,
    //paymemtMethodNonce: braintree.Test.Nonces.PayPalFuturePayment,
  }, function (err, result) {
  });
};