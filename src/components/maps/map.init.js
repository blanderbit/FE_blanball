const script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAmUDDHhlOLNsCXDTnlSQHDPCW33iP0wXU&callback=initMap';
script.async = true;
script.onload = () => {
  window.googleMapInfoStatus = 'onload'
};

script.onerror = () => {
  window.googleMapInfoStatus = 'onerror'
};
window.initMap = () => {
  window.googleMapInfoStatus = 'initMap'
};
document.head.appendChild(script);