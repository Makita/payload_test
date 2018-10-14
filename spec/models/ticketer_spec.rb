require 'rails_helper'
require 'spec_helper'

describe Ticketer do
  describe '.create_ticket' do
    before(:each) do
      @ticketer = Ticketer.new
    end

    it "makes both a ticket and an event" do
      @ticket, @event = @ticketer.create_ticket

      expect(Ticket.where(id: @ticket.id)).to exist
      expect(@ticket.events).to exist
    end

    it "returns a valid ticket and event" do
      @ticket, @event = @ticketer.create_ticket

      expect(@ticket).to_not be_nil
      expect(@event).to_not be_nil
    end

    it "makes a ticket that has status active" do
      @ticket, @event = @ticketer.create_ticket

      expect(@ticket.status).to eq "active"
    end
  end

  describe '.add_event_to_ticket' do
    before(:each) do
      @ticketer        = Ticketer.new
      @ticketer.create_ticket
    end

    it "makes an event with valid attributes" do
      @ticketer.add_event_to_ticket("pickup", 10)

      expect(@ticketer.ticket.events.length).to eq 2
    end

    it "requires a valid ticket" do
      @ticketer.ticket = nil

      expect { @ticketer.add_event_to_ticket("stop") }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "requires a measurement for pickup and delivery" do
      expect { @ticketer.add_event_to_ticket("pickup") }.to raise_error(ActiveRecord::RecordInvalid)
      expect { @ticketer.add_event_to_ticket("delivery") }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "does not allow any event additions after a stop event" do
      @ticketer.add_event_to_ticket("stop")

      expect { @ticketer.add_event_to_ticket("pickup", 10) }.to raise_exception(Exceptions::TicketAlreadyStopped)
    end

    it "changes ticket status to completed if event is of category stop" do
      @ticketer.add_event_to_ticket("stop")

      expect(@ticketer.ticket.status).to eq "completed"
    end
  end

  describe '.delete_ticket' do
    before(:each) do
      @ticketer        = Ticketer.new
      @ticketer.ticket = Ticket.create
      @ticketer.add_event_to_ticket("start")
      @ticketer.add_event_to_ticket("pickup", 10)
      @ticketer.add_event_to_ticket("stop")
    end

    it "deletes the ticket" do
      @ticketer.delete_ticket
      expect(Ticket.all).to_not exist
    end

    it "removes all events for that ticket" do
      @ticketer.delete_ticket
      expect(Event.where(ticket_id: 1)).to_not exist
    end
  end
end
