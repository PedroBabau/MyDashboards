// Dashboard 2: AI Canvas Lab
// Painel Interativo com Geração de Imagens via IA
// Filtros e pós-processamento em tempo real

let img = null;
let originalPixels = null;
let currentFilter = 'none';
let radialAmount = 0;
let saturationAmount = 100;
let brightnessAmount = 0;

let promptInput;
let styleSelect;
let generateBtn;
let statusDiv;

let canvasW = 600;
let canvasH = 600;

function setup() {
  let canvas = createCanvas(canvasW, canvasH);
  canvas.parent('canvas-container');
  background(20);
  
  // Criar elementos da interface
  createUI();
  
  textAlign(CENTER, CENTER);
  textSize(16);
  fill(150);
  text("🎨 Digite um prompt e clique em\nGERAR IMAGEM COM IA", width/2, height/2);
}

function createUI() {
  // Container principal
  let container = select('#controls-container');
  if (!container) {
    let mainContainer = createDiv('');
    mainContainer.id('controls-container');
    mainContainer.style('position', 'fixed');
    mainContainer.style('top', '20px');
    mainContainer.style('right', '20px');
    mainContainer.style('width', '320px');
    mainContainer.style('background', 'rgba(15,25,45,0.95)');
    mainContainer.style('backdrop-filter', 'blur(10px)');
    mainContainer.style('border-radius', '20px');
    mainContainer.style('padding', '20px');
    mainContainer.style('color', 'white');
    mainContainer.style('font-family', 'system-ui');
    mainContainer.style('z-index', '100');
    mainContainer.style('border', '1px solid rgba(255,255,255,0.1)');
    container = mainContainer;
  }
  
  container.html(`
    <h2 style="margin:0 0 5px 0; font-size:1.5rem; background:linear-gradient(135deg,#a78bfa,#f472b6); -webkit-background-clip:text; background-clip:text; color:transparent;">🎨 AI Canvas Lab</h2>
    <p style="color:#94a3b8; font-size:0.85rem; margin-bottom:20px;">Gerador de imagens com IA + Filtros interativos</p>
    
    <div style="margin-bottom:20px;">
      <label style="display:block; margin-bottom:8px; font-weight:600; font-size:0.85rem;">🎭 Prompt criativo</label>
      <input type="text" id="prompt" value="ethereal cosmic nebula, vibrant colors, digital art" style="width:100%; padding:10px; border-radius:12px; border:1px solid #334155; background:#1e293b; color:white;">
    </div>
    
    <div style="margin-bottom:20px;">
      <label style="display:block; margin-bottom:8px; font-weight:600; font-size:0.85rem;">📐 Estilo</label>
      <select id="style" style="width:100%; padding:10px; border-radius:12px; border:1px solid #334155; background:#1e293b; color:white;">
        <option value="cinematic">Cinematográfico</option>
        <option value="fantasy">Fantasia</option>
        <option value="cyberpunk">Cyberpunk</option>
        <option value="anime">Anime</option>
        <option value="oil-painting">Pintura a óleo</option>
      </select>
    </div>
    
    <button id="generateBtn" style="width:100%; padding:12px; border-radius:12px; border:none; background:linear-gradient(135deg,#8b5cf6,#7c3aed); color:white; font-weight:bold; cursor:pointer; margin-bottom:20px;">✨ Gerar Imagem com IA</button>
    
    <div style="border-top:1px solid #334155; padding-top:20px;">
      <h3 style="font-size:1rem; margin-bottom:15px; color:#a78bfa;">🎛️ Pós-Processamento</h3>
      
      <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:8px; margin-bottom:15px;">
        <button class="filter-btn" data-filter="pixelate" style="background:#334155; padding:8px; border-radius:10px; border:none; color:white; cursor:pointer;">Pixelate</button>
        <button class="filter-btn" data-filter="glitch" style="background:#334155; padding:8px; border-radius:10px; border:none; color:white; cursor:pointer;">Glitch</button>
        <button class="filter-btn" data-filter="invert" style="background:#334155; padding:8px; border-radius:10px; border:none; color:white; cursor:pointer;">Inverter</button>
        <button class="filter-btn" data-filter="threshold" style="background:#334155; padding:8px; border-radius:10px; border:none; color:white; cursor:pointer;">B&W</button>
        <button class="filter-btn" data-filter="emboss" style="background:#334155; padding:8px; border-radius:10px; border:none; color:white; cursor:pointer;">Relevo</button>
        <button class="filter-btn" data-filter="edges" style="background:#334155; padding:8px; border-radius:10px; border:none; color:white; cursor:pointer;">Bordas</button>
        <button class="filter-btn" data-filter="reset" style="background:#334155; padding:8px; border-radius:10px; border:none; color:white; cursor:pointer;">Resetar</button>
      </div>
      
      <div style="margin-bottom:15px;">
        <label>🌀 Distorção Radial <span id="radialVal" style="background:#1e293b; padding:4px 8px; border-radius:8px; font-size:12px; margin-left:8px;">0</span></label>
        <input type="range" id="radialDistort" min="0" max="100" value="0" style="width:100%; margin:10px 0;">
      </div>
      
      <div style="margin-bottom:15px;">
        <label>🌈 Saturação <span id="satVal" style="background:#1e293b; padding:4px 8px; border-radius:8px; font-size:12px; margin-left:8px;">100%</span></label>
        <input type="range" id="saturation" min="0" max="200" value="100" style="width:100%; margin:10px 0;">
      </div>
      
      <div style="margin-bottom:15px;">
        <label>🔆 Brilho <span id="brightVal" style="background:#1e293b; padding:4px 8px; border-radius:8px; font-size:12px; margin-left:8px;">0</span></label>
        <input type="range" id="brightness" min="-100" max="100" value="0" style="width:100%; margin:10px 0;">
      </div>
    </div>
    
    <div id="status" style="background:#0f172a; border-radius:12px; padding:12px; margin-top:15px; font-size:12px; text-align:center; color:#94a3b8;">💡 Digite um prompt e clique em gerar!</div>
  `);
  
  // Event listeners
  select('#generateBtn').mousePressed(generateImage);
  
  selectAll('.filter-btn').forEach(btn => {
    btn.mousePressed(() => {
      currentFilter = btn.elt.dataset.filter;
      if (currentFilter === 'reset') {
        resetImage();
      } else {
        applyFilterToImage();
      }
    });
  });
  
  select('#radialDistort').input(() => {
    radialAmount = int(select('#radialDistort').value());
    select('#radialVal').html(radialAmount);
    applyFilterToImage();
  });
  
  select('#saturation').input(() => {
    saturationAmount = int(select('#saturation').value());
    select('#satVal').html(saturationAmount + '%');
    applyFilterToImage();
  });
  
  select('#brightness').input(() => {
    brightnessAmount = int(select('#brightness').value());
    select('#brightVal').html(brightnessAmount);
    applyFilterToImage();
  });
}

