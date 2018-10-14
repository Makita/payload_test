require 'exceptions'

class Ticketer
  include Exceptions

  attr_accessor :ticket

  def create_ticket
    ActiveRecord::Base.transaction do
      @ticket = Ticket.create!
      @event = add_event_to_ticket("start")
    end

    return @ticket, @event
  end

  def add_event_to_ticket(category, measurement = nil)
    if category == "start" && !@event.nil?
      raise Exceptions::TicketAlreadyStarted
    end

    if category == "start" || category == "stop"
      measurement = 0
    end

    raise Exceptions::TicketAlreadyStopped if @ticket && @ticket.events.where(category: "stop").exists?
    ActiveRecord::Base.transaction do
      @event = Event.create!(ticket: @ticket, category: category, measurement: measurement)
      @ticket.update_attribute(:status, "completed") if category == "stop"
    end

    @event
  end
end
