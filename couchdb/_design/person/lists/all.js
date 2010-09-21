// http://localhost:5984/addressbook/_design/person/_list/all/by_name?reduce=false

function(head, req) {

  var header = '<html><head><title>Address Book</title><link rel="stylesheet" href="../../../assets/style.css" /><link rel="shortcut icon" href="../../../assets/favicon.ico" /></head><body><h1>Address Book</h1>'

  var footer = '</body></html>'

  start({"headers":{"Content-Type" : "text/html; charset=utf-8"}})

  send(header)

  while( row = getRow() ) {
    var doc = row.value
    send( (<p><a href={'../../_show/detail/'+doc._id}>{doc.first_name} {doc.last_name}</a></p>).toXMLString() )
  }

  send(footer)

}
