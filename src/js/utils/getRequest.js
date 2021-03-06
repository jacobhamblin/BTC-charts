function getRequest(url, callback) {
  const component = this
  const request = new XMLHttpRequest()
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      callback(request.responseText)
    } else {
      console.log('We reached our target server, but it returned an error')
    }
  };

  request.onerror = function() {
    console.log('There was a connection error of some sort')
  };

  request.send();
}


export default getRequest
