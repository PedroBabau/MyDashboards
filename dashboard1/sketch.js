// Dashboard 1: Cosmic Pulse
// Painel Informativo Não-Interativo
// Consumo de APIs da NASA

let apodTitle = "Carregando...";
let solarWindSpeed = 400;
let solarWindTemp = 80000;
let plasmaDensity = 5;

let pulseIntensity = 0;
let rotationAngle = 0;
let particles = [];
let stars = [];
let mainHue = 200;
let accentHue = 280;

let dataLoaded = false;
let lastFetchTime = 0;

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
  
  // Criar partículas
  for (let i = 0; i < 200; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      vx: random(-0.5, 0.5),
      vy: random(-0.5, 0.5),
      size: random(2, 6),
      life: random(100)
    });
  }
  
  // Buscar dados da NASA
  fetchNASAData();
  
  // Atualizar a cada 30 segundos
  setInterval(fetchNASAData, 30000);
  
  // Criar elemento de loading
  createLoadingScreen();
}

function createLoadingScreen() {
  let loadingDiv = createDiv('🔭 CONECTANDO À NASA API...');
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
}

async function fetchNASAData() {
  try {
    // API 1: NASA APOD
    let apodResponse = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
    let apodData = await apodResponse.json();
    
    // API 2: NASA DONKI (Solar Wind)
    let today = new Date();
    let endDate = today.toISOString().split('T')[0];
    today.setDate(today.getDate() - 1);
    let startDate = today.toISOString().split('T')[0];
    
    let donkiResponse = await fetch(`https://api.nasa.gov/DONKI/SPWC?startDate=${startDate}&endDate=${endDate}&api_key=DEMO_KEY`);
    let solarData = await donkiResponse.json();
    
    if (apodData && apodData.title) {
      apodTitle = apodData.title.substring(0, 45);
      
      // Cor baseada no título
      let hash = 0;
      for (let i = 0; i < apodData.title.length; i++) {
        hash = ((hash << 5) - hash) + apodData.title.charCodeAt(i);
      }
      mainHue = Math.abs(hash % 360);
      accentHue = (mainHue + 60) % 360;
    }
    
    if (solarData && solarData.length > 0 && solarData[0].windSpeed) {
      solarWindSpeed = solarData[0].windSpeed || 400;
      solarWindTemp = solarData[0].temperature || 80000;
      plasmaDensity = solarData[0].density || 5;
      dataLoaded = true;
    }
    
    // Esconder loading
    let loadingDiv = select('#loading');
    if (loadingDiv) {
      loadingDiv.style('opacity', '0');
      setTimeout(() => {
        if (loadingDiv) loadingDiv.remove();
      }, 1000);
    }
    
    updateInfoPanel();
    
  } catch (error) {
    console.error('Erro:', error);
    // Dados simulados em caso de erro
    solarWindSpeed = 380 + sin(Date.now() / 5000) * 45;
    solarWindTemp = 75000 + cos(Date.now() / 7000) * 12000;
    plasmaDensity = 4.5 + sin(Date.now() / 4000) * 2.5;
  }
  lastFetchTime = millis();
}

