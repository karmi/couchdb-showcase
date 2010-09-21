function(doc, req) {

  var phones = []; 
  for (type in doc.phones) { phones.push( 'TEL;TYPE='+type.toUpperCase()+':'+doc.phones[type] ) }

  var addresses = []
  for (type in doc.addresses) {
    addresses.push( 'ADR;TYPE='+type.toUpperCase()+':;;' +
      doc.addresses[type].number + ' ' + doc.addresses[type].street + ';' +
      doc.addresses[type].city + ';' +
      doc.addresses[type].country
    )
  }

  var body = (<vcard>BEGIN:VCARD
VERSION:3.0
N:{doc.last_name};{doc.first_name}
FN:{doc.first_name} {doc.last_name}
{phones.join("\n")}
{addresses.join("\n")}
END:VCARD</vcard>).toString()

  return {
    body    : body,
    headers : {
      "Content-Type" : "text/x-vcard"
    }
  }
}
