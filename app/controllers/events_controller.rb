require 'ticketer'

class EventsController < ApplicationController
  def create
    @ticketer        = Ticketer.new
    @ticketer.ticket = Ticket.find_by_id(params["ticket_id"])
    @event           = @ticketer.add_event_to_ticket(params["category"], params["measurement"])

    render json: @event
  rescue StandardError => e
    puts e.message

    render json: e.message, status: 500
  end
end
