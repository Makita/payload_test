function EventTable(props) {
  return props.events.map((event) => {
    return (
      <tr>
        <th scope="row">{event.id}</th>
        <td>{event.ticket}</td>
        <td>{event.category}</td>
        <td>{event.category !== "start" && event.category !== "stop" && event.measurement}</td>
      </tr>
    )
  });
}

class EventDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.events = props.events;
  }

  render() {
    return (
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <TableHeaders texts={["#", "Ticket", "Category", "Measurement"]} />
          </tr>
        </thead>
        <tbody>
          <EventTable events={this.events} />
        </tbody>
      </table>
    );
  }
}
