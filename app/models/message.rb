class Message < ApplicationRecord
  belongs_to :room
  belongs_to :person
end
