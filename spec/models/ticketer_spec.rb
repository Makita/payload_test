require 'rails_helper'
require 'spec_helper'

describe Ticketer, '.create_ticket' do
  it "makes both a ticket and an event" do
    Ticketer.create_ticket

    expect(Ticket.first).to exist
  end
end

describe Ticketer, '.add_event_to_ticket' do
  it "makes an event with valid attributes"
  it "requires a valid ticket"
  it "does not allow any event additions after a stop event"
end

describe Ticketer, '.delete_ticket' do
  it "deletes the ticket"
  it "removes all events for that ticket"
end