async function generateImage() {
  let prompt = select('#prompt').value();
  let style = select('#style').value();
  let statusDiv = select('#status');
  
  if (!prompt.trim()) {
    statusDiv.html('⚠️ Por favor, insira um prompt!');
    return;
  }
  
  statusDiv.html('🎨 Gerando imagem com IA... ⏳');
  statusDiv.style('color', '#fbbf24');
  
  let fullPrompt = `${prompt}, ${style} style, high quality, detailed`;
  let encodedPrompt = encodeURIComponent(fullPrompt);
  let imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${canvasW}&height=${canvasH}&seed=${Date.now()}`;
  
  loadImage(imageUrl, 
    (loadedImg) => {
      img = loadedImg;
      if (img.width !== width || img.height !== height) {
        img.resize(width, height);
      }
      
      img.loadPixels();
      originalPixels = [...img.pixels];
      
      statusDiv.html('✅ Imagem gerada! Use os filtros e controles.');
      statusDiv.style('color', '#94a3b8');
      
      // Resetar efeitos
      currentFilter = 'none';
      radialAmount = 0;
      saturationAmount = 100;
      brightnessAmount = 0;
      select('#radialDistort').value(0);
      select('#saturation').value(100);
      select('#brightness').value(0);
      select('#radialVal').html('0');
      select('#satVal').html('100%');
      select('#brightVal').html('0');
      
      image(img, 0, 0);
    },
    (err) => {
      console.error(err);
      statusDiv.html('❌ Erro ao gerar imagem. Tente outro prompt!');
      statusDiv.style('color', '#ef4444');
    }
  );
}

function resetImage() {
  if (!originalPixels) return;
  
  img.loadPixels();
  for (let i = 0; i < originalPixels.length; i++) {
    img.pixels[i] = originalPixels[i];
  }
  img.updatePixels();
  image(img, 0, 0);
  
  radialAmount = 0;
  saturationAmount = 100;
  brightnessAmount = 0;
  currentFilter = 'none';
  select('#radialDistort').value(0);
  select('#saturation').value(100);
  select('#brightness').value(0);
  select('#radialVal').html('0');
  select('#satVal').html('100%');
  select('#brightVal').html('0');
}

function applyFilterToImage() {
  if (!img || !originalPixels) return;
  
  // Reset para original
  img.loadPixels();
  for (let i = 0; i < originalPixels.length; i++) {
    img.pixels[i] = originalPixels[i];
  }
  
  // Aplicar filtro
  if (currentFilter !== 'none') {
    applyPixelFilter();
  }
  
  // Ajustes de cor
  applyColorAdjustments();
  
  // Distorção radial
  if (radialAmount > 0) {
    applyRadialDistortion();
  }
  
  img.updatePixels();
  image(img, 0, 0);
}

function applyPixelFilter() {
  img.loadPixels();
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let idx = (y * width + x) * 4;
      let r = img.pixels[idx];
      let g = img.pixels[idx + 1];
      let b = img.pixels[idx + 2];
      
      switch(currentFilter) {
        case 'pixelate':
          let pixelSize = 8;
          let px = floor(x / pixelSize) * pixelSize;
          let py = floor(y / pixelSize) * pixelSize;
          let pIdx = (py * width + px) * 4;
          img.pixels[idx] = img.pixels[pIdx];
          img.pixels[idx + 1] = img.pixels[pIdx + 1];
          img.pixels[idx + 2] = img.pixels[pIdx + 2];
          break;
          
        case 'glitch':
          if (random(1) < 0.05) {
            let offset = int(random(-20, 20));
            let newIdx = idx + offset * 4;
            if (newIdx >= 0 && newIdx < img.pixels.length - 3) {
              img.pixels[idx] = img.pixels[newIdx];
              img.pixels[idx + 1] = img.pixels[newIdx + 1];
              img.pixels[idx + 2] = img.pixels[newIdx + 2];
            }
          }
          if (random(1) < 0.03) {
            for (let i = 0; i < width * 4; i += 4) {
              let shiftIdx = idx + i;
              if (shiftIdx + 20 < img.pixels.length) {
                let tempR = img.pixels[shiftIdx];
                let tempG = img.pixels[shiftIdx + 1];
                let tempB = img.pixels[shiftIdx + 2];
                img.pixels[shiftIdx] = img.pixels[shiftIdx + 20];
                img.pixels[shiftIdx + 1] = img.pixels[shiftIdx + 21];
                img.pixels[shiftIdx + 2] = img.pixels[shiftIdx + 22];
                img.pixels[shiftIdx + 20] = tempR;
                img.pixels[shiftIdx + 21] = tempG;
                img.pixels[shiftIdx + 22] = tempB;
              }
            }
          }
          break;
          
        case 'invert':
          img.pixels[idx] = 255 - r;
          img.pixels[idx + 1] = 255 - g;
          img.pixels[idx + 2] = 255 - b;
          break;
          
        case 'threshold':
          let gray = (r + g + b) / 3;
          let val = gray > 127 ? 255 : 0;
          img.pixels[idx] = val;
          img.pixels[idx + 1] = val;
          img.pixels[idx + 2] = val;
          break;
          
        case 'emboss':
          if (x > 0 && y > 0) {
            let prevIdx = ((y-1) * width + (x-1)) * 4;
            let dr = r - img.pixels[prevIdx];
            let dg = g - img.pixels[prevIdx + 1];
            let db = b - img.pixels[prevIdx + 2];
            img.pixels[idx] = constrain(128 + dr, 0, 255);
            img.pixels[idx + 1] = constrain(128 + dg, 0, 255);
            img.pixels[idx + 2] = constrain(128 + db, 0, 255);
          }
          break;
          
        case 'edges':
          if (x > 0 && x < width-1 && y > 0 && y < height-1) {
            let rightIdx = (y * width + (x+1)) * 4;
            let bottomIdx = ((y+1) * width + x) * 4;
            let edgeR = abs(r - img.pixels[rightIdx]) + abs(r - img.pixels[bottomIdx]);
            let edgeG = abs(g - img.pixels[rightIdx+1]) + abs(g - img.pixels[bottomIdx+1]);
            let edgeB = abs(b - img.pixels[rightIdx+2]) + abs(b - img.pixels[bottomIdx+2]);
            let edge = constrain((edgeR + edgeG + edgeB) / 3, 0, 255);
            img.pixels[idx] = edge;
            img.pixels[idx+1] = edge;
            img.pixels[idx+2] = edge;
          }
          break;
      }
    }
  }
  img.updatePixels();
}

function applyColorAdjustments() {
  img.loadPixels();
  
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    
    // Saturação
    let gray = (r + g + b) / 3;
    let satFactor = saturationAmount / 100;
    let newR = gray + (r - gray) * satFactor;
    let newG = gray + (g - gray) * satFactor;
    let newB = gray + (b - gray) * satFactor;
    
    // Brilho
    img.pixels[i] = constrain(newR + brightnessAmount, 0, 255);
    img.pixels[i + 1] = constrain(newG + brightnessAmount, 0, 255);
    img.pixels[i + 2] = constrain(newB + brightnessAmount, 0, 255);
  }
  img.updatePixels();
}

function applyRadialDistortion() {
  if (radialAmount === 0) return;
  
  img.loadPixels();
  let distorted = new Array(img.pixels.length);
  let centerX = width / 2;
  let centerY = height / 2;
  let maxRadius = dist(0, 0, centerX, centerY);
  let strength = radialAmount / 50;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let dx = x - centerX;
      let dy = y - centerY;
      let radius = dist(x, y, centerX, centerY);
      let angle = atan2(dy, dx);
      
      let factor = 1 + strength * (radius / maxRadius);
      let newX = centerX + dx * factor;
      let newY = centerY + dy * factor;
      
      let srcX = floor(newX);
      let srcY = floor(newY);
      
      if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
        let srcIdx = (srcY * width + srcX) * 4;
        let dstIdx = (y * width + x) * 4;
        distorted[dstIdx] = img.pixels[srcIdx];
        distorted[dstIdx + 1] = img.pixels[srcIdx + 1];
        distorted[dstIdx + 2] = img.pixels[srcIdx + 2];
      }
    }
  }
  
  for (let i = 0; i < distorted.length; i++) {
    if (distorted[i] !== undefined) img.pixels[i] = distorted[i];
  }
  img.updatePixels();
}

function draw() {
  // O desenho é feito nos callbacks
}