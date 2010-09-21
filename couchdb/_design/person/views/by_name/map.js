// ORDERED BY LAST NAME
// -> http://localhost:5984/addressbook/_design/person/_view/by_name?reduce=false

// REVERSE ORDERED BY LAST NAME
// -> http://localhost:5984/addressbook/_design/person/_view/by_name?reduce=false&descending=true

// EXACT MATCH
// -> http://localhost:5984/addressbook/_design/person/_view/by_name?key=%22Waters%20Jaquelin%22&reduce=false&include_docs=true

function(doc) {
  if (doc.last_name && doc.first_name) {
    emit( doc.last_name + ' ' + doc.first_name, 1 )
  }
}
