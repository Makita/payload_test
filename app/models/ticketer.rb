require 'exceptions'

class Ticketer
  include Exceptions

  attr_accessor :ticket

  def create_ticket
    ActiveRecord::Base.transaction do
      @ticket = Ticket.create!
      add_event_to_ticket("start")
    end

    @ticket
  end

  def add_event_to_ticket(category, measurement = nil)
    measurement = 0 if %w(start stop).include?(category)
    raise Exceptions::TicketAlreadyStoppedError if @ticket && @ticket.events.where(category: "stop").exists?
    Event.create!(ticket: @ticket, category: category, measurement: measurement)
  rescue ActiveRecord::ActiveRecordError
    Event.new
  rescue Exceptions::TicketAlreadyStoppedError
    Event.new
  end

  # Destroy invokes callbacks but we're not using them anyway so this is better
  def delete_ticket
    @ticket.events.each { |event| event.delete }
    @ticket.delete
  end
end