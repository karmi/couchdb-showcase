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

desc "Create COUNT documents in adressbook"
task :fake do
  count = ENV['COUNT'] || 1

  count.to_i.times do |i|
    name = [Faker::Name.first_name, Faker::Name.last_name]
    id   = name.join(' ').parameterize

    phones = {}
    addresses = {}

    occupation = %w{model programmer doctor}.rand

    birthday = Time.local(Time.now.year - rand(80), rand(12)+1, rand(31)+1).strftime("%Y/%m/%d")

    groups = %w{family friends work}.random_slice

    doc = {
      :id => id,
      :first_name => name.first,
      :last_name  => name.last,

      :phones => phones,
      :phones => addresses,

      :occupation => occupation,

      :birthday => birthday,

      :groups => groups

    }

    puts doc.to_json
  end

end
