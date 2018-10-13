class Ticket < ApplicationRecord
  has_many :events
  enum status: { active: 0, completed: 1 }
end
