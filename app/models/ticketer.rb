class Ticketer
  def create_ticket
    ActiveRecord::Base.transaction do
      @ticket = Ticket.create!
      @event = Event.create!(ticket: @ticket, type: "start", measurement: 0)
    end
  end
rescue ActiveRecordError
  false
end
