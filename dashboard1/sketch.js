// Dashboard 1: GeoPulse
// Painel Informativo com API de Geolocalização (apiip.net)
// Estilização: Globo terrestre, partículas atmosféricas, cores baseadas na localização

let locationData = {
  country: "Carregando...",
  city: "Carregando...",
  ip: "Carregando...",
  latitude: 0,
  longitude: 0,
  timezone: "Carregando..."
};

let particles = [];
let stars = [];
let globeRotation = 0;
let pulseIntensity = 0;
let mainColorHue = 200;
let dataLoaded = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  
  // Criar estrelas de fundo
  for (let i = 0; i < 400; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      radius: random(1, 3),
      alpha: random(20, 80)
    });
  }
  
  // Criar partículas atmosféricas
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      vx: random(-0.3, 0.3),
      vy: random(-0.3, 0.3),
      size: random(2, 5),
      life: random(100)
    });
  }
  
  // Criar elemento de loading
  createLoadingScreen();
  
  // Buscar dados de localização
  fetchLocationData();
}

function createLoadingScreen() {
  let loadingDiv = createDiv('🌍 LOCALIZANDO...');
  loadingDiv.id('loading');
  loadingDiv.style('position', 'fixed');
  loadingDiv.style('top', '50%');
  loadingDiv.style('left', '50%');
  loadingDiv.style('transform', 'translate(-50%, -50%)');
  loadingDiv.style('color', 'white');
  loadingDiv.style('background', 'rgba(0,0,0,0.8)');
  loadingDiv.style('padding', '20px 40px');
  loadingDiv.style('border-radius', '30px');
  loadingDiv.style('font-family', 'monospace');
  loadingDiv.style('z-index', '100');
  loadingDiv.style('font-size', '14px');
  loadingDiv.style('letter-spacing', '2px');
}

async function fetchLocationData() {
  try {
    // API apiip.net (gratuita, sem chave para uso básico)
    let response = await fetch('https://apiip.net/api/check?accessKey=free');
    let data = await response.json();
    
    if (data) {
      locationData.country = data.countryName || "Desconhecido";
      locationData.city = data.city || "Desconhecida";
      locationData.ip = data.ip || "0.0.0.0";
      locationData.latitude = data.latitude || 0;
      locationData.longitude = data.longitude || 0;
      locationData.timezone = data.timeZone?.id || "Desconhecido";
      
      // Cor baseada nas coordenadas (mapeamento criativo)
      let hueFromLat = abs(locationData.latitude * 3.6) % 360;
      let hueFromLong = abs(locationData.longitude * 2.4) % 360;
      mainColorHue = (hueFromLat + hueFromLong) / 2;
      
      dataLoaded = true;
      
      // Esconder loading
      let loadingDiv = select('#loading');
      if (loadingDiv) {
        loadingDiv.style('opacity', '0');
        setTimeout(() => {
          if (loadingDiv) loadingDiv.remove();
        }, 1000);
      }
      
      updateInfoPanel();
    }
  } catch (error) {
    console.error('Erro ao buscar localização:', error);
    locationData.country = "Modo Offline";
    locationData.city = "Dados simulados";
    
    let loadingDiv = select('#loading');
    if (loadingDiv) {
      loadingDiv.html('⚠️ MODO OFFLINE - Dados Estáticos');
      setTimeout(() => {
        if (loadingDiv) loadingDiv.remove();
      }, 2000);
    }
    
    updateInfoPanel();
  }
}

function updateInfoPanel() {
  let panel = select('#infoPanel');
  if (!panel) {
    createInfoPanel();
  } else {
    select('#countryName').html(locationData.country);
    select('#cityName').html(locationData.city);
    select('#ipAddress').html(locationData.ip);
    select('#coordinates').html(`${Math.abs(locationData.latitude).toFixed(2)}° ${locationData.latitude >= 0 ? 'N' : 'S'} | ${Math.abs(locationData.longitude).toFixed(2)}° ${locationData.longitude >= 0 ? 'E' : 'W'}`);
    select('#timezoneInfo').html(locationData.timezone);
  }
}

function createInfoPanel() {
  let panel = createDiv('');
  panel.id('infoPanel');
  panel.style('position', 'fixed');
  panel.style('bottom', '20px');
  panel.style('left', '20px');
  panel.style('right', '20px');
  panel.style('background', 'rgba(0,0,0,0.75)');
  panel.style('backdrop-filter', 'blur(10px)');
  panel.style('border-radius', '16px');
  panel.style('padding', '15px 20px');
  panel.style('color', 'white');
  panel.style('font-family', 'monospace');
  panel.style('font-size', '12px');
  panel.style('z-index', '10');
  panel.style('border', '1px solid rgba(255,255,255,0.2)');
  
  panel.html(`
    <h3 style="margin:0 0 8px 0; font-size:14px; color:#66ffcc;">🌍 GEOPULSE | Sua Localização no Mundo</h3>
    <div style="display:flex; flex-wrap:wrap; gap:20px;">
      <div style="flex:1; min-width:150px;">
        <div style="font-size:10px; color:#aaa;">📍 País</div>
        <div id="countryName" style="font-size:14px; font-weight:bold; color:#ffaa66;">${locationData.country}</div>
      </div>
      <div style="flex:1; min-width:150px;">
        <div style="font-size:10px; color:#aaa;">🏙️ Cidade</div>
        <div id="cityName" style="font-size:14px; font-weight:bold; color:#ffaa66;">${locationData.city}</div>
      </div>
      <div style="flex:1; min-width:150px;">
        <div style="font-size:10px; color:#aaa;">🌐 Endereço IP</div>
        <div id="ipAddress" style="font-size:14px; font-weight:bold; color:#ffaa66;">${locationData.ip}</div>
      </div>
      <div style="flex:1; min-width:150px;">
        <div style="font-size:10px; color:#aaa;">🗺️ Coordenadas</div>
        <div id="coordinates" style="font-size:14px; font-weight:bold; color:#ffaa66;">${Math.abs(locationData.latitude).toFixed(2)}° ${locationData.latitude >= 0 ? 'N' : 'S'} | ${Math.abs(locationData.longitude).toFixed(2)}° ${locationData.longitude >= 0 ? 'E' : 'W'}</div>
      </div>
      <div style="flex:1; min-width:150px;">
        <div style="font-size:10px; color:#aaa;">⏰ Fuso Horário</div>
        <div id="timezoneInfo" style="font-size:14px; font-weight:bold; color:#ffaa66;">${locationData.timezone}</div>
      </div>
    </div>
  `);
}

