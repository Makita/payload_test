class TicketsController < ApplicationController
  def create
    @ticketer = Ticketer.new
    @ticket, @event = @ticketer.create_ticket

    render json: { ticket: @ticket, event: @event }
  rescue StandardError
    render json: { status: "error", code: 500, message: "Something went wrong with the creation of the ticket." }
  end
end
