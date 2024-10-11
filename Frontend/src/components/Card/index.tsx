import styled from "styled-components";

const CardStyled = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	height: 70px;
	padding: 8px 16px;
	border: 1px solid #c8c6ee;
	border-radius: 4px;
	background-color: #d4d3f3;
	color: black;
	transition: all ease-in-out 0.3s;
	cursor: pointer;

	.div-subject {
		font-weight: 500;
		height: 19px;
	}

	.div-data-status {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 19px;
		font-weight: 400;

		p {
			color: #2a2a42;
		}
	}

	.div-status {
		display: flex;
		align-items: center;
		gap: 8px;

		p {
			color: #2a2a42;
		}
	}

	.status-circle {
		border-radius: 100%;
		height: 8px;
		width: 8px;
	}

	.yellow {
		background-color: #dea03c;
	}

	.green {
		background-color: #3cde3c;
	}

	.red {
		background-color: #de3c3c;
	}

	&:hover {
		background-color: #bebce7;
		border: 1px solid #b4b2e1;
	}
`;

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
		<CardStyled className="container-card">
			<div className="div-subject">
				<p>{subject}</p>
			</div>
			<div className="div-data-status">
				<p>{data}</p>
				<div className="div-status">
					<p>{status}</p>
					<div
						className={`status-circle ${handleStatusColor(status)}`}
					/>
				</div>
			</div>
		</CardStyled>
	);
};
