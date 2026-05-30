let currentImage = null;
        let originalPixels = null;
        let currentFilter = 'none';
        let radialAmount = 0;
        let saturationAmount = 100;
        let brightnessAmount = 0;
        
        function setup() {
            let canvas = createCanvas(500, 500);
            canvas.parent('p5canvas');
            background(30);
            
            textAlign(CENTER, CENTER);
            fill(150);
            textSize(14);
            text("🎨 Selecione uma categoria\n e clique em 'Buscar Imagem'", width/2, height/2);
            
            // Event listeners
            select('#fetchBtn').mousePressed(fetchAnimeImage);
            
            selectAll('.filter-btn').forEach(btn => {
                btn.mousePressed(() => {
                    currentFilter = btn.elt.dataset.filter;
                    if (currentFilter === 'reset') {
                        resetImage();
                    } else {
                        applyFilters();
                    }
                });
            });
            
            select('#radialDistort').input(() => {
                radialAmount = int(select('#radialDistort').value());
                select('#radialVal').html(radialAmount);
                applyFilters();
            });
            
            select('#saturation').input(() => {
                saturationAmount = int(select('#saturation').value());
                select('#satVal').html(saturationAmount + '%');
                applyFilters();
            });
            
            select('#brightness').input(() => {
                brightnessAmount = int(select('#brightness').value());
                select('#brightVal').html(brightnessAmount);
                applyFilters();
            });
        }
        
        async function fetchAnimeImage() {
            let category = select('#category').value();
            let statusDiv = select('#status');
            
            statusDiv.html('🖼️ Buscando imagem... ⏳');
            statusDiv.removeClass('success').removeClass('error').addClass('loading');
            
            try {
                // API Waifu.pics - CORS habilitado conforme documentação [citation:2]
                let response = await fetch(`https://api.waifu.pics/sfw/${category}`);
                let data = await response.json();
                
                if (data && data.url) {
                    loadImage(data.url, 
                        (img) => {
                            currentImage = img;
                            if (currentImage.width !== width || currentImage.height !== height) {
                                currentImage.resize(width, height);
                            }
                            
                            currentImage.loadPixels();
                            originalPixels = [...currentImage.pixels];
                            
                            statusDiv.html('✅ Imagem carregada! Use os filtros abaixo.');
                            statusDiv.removeClass('loading').addClass('success');
                            
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
                            
                            image(currentImage, 0, 0);
                        },
                        (err) => {
                            console.error(err);
                            statusDiv.html('❌ Erro ao carregar imagem. Tente outra categoria!');
                            statusDiv.removeClass('loading').addClass('error');
                        }
                    );
                } else {
                    statusDiv.html('❌ Nenhuma imagem encontrada para esta categoria.');
                    statusDiv.removeClass('loading').addClass('error');
                }
            } catch (error) {
                console.error('Erro na API:', error);
                statusDiv.html('❌ Erro de conexão. Verifique sua internet.');
                statusDiv.removeClass('loading').addClass('error');
            }
        }
        
        function resetImage() {
            if (!originalPixels || !currentImage) return;
            
            currentImage.loadPixels();
            for (let i = 0; i < originalPixels.length; i++) {
                currentImage.pixels[i] = originalPixels[i];
            }
            currentImage.updatePixels();
            image(currentImage, 0, 0);
            
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
        
        function applyFilters() {
            if (!currentImage || !originalPixels) return;
            
            // Reset para original
            currentImage.loadPixels();
            for (let i = 0; i < originalPixels.length; i++) {
                currentImage.pixels[i] = originalPixels[i];
            }
            
            // Aplicar filtro selecionado
            if (currentFilter !== 'none') {
                applyPixelFilter();
            }
            
            // Ajustes de cor
            applyColorAdjustments();
            
            // Distorção radial
            if (radialAmount > 0) {
                applyRadialDistortion();
            }
            
            currentImage.updatePixels();
            image(currentImage, 0, 0);
        }
        
        function applyPixelFilter() {
            currentImage.loadPixels();
            
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let idx = (y * width + x) * 4;
                    let r = currentImage.pixels[idx];
                    let g = currentImage.pixels[idx + 1];
                    let b = currentImage.pixels[idx + 2];
                    
                    switch(currentFilter) {
                        case 'pixelate':
                            let pixelSize = 8;
                            let px = floor(x / pixelSize) * pixelSize;
                            let py = floor(y / pixelSize) * pixelSize;
                            let pIdx = (py * width + px) * 4;
                            currentImage.pixels[idx] = currentImage.pixels[pIdx];
                            currentImage.pixels[idx + 1] = currentImage.pixels[pIdx + 1];
                            currentImage.pixels[idx + 2] = currentImage.pixels[pIdx + 2];
                            break;
                            
                        case 'glitch':
                            if (random(1) < 0.05) {
                                let offset = int(random(-20, 20));
                                let newIdx = idx + offset * 4;
                                if (newIdx >= 0 && newIdx < currentImage.pixels.length - 3) {
                                    currentImage.pixels[idx] = currentImage.pixels[newIdx];
                                    currentImage.pixels[idx + 1] = currentImage.pixels[newIdx + 1];
                                    currentImage.pixels[idx + 2] = currentImage.pixels[newIdx + 2];
                                }
                            }
                            if (random(1) < 0.03) {
                                for (let i = 0; i < width * 4; i += 4) {
                                    let shiftIdx = idx + i;
                                    if (shiftIdx + 20 < currentImage.pixels.length) {
                                        let tempR = currentImage.pixels[shiftIdx];
                                        let tempG = currentImage.pixels[shiftIdx + 1];
                                        let tempB = currentImage.pixels[shiftIdx + 2];
                                        currentImage.pixels[shiftIdx] = currentImage.pixels[shiftIdx + 20];
                                        currentImage.pixels[shiftIdx + 1] = currentImage.pixels[shiftIdx + 21];
                                        currentImage.pixels[shiftIdx + 2] = currentImage.pixels[shiftIdx + 22];
                                        currentImage.pixels[shiftIdx + 20] = tempR;
                                        currentImage.pixels[shiftIdx + 21] = tempG;
                                        currentImage.pixels[shiftIdx + 22] = tempB;
                                    }
                                }
                            }
                            break;
                            
                        case 'invert':
                            currentImage.pixels[idx] = 255 - r;
                            currentImage.pixels[idx + 1] = 255 - g;
                            currentImage.pixels[idx + 2] = 255 - b;
                            break;
                            
                        case 'threshold':
                            let gray = (r + g + b) / 3;
                            let val = gray > 127 ? 255 : 0;
                            currentImage.pixels[idx] = val;
                            currentImage.pixels[idx + 1] = val;
                            currentImage.pixels[idx + 2] = val;
                            break;
                            
                        case 'emboss':
                            if (x > 0 && y > 0) {
                                let prevIdx = ((y-1) * width + (x-1)) * 4;
                                let dr = r - currentImage.pixels[prevIdx];
                                let dg = g - currentImage.pixels[prevIdx + 1];
                                let db = b - currentImage.pixels[prevIdx + 2];
                                currentImage.pixels[idx] = constrain(128 + dr, 0, 255);
                                currentImage.pixels[idx + 1] = constrain(128 + dg, 0, 255);
                                currentImage.pixels[idx + 2] = constrain(128 + db, 0, 255);
                            }
                            break;
                            
                        case 'edges':
                            if (x > 0 && x < width-1 && y > 0 && y < height-1) {
                                let rightIdx = (y * width + (x+1)) * 4;
                                let bottomIdx = ((y+1) * width + x) * 4;
                                let edgeR = abs(r - currentImage.pixels[rightIdx]) + abs(r - currentImage.pixels[bottomIdx]);
                                let edgeG = abs(g - currentImage.pixels[rightIdx+1]) + abs(g - currentImage.pixels[bottomIdx+1]);
                                let edgeB = abs(b - currentImage.pixels[rightIdx+2]) + abs(b - currentImage.pixels[bottomIdx+2]);
                                let edge = constrain((edgeR + edgeG + edgeB) / 3, 0, 255);
                                currentImage.pixels[idx] = edge;
                                currentImage.pixels[idx+1] = edge;
                                currentImage.pixels[idx+2] = edge;
                            }
                            break;
                    }
                }
            }
            currentImage.updatePixels();
        }
        
        function applyColorAdjustments() {
            currentImage.loadPixels();
            
            for (let i = 0; i < currentImage.pixels.length; i += 4) {
                let r = currentImage.pixels[i];
                let g = currentImage.pixels[i + 1];
                let b = currentImage.pixels[i + 2];
                
                let gray = (r + g + b) / 3;
                let satFactor = saturationAmount / 100;
                let newR = gray + (r - gray) * satFactor;
                let newG = gray + (g - gray) * satFactor;
                let newB = gray + (b - gray) * satFactor;
                
                currentImage.pixels[i] = constrain(newR + brightnessAmount, 0, 255);
                currentImage.pixels[i + 1] = constrain(newG + brightnessAmount, 0, 255);
                currentImage.pixels[i + 2] = constrain(newB + brightnessAmount, 0, 255);
            }
            currentImage.updatePixels();
        }
        
        function applyRadialDistortion() {
            if (radialAmount === 0) return;
            
            currentImage.loadPixels();
            let distorted = new Array(currentImage.pixels.length);
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
                        distorted[dstIdx] = currentImage.pixels[srcIdx];
                        distorted[dstIdx + 1] = currentImage.pixels[srcIdx + 1];
                        distorted[dstIdx + 2] = currentImage.pixels[srcIdx + 2];
                    }
                }
            }
            
            for (let i = 0; i < distorted.length; i++) {
                if (distorted[i] !== undefined) currentImage.pixels[i] = distorted[i];
            }
            currentImage.updatePixels();
        }
        
        function draw() {
            // O desenho é feito nos callbacks
        }
