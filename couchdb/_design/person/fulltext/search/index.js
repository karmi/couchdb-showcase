// Default fulltext search index for the database
// See: http://github.com/rnewson/couchdb-lucene

// http://localhost:5984/addressbook/_fti/_design/person/search?q=occupation:supermodel AND city:<CITY>

function(doc) {

  var result = new Document();

  if (doc.last_name)      { result.add(doc.last_name,     {"field":"last_name"})  }
  if (doc.occupation)     { result.add(doc.occupation,    {"field":"occupation"}) }

  if (doc.addresses)       {
    for (address in doc.addresses) {
      result.add(doc.addresses[address].city,     {"field":"city"})
      result.add(doc.addresses[address].country,  {"field":"country"})
    }
  }

  if (doc.birthday) {
    // Date string should be in format: YYYY/mm/dd HH:MM:SS
		result.add(new Date(doc.birthday), {"field":"birthday", "type":"date"});
	}

  return result;

}
