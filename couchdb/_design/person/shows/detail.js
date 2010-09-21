// See:
// * http://guide.couchdb.org/draft/show.html
// * https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Processing_XML_with_E4X

function(doc, req) {
  
  var full_name = doc.first_name + ' ' + doc.last_name

  doc.phones.toString = function() {
    var phones = []; for (prop in this) { if ( prop != 'toString' ) phones.push( this[prop] + ' (' + prop + ')' ) }
    return phones.join(', ')
  }

    return (<html>
      <head>
        <title>{full_name} (Address Book)</title>
        <link rel="stylesheet" href="../../../assets/style.css" />
        <link rel="shortcut icon" href="../../../assets/favicon.ico" />
      </head>
      <body>
        <h1>{full_name}</h1>
        <p>Occupation:      {doc.occupation}</p>
        <p>Birthday:        {doc.birthday}</p>
        <p>Groups:          {doc.groups.join(', ')}</p>
        <p>Phone numbers:   {doc.phones}</p>
      </body>
    </html>).
      toXMLString()

}
