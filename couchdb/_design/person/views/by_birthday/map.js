// YEARS:             http://localhost:5984/addressbook/_design/person/_view/by_birthday?group_level=1
// YEARS AND MONTHS:  http://localhost:5984/addressbook/_design/person/_view/by_birthday?group_level=1
// FULL DATE:         http://localhost:5984/addressbook/_design/person/_view/by_birthday?group=true

function(doc) {
  var date = new Date(doc.birthday)
  emit( [date.getFullYear(), date.getMonth()+1, date.getDate()], 1 )
}
