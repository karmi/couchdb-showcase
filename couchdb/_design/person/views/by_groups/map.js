function(doc) {
  for (group in doc.groups) {
    emit(doc.groups[group], 1)
  }
}
