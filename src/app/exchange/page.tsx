import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CoinDropdown from "../components/coinDropdown";
export default function Exchange() {
  const btcCoin = { symbol: "btc", image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" };
  const ethCoin = { symbol: "eth", image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png" };

  return (
    <div className="mx-8">
      <div className="flex items-center">
        <div className="container w-1/2 h-52 -mr-3">
          <div className="text-center">
            <CoinDropdown defaultCoin={btcCoin} />
          </div>
        </div>
        <div className="w-12 h-12 z-10">
          <FontAwesomeIcon icon={faArrowRightArrowLeft} />
        </div>
        <div className="container w-1/2 h-52 -ml-3">
          <div className="text-center">
            <CoinDropdown defaultCoin={ethCoin} />
          </div>
        </div>
      </div>
      <div className="container h-56 min-w-full mt-12">
        <div className="text-center">Chart</div>
      </div>
    </div>
  );
}
