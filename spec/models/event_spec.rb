require 'rails_helper'
require 'spec_helper'

describe Event do
  before(:each) do
    @ticket = Ticket.new
  end

  it "responds to ticket" do
    expect(Event.new(ticket: @ticket, category: "start", measurement: 0)).to respond_to(:ticket)
  end

  it "is valid with valid attributes" do
    expect(Event.new(ticket: @ticket, category: "start", measurement: 0)).to be_valid
  end

  it "must have a ticket" do
    expect(Event.new(category: "start", measurement: 0)).to_not be_valid
  end

  it "must have a category" do
    expect(Event.new(ticket: @ticket, measurement: 0)).to_not be_valid
  end

  it "must have a measurement" do
    expect(Event.new(ticket: @ticket, category: "start")).to_not be_valid
  end

  it "cannot accept an invalid category" do
    expect { Event.new(ticket: @ticket, category: "meme", measurement: 0) }.to raise_error(ArgumentError)
  end
end
