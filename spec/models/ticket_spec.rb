require 'rails_helper'
require 'spec_helper'

describe Ticket do
  it "is valid without input" do
    expect(Ticket.new()).to be_valid
  end

  it "can be active or completed" do
    expect(Ticket.new(status: "active")).to be_valid
    expect(Ticket.new(status: "completed")).to be_valid
  end

  it "must be active or completed" do
    expect { Ticket.new(status: "flying") }.to raise_error(ArgumentError)
  end
end
