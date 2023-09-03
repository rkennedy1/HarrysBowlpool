import { Player } from '../../util/DataModels';

interface BowlpoolTableFooterProps {
  hideBowlData: boolean;
  playerData: Player[];
}

export const BowlpoolTableFooter: React.FC<BowlpoolTableFooterProps> = (
  props
) => {
  return (
    <tfoot className="position-sticky">
      <tr className="footer">
        <th className="footer">Total</th>
        {!props.hideBowlData && <th className="footer"></th>}
        {!props.hideBowlData && <th className="footer"></th>}
        <th className="footer"></th>
        {props.playerData !== undefined &&
          props.playerData.map((p, i) => (
            <th key={i} id="footCols" className="bg-light footer">
              {p.points}
            </th>
          ))}
      </tr>
    </tfoot>
  );
};
