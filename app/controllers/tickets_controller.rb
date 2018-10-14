class TicketsController < ApplicationController
  def create
    @ticketer = Ticketer.new
    @ticket, @event = @ticketer.create_ticket

    render json: { ticket: @ticket, event: @event }
  rescue StandardError => e
    puts e.message

    render json: e.message, status: 500
  end
end
