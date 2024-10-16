import { CardStyled } from './CardStyled';
import {
  handleRenderStatus,
  handleStatusColor,
} from '../../Utils/HandleStatus';
import { renderDateInfo } from '../../Utils/RenderDateInfo';

export const Card = ({
  status,
  eventDate,
  eventTime,
  proposedDateRange,
  subject,
  Display,
  onClick,
}: CardProps) => {
  return (
    <CardStyled
      display={Display === 'Flex' ? 'flex' : 'none'}
      className="container-card"
      onClick={onClick}
    >
      <div className="div-subject">
        <p>{subject}</p>
      </div>
      <div className="div-data-status">
        <p>{renderDateInfo(status, eventDate, eventTime, proposedDateRange)}</p>
        <div className="div-status">
          <p>{handleRenderStatus(status)}</p>
          <div className={`status-circle ${handleStatusColor(status)}`} />
        </div>
      </div>
    </CardStyled>
  );
};
