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

  // HTML tag, attribute we want, attribute to search for, value the attribute we search for should
  // have
  getTagAttr(tag, attr, checkAttr, checkValue) {
    var tags = document.getElementsByTagName(tag);

    for(let i = 0; i < tags.length; i++) {
      if(tags[i].getAttribute(checkAttr) == checkValue) {
        return tags[i].getAttribute(attr);
      }
    }
  }

  // Get rid of jQuery $.ajax dependency with this
  post(url, data) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.onload = () => {
        if(xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(new Error("Server responded with failure status."));
        }
      };
      xhr.onerror = () => {
        reject(new Error("Failed to POST to " + url + "."));
      };
      // Get past Rails cross-site stuff
      xhr.setRequestHeader('X-CSRF-Token', this.getTagAttr('meta', 'content', 'name', 'csrf-token'));
      xhr.send(data);
    }.bind(this));
  }

  handleTicketSubmit(event) {
    event.preventDefault();

    this.post('/tickets', {})
      .then(this.ticketSuccess)
      .catch(function(data) {
        console.log(data);
        alert(data);
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

    var formData = new FormData();
    formData.append("ticket_id",   document.getElementById("eventTicketSelection").value);
    formData.append("category",    document.getElementById("eventCategorySelection").value);
    formData.append("measurement", document.getElementById("eventMeasurement").value);

    this.post('/events', formData)
      .then(this.eventSuccess)
      .catch(function(data) {
        console.log(data);
        alert(data);
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
