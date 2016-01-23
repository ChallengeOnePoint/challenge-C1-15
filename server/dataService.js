var get = require('get-json-plz')

function getContacts(next) {
  get('http://cdn.bemyapp.com/files/2016/one-point/fixtures/challenge-full-stack/addressBook.json', function (err, data) {
    next(data)
	})
}

exports.getContacts = getContacts