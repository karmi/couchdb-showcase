// http://localhost:5984/addressbook/_design/person/_list/csv/all
// http://localhost:5984/addressbook/_design/person/_list/csv/by_name?reduce=false

function(head, req) {

  // log(req)

  var viewname = req.path.pop()
  var filename = req.info.db_name+'-'+viewname+'.csv'

  start(
    { "headers" : {
        "Content-Type" : "text/csv; charset=utf-8",
        "Content-Disposition" : "attachment; filename="+filename }
    }
  )

  send( "First name,Last Name,Occupation,Birthday\n" )

  while( row = getRow() ) {
    var doc = row.value
    send( [doc.first_name, doc.last_name, doc.occupation, doc.birthday].join(',') + "\n" )
  }

}
