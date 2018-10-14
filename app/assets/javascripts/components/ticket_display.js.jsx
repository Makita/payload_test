function TicketRow(props) {
  return (
    <tr>
      <th scope="row">{props.id}</th>
      <td>{props.status}</td>
      <td>{props.status == "completed" && new Date(props.updatedAt).toLocaleString()}</td>
    </tr>
  );
}

function TicketTable(props) {
  return props.tickets.map((ticket) => <TicketRow id={ticket.id} status={ticket.status} updatedAt={ticket.updated_at} key={ticket.id} />);
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
