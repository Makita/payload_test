class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: window.location.hash || "#list",
      tickets: props.tickets,
      events: props.events,
    };

    this.ticketSuccess = this.ticketSuccess.bind(this);
    this.handleTicketSubmit = this.handleTicketSubmit.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
  }

  handleTicketSubmit(event) {
    event.preventDefault();

    $.ajax({
      url:     '/tickets',
      method:  'POST',
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    })
      .done(this.ticketSuccess)
      .fail(function(data) {
        alert(data.message);
      });
  }

  ticketSuccess(data) {
    console.log(data);

    this.state.tickets.push(data.ticket);
    this.state.events.push(data.event);

    this.setState({
      tickets: this.state.tickets,
      events: this.state.events,
    });
  }

  handleEventSubmit(event) {
    event.preventDefault();

    $.ajax({
      url:     '/events',
      method:  'POST',
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    })
      .done(this.eventSuccess)
      .fail(function(data) {
        alert(data.message);
      });
  }

  eventSuccess(data) {
    console.log(data);

    this.state.events.push(data);

    this.setState({
      events: this.state.events,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Content
          tickets={this.state.tickets}
          events={this.state.events}
          handleTicketSubmit={this.handleTicketSubmit}
          handleEventSubmit={this.handleEventSubmit}
        />
      </React.Fragment>
    );
  }
}
