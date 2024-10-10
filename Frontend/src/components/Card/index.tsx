import "./card.css"

interface CardProps {
  status: "Pendente" | "Cancelada" | "Agendada";
  data: string;
  subject: string;
}

export const Card = ({ status, data, subject }: CardProps) => {
  function handleStatusColor(status: string) {
    if (status === "Pendente") {
      return "yellow";
    } else if (status === "Cancelada") {
      return "red";
    } else {
      return "green";
    }
  }
  return (
    <div className="container-card">
      <div className="div-subject">
        <p>{subject}</p>
      </div>
      <div className="div-data-status">
        <p>{data}</p>
        <div className="div-status">
          <div className={handleStatusColor(status)}></div>
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
};
