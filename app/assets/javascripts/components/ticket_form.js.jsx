class TicketForm extends React.Component {
  constructor(props) {
    super(props);

    this.tickets = props.tickets;
    this.events = props.events;

    this.handleSubmit = props.handleSubmit;
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <button type="submit" className="btn btn-primary">Create New Ticket</button>
        </form>
      </React.Fragment>
    );
  }
}
