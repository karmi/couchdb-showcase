// http://localhost:5984/addressbook/_design/person/_view/by_country?group=true
// http://localhost:5984/addressbook/_design/person/_view/by_country?group_level=1

function(doc) {
  for (address in doc.addresses) {
    var country = doc.addresses[address].country
    if ( country ) {
      emit( [country, address], 1 )
    }
  }
}
