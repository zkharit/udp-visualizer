import { useSearchParams } from "react-router-dom"

// useVisualizerParams hook
// return side, ipaddress, and port values from a search query
// if there is no value, or it is invalid, then return undefined for that value
export const useVisualizerParams = () => {
  const [searchParams] = useSearchParams();
  let side = searchParams.get('side');
  let ipAddress = searchParams.get('ip');
  let port = searchParams.get('port');

  // check if a valid side is passed in the search query
  if(side !== 'source' && side !== 'destination' ) {
    side = undefined;
  }

  // check if a valid ip address is passed in the search query
  const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
  if(!ipv4Regex.test(ipAddress)) {
    ipAddress = undefined;
  }

  // check if a valid port is passed in the search query
  if(isNaN(port) || port > 65535 || port < 1 || !Number.isInteger(+port)) {
    port = undefined;
  }

  return [ side, ipAddress, port ];
}