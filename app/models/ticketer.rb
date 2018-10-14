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
    measurement = 0 if %w(start stop).include?(category)
    raise Exceptions::TicketAlreadyStopped if @ticket && @ticket.events.where(category: "stop").exists?
    ActiveRecord::Base.transaction do
      @event = Event.create!(ticket: @ticket, category: category, measurement: measurement)
      @ticket.update_attribute(:status, "completed") if category == "stop"
    end

    @event
  end

  # Destroy invokes callbacks but we're not using them anyway so this is better
  def delete_ticket
    @ticket.events.each { |event| event.delete }
    @ticket.delete
  end
end
