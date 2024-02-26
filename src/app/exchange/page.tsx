import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Exchange() {
  return (
    <div className="mx-8">
      <div className="flex items-center">
        <div className="container w-1/2 h-40 -mr-5">
          <div className="text-center">Coin 1</div>
        </div>
        <div className="w-16 h-16 z-10">
          <FontAwesomeIcon icon={faArrowRightArrowLeft} />
        </div>
        <div className="container w-1/2 h-40 -ml-5">
          <div className="text-center">Coin 2</div>
        </div>
      </div>
      <div className="container h-56 w-full mt-12">
        <div className="text-center">Chart</div>
      </div>
    </div>
  );
}
