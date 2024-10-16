import { CardStyled } from './CardStyled';
import {
  handleRenderStatus,
  handleStatusColor,
} from '../../Utils/HandleStatus';
import { renderDateInfo } from '../../Utils/RenderDateInfo';

export const Card = ({
  status,
  title,
  Display,
  proposed_date,
  onClick,
}: CardProps) => {
  return (
    <CardStyled
      display={Display === 'Flex' ? 'flex' : 'none'}
      className="container-card"
      onClick={onClick}
    >
      <div className="div-subject">
        <p>{title}</p>
      </div>
      <div className="div-data-status">
        <p>{renderDateInfo(status, proposed_date)?.toString()}</p>
        <div className="div-status">
          <p>{handleRenderStatus(status)}</p>
          <div className={`status-circle ${handleStatusColor(status)}`} />
        </div>
      </div>
    </CardStyled>
  );
};
