export function BowlpoolTableFooter(props) {
  return (
    <tfoot className="position-sticky">
      <tr className="footer">
        <th className="footer">Total</th>
        {!props.hideBowlData && <th className="footer"></th>}
        {!props.hideBowlData && <th className="footer"></th>}
        <th className="footer"></th>
        {props.playerData !== [] &&
          props.playerData.map((p, i) => (
            <th key={i} id="footCols" className="bg-light footer">
              {p.points}
            </th>
          ))}
      </tr>
    </tfoot>
  );
}
