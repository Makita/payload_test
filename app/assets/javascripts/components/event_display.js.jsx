function EventRow(props) {
  return (
    <tr>
      <th scope="row">{props.id}</th>
      <td>{props.ticket}</td>
      <td>{props.category}</td>
      <td>{props.category == "start" || props.category == "stop" ? "N/A" : props.measurement}</td>
    </tr>
  );
}

function EventTable(props) {
  return props.events.map((event) => <EventRow id={event.id} ticket={event.ticket_id} category={event.category} measurement={event.measurement} key={event.id} />);
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
