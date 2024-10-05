export const getStatusText = (status) => {
  switch (status) {
    case "Revision":
      return <span className="text-revision">{status}</span>;
    case "Ongoing":
      return <span className="text-ongoing">{status}</span>;
    case "Waiting":
      return <span className="text-waiting">{status}</span>;
    case "Delivered":
      return <span className="text-delivered">{status}</span>;
    case "Completed":
      return <span className="text-primary">{status}</span>;
    case "Canceled":
      return <span className="text-canceled">{status}</span>;
    case "Dispute":
      return <span className="text-dispute">{status}</span>;
    default:
      return <span>{status}</span>;
  }
};
