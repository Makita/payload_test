function TicketSelectBoxes(props) {
  return props.tickets.map((ticket) => <option key={ticket.id}>{ticket.id}</option>);
}

class EventForm extends React.Component {
  constructor(props) {
    super(props);

    this.tickets = props.tickets;

    this.handleSubmit = props.handleSubmit;
  }

  render() {
    return (
      <form id="eventCreationForm" onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="eventTicketSelection">Ticket</label>
          <div className="col-sm-10">
            <select className="form-control" id="eventTicketSelection">
              <TicketSelectBoxes tickets={this.tickets} />
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="eventCategorySelection">Type</label>
          <div className="col-sm-10">
            <select className="form-control" id="eventCategorySelection">
              <option value="start">Start</option>
              <option value="pickup">Pickup</option>
              <option value="delivery">Delivery</option>
              <option value="stop">Stop</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="eventMeasurement">Measurement</label>
          <div className="col-sm-10">
            <input className="form-control" id="eventMeasurement" type="text" placeholder="Example: 100" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Add Event</button>
      </form>
    );
  }
}
