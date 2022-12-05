import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

const CoinListTable = ({ crypto, handleWatchLists, formatter, user }) => {
  const navigation = useNavigate();

  return (
    <TableRow
      sx={{ overflowY: "scroll !important" }}
      key={crypto.name}
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigation(`/coinDetail/${crypto.cryptoId}/market`);
      }}
    >
      <TableCell sx={{ width: "100px", textAlign: "center" }}>
        {crypto.market_cap_rank}
      </TableCell>
      <TableCell className="overflow-table line-height-t row-tbl-coin">
        <div className="flex-d-row">
          <img src={crypto.image} width="45px"></img>
          <p className="coin-name-col"> {crypto.name} </p>
        </div>
      </TableCell>
      <TableCell className="row-tbl-coin">
        {formatter.format(crypto.current_price)}
      </TableCell>
      <TableCell className="row-tbl-coin">
        {formatter.format(crypto.total_volume)}
      </TableCell>
      <TableCell className="row-tbl-coin">
        {formatter.format(crypto.market_cap)}
      </TableCell>
      {user && (
        <TableCell align="center">
          <button
            className="btn-coin"
            onClick={async (e) => {
              e.stopPropagation();
              await handleWatchLists(
                crypto.cryptoId,
                crypto.name,
                crypto.image
              );
            }}
          >
            add
          </button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default CoinListTable;
