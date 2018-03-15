# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "bicycle"
  spec.version       = "0.1.0"
  spec.authors       = ["Roben Kleene"]
  spec.email         = ["contact@robenkleene.com"]

  spec.summary       = "Bicycle for the mind."
  spec.homepage      = "https://github.com/robenkleene/bicycle"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 3.7"
  spec.add_runtime_dependency "raster", "~> 0.0"

  spec.add_development_dependency "bundler", "~> 1.16"
  spec.add_development_dependency "rake", "~> 12.0"
end
