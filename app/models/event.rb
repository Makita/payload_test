class Event < ApplicationRecord
  belongs_to :ticket
  enum category: { start: 0, pickup: 1, delivery: 2, stop: 3 }
  validates_presence_of :category, :measurement
end
