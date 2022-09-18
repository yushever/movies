import './network-state.css';

const NetworkState = ({ onNetworkState }) => {
  window.onoffline = () => {
    onNetworkState(false);
  };
  window.ononline = () => {
    onNetworkState(true);
  };
};
export default NetworkState;
