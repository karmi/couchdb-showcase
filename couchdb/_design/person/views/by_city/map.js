function(doc) {
  // emit(doc.city, 1) => null
  for (address in doc.addresses) {
    var city = doc.addresses[address].city
    if ( city ) {
      emit( city, 1 )
    }
  }
}
