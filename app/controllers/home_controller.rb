class HomeController < ApplicationController
  def index
    @tickets = Ticket.all
    @events = Event.all
  end
end