function draw() {
  // Fundo gradiente (céu noturno)
  for (let y = 0; y <= height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let bgHue = 220;
    let bgBright = 5 + inter * 15;
    stroke(bgHue, 50, bgBright);
    line(0, y, width, y);
  }
  
  // Estrelas cintilantes
  for (let star of stars) {
    let twinkle = 50 + 30 * sin(millis() * 0.001 + star.x);
    fill(60, 20, twinkle);
    noStroke();
    circle(star.x, star.y, star.radius);
  }
  
  // Partículas atmosféricas (movimento suave)
  for (let p of particles) {
    p.vx += random(-0.03, 0.03);
    p.vy += random(-0.03, 0.03);
    p.vx = constrain(p.vx, -0.5, 0.5);
    p.vy = constrain(p.vy, -0.5, 0.5);
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.3;
    
    if (p.x < -50) p.x = width + 50;
    if (p.x > width + 50) p.x = -50;
    if (p.y < -50) p.y = height + 50;
    if (p.y > height + 50) p.y = -50;
    
    if (p.life <= 0) {
      p.x = random(width);
      p.y = random(height);
      p.life = 100;
      p.size = random(2, 6);
    }
    
    let particleHue = (mainColorHue + p.size * 20) % 360;
    fill(particleHue, 60, 70, 40);
    noStroke();
    circle(p.x, p.y, p.size);
  }
  
  // Pulsação baseada na latitude (quanto mais perto do equador, mais intenso)
  let latIntensity = abs(locationData.latitude) / 90;
  pulseIntensity = 0.5 + latIntensity * 0.5;
  
  // GLOMO TERRESTRE ESTILIZADO
  push();
  translate(width / 2, height / 2);
  
  // Rotação contínua
  globeRotation += 0.003;
  rotateY(globeRotation);
  
  let globeRadius = min(width, height) * 0.2;
  
  // Desenhar grades/longitudes (linhas do mapa)
  strokeWeight(1.5);
  for (let i = 0; i <= 12; i++) {
    let lon = map(i, 0, 12, -PI, PI);
    let x1 = cos(lon) * globeRadius;
    let z1 = sin(lon) * globeRadius;
    
    stroke(mainColorHue, 70, 80, 60);
    line(x1, -globeRadius, x1, globeRadius);
  }
  
  // Linhas de latitude
  for (let i = -5; i <= 5; i++) {
    let lat = map(i, -5, 5, -globeRadius, globeRadius);
    stroke(mainColorHue, 70, 80, 40);
    ellipse(0, lat, globeRadius * 2 * cos(asin(lat / globeRadius)), 3);
  }
  
  // Círculo principal do globo
  noFill();
  strokeWeight(2);
  stroke(mainColorHue, 80, 90, 80);
  ellipse(0, 0, globeRadius * 2, globeRadius * 2);
  
  // Ponto de localização do usuário
  if (locationData.latitude !== 0 && locationData.longitude !== 0) {
    let latRad = radians(locationData.latitude);
    let lonRad = radians(locationData.longitude);
    
    let xPoint = globeRadius * cos(latRad) * cos(lonRad);
    let zPoint = globeRadius * cos(latRad) * sin(lonRad);
    let yPoint = globeRadius * sin(latRad);
    
    push();
    translate(xPoint, yPoint, zPoint);
    fill(0, 100, 100);
    noStroke();
    sphere(8);
    pop();
    
    // Anel pulsante ao redor do ponto
    push();
    translate(xPoint, yPoint, zPoint);
    let pulseSize = 12 + sin(millis() * 0.008) * 4;
    noFill();
    stroke(0, 100, 100, 80);
    strokeWeight(1.5);
    sphere(pulseSize);
    pop();
  }
  
  pop();
  
  // Anéis orbitais decorativos
  push();
  translate(width / 2, height / 2);
  rotateX(radians(30));
  for (let i = 0; i < 3; i++) {
    let ringRadius = (min(width, height) * 0.25) + i * 20;
    let ringAlpha = 30 - i * 10;
    noFill();
    stroke(mainColorHue, 60, 80, ringAlpha);
    strokeWeight(1);
    ellipse(0, 0, ringRadius * 2, ringRadius * 0.5);
  }
  pop();
  
  // Atualizar texto se dados já carregados
  if (dataLoaded && select('#countryName')) {
    select('#countryName').html(locationData.country);
    select('#cityName').html(locationData.city);
    select('#coordinates').html(`${Math.abs(locationData.latitude).toFixed(2)}° ${locationData.latitude >= 0 ? 'N' : 'S'} | ${Math.abs(locationData.longitude).toFixed(2)}° ${locationData.longitude >= 0 ? 'E' : 'W'}`);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  stars = [];
  for (let i = 0; i < 400; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      radius: random(1, 3)
    });
  }
}
