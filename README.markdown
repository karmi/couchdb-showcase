CouchDB Showcase
================

This application is a showcase of the basic [CouchDB](http://couchdb.apache.org/) database features.

It allows you to populate a sample database with contacts, example [view definitions](http://guide.couchdb.org/draft/views.html)
to query the data, as well as [_show](http://guide.couchdb.org/draft/show.html) and
[_list](http://guide.couchdb.org/draft/transforming.html) functions to transform
the documents and queries into another format (HTML, vCard and CSV).

After installation, your application should be available here: <http://localhost:5984/addressbook/_design/person/_list/all/all>.

Installation
------------

You will need a working and running CouchDB version 1.0.1 or higher, a Ruby interpreter and a Rubygems packaging system.

First make sure that you have the [Bundler](http://gembundler.com/) gem installed:

    $ gem list bundler

If not, install it:

    $ sudo gem install bundler

Then, run the check for the required Rubygems:

    $ bundle list

And install thosse missing:

    $ bundle install


Usage
-----

Once you have the neccessary tools installed, run the default Rake task:

    $ rake

This should populate a database named `addressbook` in CouchDB with data and code.

A list of URLs to begin exploration is printed when the task ends.

When you make changes to the code, or you want to re-populate the data, you can run the individual tasks.
See their list:

    $ rake -T

To test CouchDB's `_changes` feed, you can execute this task:

    $ rake changes DATABASE=addressbook

Any changes to the data you'll make should be printed in your terminal.


The code
--------

All the Ruby support code is in the `Rakefile` file. It is deliberately very procedural, to be easy to follow.

All the view definitions are in the `couchdb/_design/person/views` folder.

Show and list functions are in their respective folders.

You can use the [Watchr](http://github.com/mynyml/watchr) gem to continually update code inside the database after
you change it:

    $ watchr .push


Resources
---------

* [CouchDB — The Definitive Guide](http://guide.couchdb.org)
* [Mike Miller: CouchDB — no:sql(east) conference](https://nosqleast.com/2009/#speaker/miller)
* [Migrating to CouchDB with a Focus on Views](http://www.couch.io/migrating-to-couchdb)

