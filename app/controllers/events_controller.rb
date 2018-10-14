class EventsController < ApplicationController
  def create
    raise StandardError
    @ticketer        = Ticketer.new
    @ticketer.ticket = params["ticket"]

    render json: { ticket: @ticket, event: @event }
  rescue StandardError
    render json: { status: "error", code: 500, message: "Something went wrong with the creation of the event." }
  end
end
