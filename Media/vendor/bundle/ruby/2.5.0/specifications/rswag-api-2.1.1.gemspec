# -*- encoding: utf-8 -*-
# stub: rswag-api 2.1.1 ruby lib

Gem::Specification.new do |s|
  s.name = "rswag-api".freeze
  s.version = "2.1.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Richie Morris".freeze]
  s.date = "2019-10-18"
  s.description = "Open up your API to the phenomenal Swagger ecosystem by exposing Swagger files, that describe your service, as JSON endpoints".freeze
  s.email = ["domaindrivendev@gmail.com".freeze]
  s.homepage = "https://github.com/domaindrivendev/rswag".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "2.7.6".freeze
  s.summary = "A Rails Engine that exposes Swagger files as JSON endpoints".freeze

  s.installed_by_version = "2.7.6" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<railties>.freeze, ["< 6.1", ">= 3.1"])
    else
      s.add_dependency(%q<railties>.freeze, ["< 6.1", ">= 3.1"])
    end
  else
    s.add_dependency(%q<railties>.freeze, ["< 6.1", ">= 3.1"])
  end
end
