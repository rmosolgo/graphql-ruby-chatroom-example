class Person < ApplicationRecord
  has_many :messages
  validates :screenname, uniqueness: true
end
