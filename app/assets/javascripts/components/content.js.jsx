function TableHeaders(props) {
  return props.texts.map((text) => <th scope="col" key={text}>{text}</th>);
}

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.currentPage = props.currentPage;
    this.tickets = props.tickets || [];
    this.events = props.events || [];

    this.handleTicketSubmit = props.handleTicketSubmit;
    this.handleEventSubmit = props.handleEventSubmit;
  }

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron">
          <h2>Current Tickets</h2>
          <TicketDisplay tickets={this.tickets} tableHeaders={TableHeaders} />
          <TicketForm tickets={this.tickets} handleSubmit={this.handleTicketSubmit} />
        </div>
        <div className="jumbotron" style={{marginBottom: 0}}>
          <h2>Current Events</h2>
          <EventDisplay events={this.events} tableHeaders={TableHeaders} />
          <EventForm tickets={this.tickets} handleSubmit={this.handleEventSubmit} />
        </div>
      </React.Fragment>
    );
  }
}
