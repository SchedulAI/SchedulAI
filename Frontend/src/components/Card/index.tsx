import { CardStyled } from './CardStyled';
import {
  handleRenderStatus,
  handleStatusColor,
} from '../../Utils/HandleStatus';
import { renderDateInfo } from '../../Utils/RenderDateInfo';

export const Card = ({
  status,
  title,
  visibility,
  proposed_date,
  onClick,
}: CardProps) => {
  return (
    <>
      {status === 'deleted' ? null : (
        <CardStyled
          visibility={visibility === true ? '1' : '0'}
          className="container-card"
          onClick={onClick}
        >
          <div className="div-subject">
            <p>{title}</p>
          </div>
          <div className="div-data-status">
            {proposed_date && status !== 'cancelled' && (
              <p>Data: {renderDateInfo(status, proposed_date)?.toString()}</p>
            )}
            <div className="div-status">
              <p>{`Status: ${handleRenderStatus(status)}`}</p>
              <div className={`status-circle ${handleStatusColor(status)}`} />
            </div>
          </div>
        </CardStyled>
      )}
    </>
  );
};
