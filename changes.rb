#!/usr/bin/env ruby

require 'rubygems'
require 'uri'
require 'yajl/http_stream'
require 'rest_client'
require 'term/ansicolor'
require 'active_support/core_ext/hash'

class String; include Term::ANSIColor; end

STDOUT.sync = true
trap('INT')  { puts "\n\n*** Exiting..."; exit(0) }

module CouchDB
  class Changes

    attr_reader :server, :database, :last_seq

    def initialize(database)
      raise ArgumentError, "Please pass a database name" unless database
      @server   = 'http://localhost:5984'
      @database = database
      @last_seq = 0
    end

    def url
      URI.parse("#{server}/#{database}/_changes?feed=continuous&since=#{last_seq}")
    end

    def listen
      puts "Listening for changes in '#{database}'..."
      puts '-'*80

      Yajl::HttpStream.get(url, :symbolize_keys => true) do |response|
        break unless response[:id] && response[:seq]
        @last_seq = response[:seq]

        pid = Process.fork do
          exit if response[:id].to_s.include?('_design')
          current  = Yajl::Parser.parse RestClient.get("#{server}/#{database}/#{response[:id]}?revs=true").to_s, :symbolize_keys => true
          revision = current[:_revisions][:start].to_i > 1 ? "rev=#{current[:_revisions][:start].to_i-1}-#{current[:_revisions][:ids][1]}" : ''
          previous = Yajl::Parser.parse RestClient.get("#{server}/#{database}/#{response[:id]}?#{revision}").to_s, :symbolize_keys => true
          previous.delete_if { |key, value| key.to_s =~ /^_rev.*/ }
          current. delete_if { |key, value| key.to_s =~ /^_rev.*/ }
          puts "[#{Time.now.strftime('%H:%M:%S')}] Document ID #{response[:id].bold} received updates:"
          puts "- #{previous.diff(current).inspect}".white.on_red, "+ #{current.diff(previous).inspect}".white.on_green, '-' * 80
          exit
        end
        Process.detach(pid)

      end

    ensure
      listen unless $!.class == SystemExit
    end

  end
end

begin
  CouchDB::Changes.new(ARGV.pop).listen
rescue ArgumentError => e
  puts "[!] #{e.message}"
  exit(1)
end
