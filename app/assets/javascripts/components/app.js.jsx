class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tickets: props.tickets,
      events: props.events,
    };

    this.handleTicketSubmit = this.handleTicketSubmit.bind(this);
    this.ticketSuccess = this.ticketSuccess.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.eventSuccess = this.eventSuccess.bind(this);
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
        alert(data.responseText);
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

    let formData = {
      ticket_id:   $("#eventTicketSelection").val(),
      category:    $("#eventCategorySelection").val(),
      measurement: $("#eventMeasurement").val(),
    };

    $.ajax({
      url:         '/events',
      method:      'POST',
      data:        formData,
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    })
      .done(this.eventSuccess)
      .fail(function(data) {
        alert(data.responseText);
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
