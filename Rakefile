require 'rake'
require 'couchrest'
require 'faker'
require 'active_support/json'

class String
  def parameterize
    self.gsub(/[^a-z0-9\-_]+/i, '-').downcase
  end
end

class Array
  def random_slice
    shuffle.slice( Kernel.rand(self.size),  Kernel.rand(self.size)+1)
  end
end

Database = CouchRest.database!('http://127.0.0.1:5984/addressbook')

desc "Create COUNT documents in adressbook"
task :populate do
  count = ENV['COUNT'] || 1

  Database.recreate!

  count.to_i.times do |i|
    name       = [Faker::Name.first_name, Faker::Name.last_name]
    id         = name.join(' ').parameterize

    phones     = %w{mobile home work}.random_slice.inject({})  { |hash, type| hash[type] = Faker::PhoneNumber.phone_number; hash }
    addresses  = %w{work home       }.random_slice.inject({}) do |hash, type|
      hash[type] = {
        :street  => Faker::Address.street_name,
        :number  => Faker.numerify(%w{### #### ###/##}.rand),
        :city    => Faker::Address.city,
        :country => ['Australia', 'United Kingdom', 'New Zealand'].rand
      }
      hash
    end

    occupation = %w{supermodel programmer designer}.rand

    birthday   = Time.local(Time.now.year - rand(80), rand(12)+1, rand(31)+1).strftime("%Y/%m/%d")

    groups     = %w{family friends work}.random_slice


    doc = {
      '_id'       => id,
      :first_name => name.first,
      :last_name  => name.last,

      :phones     => phones,
      :addresses  => addresses,

      :occupation => occupation,

      :birthday   => birthday,

      :groups     => groups
    }

    puts doc.to_json
    Database.save_doc(doc)

    Rake::Task['views'].execute
    
  end

end

desc "Upload database logic from ./couchdb/_design/views"
task :views do
  require 'couch_docs/design_directory' # Note: Gem version blows up on RestClient version incompatibility with CouchRest
  dir = CouchDocs::DesignDirectory.new('couchdb/_design/person')
  doc = dir.to_hash
  doc.update '_id' => '_design/person', 'language' => 'javascript'
  rev = Database.get('_design/person')['_rev'] rescue nil
  doc.update( {'_rev' => rev} ) if rev
  p doc['views'].keys
  response = Database.save_doc(doc)
  p response
end
