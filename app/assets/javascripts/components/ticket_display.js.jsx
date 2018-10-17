function TicketTable(props) {
  return props.tickets.map((ticket) => {
    <tr>
      <th scope="row">{ticket.id}</th>
      <td>{ticket.status}</td>
      <td>{ticket.status === "completed" && new Date(event.updated_at).toLocaleString()}</td>
    </tr>
  });
}

class TicketDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.tickets = props.tickets;
  }

  render() {
    return (
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <TableHeaders texts={["#", "Status", "Completed On"]} />
          </tr>
        </thead>
        <tbody>
          <TicketTable tickets={this.tickets} />
        </tbody>
      </table>
    );
  }
}