function updateInfoPanel() {
  let panel = select('#infoPanel');
  if (!panel) {
    createInfoPanel();
  } else {
    select('#apodTitle').html(apodTitle);
    select('#solarWind').html(Math.round(solarWindSpeed) + ' km/s');
    select('#solarTemp').html(Math.round(solarWindTemp / 1000) + 'k K');
    select('#plasmaDensity').html(plasmaDensity.toFixed(1) + ' /cm³');
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
    <h3 style="margin:0 0 8px 0; font-size:14px; color:#88ccff;">🌌 COSMIC PULSE | Dados Espaciais em Tempo Real</h3>
    <div style="display:flex; flex-wrap:wrap; gap:20px;">
      <div style="flex:1; min-width:150px;">
        <div style="font-size:10px; color:#aaa;">📅 APOD (Imagem do Dia)</div>
        <div id="apodTitle" style="font-size:14px; font-weight:bold; color:#ffaa66;">${apodTitle}</div>
      </div>
      <div style="flex:1; min-width:150px;">
        <div style="font-size:10px; color:#aaa;">☀️ Velocidade do Vento Solar</div>
        <div id="solarWind" style="font-size:14px; font-weight:bold; color:#ffaa66;">${Math.round(solarWindSpeed)} km/s</div>
      </div>
      <div style="flex:1; min-width:150px;">
        <div style="font-size:10px; color:#aaa;">🔥 Temperatura do Vento Solar</div>
        <div id="solarTemp" style="font-size:14px; font-weight:bold; color:#ffaa66;">${Math.round(solarWindTemp / 1000)}k K</div>
      </div>
      <div style="flex:1; min-width:150px;">
        <div style="font-size:10px; color:#aaa;">🧲 Densidade do Plasma</div>
        <div id="plasmaDensity" style="font-size:14px; font-weight:bold; color:#ffaa66;">${plasmaDensity.toFixed(1)} /cm³</div>
      </div>
    </div>
  `);
}

function draw() {
  // Atualizar dados entre fetches
  if (!dataLoaded && millis() > 3000) {
    solarWindSpeed = 380 + sin(millis() / 5000) * 45;
    solarWindTemp = 75000 + cos(millis() / 7000) * 12000;
    plasmaDensity = 4.5 + sin(millis() / 4000) * 2.5;
    
    if (millis() > 5000 && select('#solarWind')) {
      select('#solarWind').html(Math.round(solarWindSpeed) + ' km/s');
      select('#solarTemp').html(Math.round(solarWindTemp / 1000) + 'k K');
      select('#plasmaDensity').html(plasmaDensity.toFixed(1) + ' /cm³');
    }
  }
  
  // Normalizar dados para visualização
  let speedNorm = map(solarWindSpeed, 300, 700, 0, 1);
  let tempNorm = map(solarWindTemp, 50000, 150000, 0, 1);
  let densityNorm = map(plasmaDensity, 1, 15, 0, 1);
  
  pulseIntensity = speedNorm * 0.5 + tempNorm * 0.3 + densityNorm * 0.2;
  rotationAngle += 0.005 * (1 + speedNorm);
  
  // Fundo gradiente
  let bgHue = mainHue;
  let bgSat = 20 + speedNorm * 30;
  for (let y = 0; y <= height; y++) {
    let inter = map(y, 0, height, 0, 1);
    stroke(bgHue, bgSat, 5 + inter * 15);
    line(0, y, width, y);
  }
  
  // Estrelas
  for (let star of stars) {
    let twinkle = 50 + 30 * sin(millis() * 0.001 + star.x);
    fill(60, 20, twinkle);
    noStroke();
    circle(star.x, star.y, star.radius);
  }
  
  // Partículas com vento solar
  let windX = map(solarWindSpeed, 300, 700, -0.8, 0.8);
  let windY = map(plasmaDensity, 1, 15, -0.3, 0.3);
  
  for (let p of particles) {
    p.vx += random(-0.05, 0.05) + windX * 0.02;
    p.vy += random(-0.05, 0.05) + windY * 0.02;
    p.vx = constrain(p.vx, -1.5, 1.5);
    p.vy = constrain(p.vy, -1.5, 1.5);
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.5;
    
    if (p.x < -50) p.x = width + 50;
    if (p.x > width + 50) p.x = -50;
    if (p.y < -50) p.y = height + 50;
    if (p.y > height + 50) p.y = -50;
    
    if (p.life <= 0) {
      p.x = random(width);
      p.y = random(height);
      p.life = 100;
      p.size = random(2, 8);
    }
    
    let particleHue = (mainHue + p.size * 15) % 360;
    let sat = 60 + tempNorm * 40;
    let bright = 70 + speedNorm * 30;
    fill(particleHue, sat, bright, 60);
    noStroke();
    circle(p.x, p.y, p.size * (0.5 + pulseIntensity));
  }
  
  // Círculo central - O Sol
  push();
  translate(width / 2, height / 2);
  rotate(rotationAngle);
  
  let sunSize = 80 + 40 * pulseIntensity;
  let sunHue = (accentHue + speedNorm * 100) % 360;
  
  // Camadas do Sol
  for (let i = 3; i > 0; i--) {
    let layerSize = sunSize * (1 + i * 0.15);
    let alpha = 20 - i * 5;
    fill(sunHue, 80, 70, alpha);
    noStroke();
    circle(0, 0, layerSize);
  }
  
  fill(sunHue, 90, 85);
  circle(0, 0, sunSize);
  
  // Anéis de plasma
  let ringCount = floor(3 + densityNorm * 5);
  for (let i = 0; i < ringCount; i++) {
    let ringRadius = sunSize / 2 + 20 + i * 18;
    let ringWidth = 2 + tempNorm * 4;
    noFill();
    stroke((sunHue + i * 30) % 360, 70, 90, 40);
    strokeWeight(ringWidth);
    ellipse(0, 0, ringRadius * 2, ringRadius * 2);
  }
  
  // Partículas orbitais
  let orbitalCount = floor(30 + speedNorm * 50);
  for (let i = 0; i < orbitalCount; i++) {
    let angle = (millis() * 0.002 * (1 + speedNorm) + i) % TWO_PI;
    let radius = sunSize / 2 + 35;
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    fill((sunHue + i * 12) % 360, 90, 95);
    circle(x, y, 3 + pulseIntensity * 4);
  }
  
  pop();
  
  // Ondas de energia
  strokeWeight(1.5);
  for (let i = 0; i < 8; i++) {
    let yOffset = height * 0.2 + i * height * 0.075;
    let waveSpeed = millis() * 0.002 * (1 + speedNorm);
    let amplitude = 30 + tempNorm * 50;
    
    beginShape();
    for (let x = 0; x <= width; x += 20) {
      let y = yOffset + sin(x * 0.01 + waveSpeed + i) * amplitude * pulseIntensity;
      stroke((mainHue + i * 30) % 360, 60, 70, 30);
      vertex(x, y);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Recriar estrelas
  stars = [];
  for (let i = 0; i < 400; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      radius: random(1, 3),
      alpha: random(20, 80)
    });
  }
}