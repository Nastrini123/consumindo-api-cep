navigator.geolocation.getCurrentPosition(function(position) {
    const lat1 = position.coords.latitude;
    const lon1 = position.coords.longitude;
  
    const upas = [
      { name: 'UPA PETROLANDIA', lat: '-19.93052875021099', lon: '-44.113731274606316' },
      { name: 'UPA JK', lat: '-19.94272919945361', lon: '-44.036350999748606' },
      { name: 'UPA industrial', lat: '-19.967973804403172', lon: '-44.040466905287' },
      { name: 'UPA Teresópolis', lat: '-19.94851541990206', lon: '-44.12290563042996' },
    ];
  
    function haversineDistance(lat1, lon1, lat2, lon2) {
      function toRad(x) {
        return x * Math.PI / 180;
      }
  
      const R = 6371; 
      const x1 = lat2 - lat1;
      const dLat = toRad(x1);
      const x2 = lon2 - lon1;
      const dLon = toRad(x2)
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const d = R * c;
  
      return d;
    }
  
    let menorDistancia = Infinity;
    let upaMaisProxima = null;
  
    upas.forEach(function(upa) {
      const distance = haversineDistance(lat1, lon1, upa.lat, upa.lon);
      if (distance < menorDistancia) {
        menorDistancia = distance;
        upaMaisProxima = upa;
      }
    });
  
    console.log('A UPA mais próxima é: ' + upaMaisProxima.name + ', a uma distância de: ' + menorDistancia.toFixed(1) + ' km');
  });
  