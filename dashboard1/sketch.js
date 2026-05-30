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
        let retryCount = 0;

        function setup() {
            createCanvas(windowWidth, windowHeight, WEBGL);
            colorMode(HSB, 360, 100, 100, 100);
            
            // Criar estrelas de fundo
            for (let i = 0; i < 400; i++) {
                stars.push({
                    x: random(-width/2, width/2),
                    y: random(-height/2, height/2),
                    z: random(-200, 200),
                    radius: random(1, 3)
                });
            }
            
            // Criar partículas
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
            
            // Botão de retry
            select('#retryBtn').mousePressed(() => {
                select('#retryBtn').style('display', 'none');
                select('#loading').style('display', 'flex');
                select('#loading').html('🌍 LOCALIZANDO...<br><span style="font-size:10px;">Tentativa ' + (retryCount + 1) + '</span>');
                fetchLocationData();
            });
            
            fetchLocationData();
        }

        async function fetchLocationData() {
            try {
                // API ipapi.co - MAIS ESTÁVEL que apiip.net
                let response = await fetch('https://ipapi.co/json/');
                
                if (!response.ok) throw new Error('HTTP ' + response.status);
                
                let data = await response.json();
                
                if (data && data.country_name) {
                    locationData.country = data.country_name || "Desconhecido";
                    locationData.city = data.city || "Desconhecida";
                    locationData.ip = data.ip || "0.0.0.0";
                    locationData.latitude = data.latitude || 0;
                    locationData.longitude = data.longitude || 0;
                    locationData.timezone = data.timezone || "Desconhecido";
                    
                    // Cor baseada nas coordenadas
                    let hueFromLat = abs(locationData.latitude * 3.6) % 360;
                    let hueFromLong = abs(locationData.longitude * 2.4) % 360;
                    mainColorHue = (hueFromLat + hueFromLong) / 2;
                    if (isNaN(mainColorHue)) mainColorHue = 200;
                    
                    dataLoaded = true;
                    retryCount = 0;
                    
                    let loadingDiv = select('#loading');
                    if (loadingDiv) {
                        loadingDiv.style('opacity', '0');
                        setTimeout(() => {
                            if (loadingDiv) loadingDiv.style('display', 'none');
                        }, 1000);
                    }
                    
                    updateInfoPanel();
                } else {
                    throw new Error('Dados inválidos');
                }
            } catch (error) {
                console.error('Erro:', error);
                retryCount++;
                
                if (retryCount < 3) {
                    // Tentar API alternativa
                    await fetchAlternateLocation();
                } else {
                    // Fallback com dados simulados + botão de retry
                    locationData.country = "Portugal (Demo)";
                    locationData.city = "Lisboa";
                    locationData.ip = "192.168.1.1";
                    locationData.latitude = 38.7223;
                    locationData.longitude = -9.1393;
                    locationData.timezone = "Europe/Lisbon";
                    dataLoaded = true;
                    
                    let loadingDiv = select('#loading');
                    if (loadingDiv) {
                        loadingDiv.html('⚠️ MODO DEMO<br><span style="font-size:10px;">Usando dados de exemplo</span>');
                        setTimeout(() => {
                            if (loadingDiv) loadingDiv.style('display', 'none');
                        }, 2000);
                    }
                    
                    updateInfoPanel();
                    select('#retryBtn').style('display', 'block');
                }
            }
        }
        
        async function fetchAlternateLocation() {
            try {
                let response = await fetch('https://api.ipify.org?format=json');
                let data = await response.json();
                
                if (data && data.ip) {
                    locationData.ip = data.ip;
                    locationData.country = "Detectado (IP only)";
                    locationData.city = "Via IPify";
                    locationData.latitude = 40.7128;
                    locationData.longitude = -74.0060;
                    locationData.timezone = "America/New_York";
                    dataLoaded = true;
                    
                    let loadingDiv = select('#loading');
                    if (loadingDiv) loadingDiv.style('display', 'none');
                    updateInfoPanel();
                }
            } catch (e) {
                console.error('API alternativa falhou:', e);
                throw e;
            }
        }

        function updateInfoPanel() {
            let panel = select('#infoPanel');
            if (panel) {
                let countryEl = select('#countryName');
                let cityEl = select('#cityName');
                let ipEl = select('#ipAddress');
                let coordsEl = select('#coordinates');
                let tzEl = select('#timezoneInfo');
                
                if (countryEl) countryEl.html(locationData.country);
                if (cityEl) cityEl.html(locationData.city);
                if (ipEl) ipEl.html(locationData.ip);
                if (coordsEl) coordsEl.html(`${Math.abs(locationData.latitude).toFixed(2)}° ${locationData.latitude >= 0 ? 'N' : 'S'} | ${Math.abs(locationData.longitude).toFixed(2)}° ${locationData.longitude >= 0 ? 'E' : 'W'}`);
                if (tzEl) tzEl.html(locationData.timezone);
            }
        }

        function draw() {
            // Fundo escuro
            background(0, 0, 5);
            
            // Estrelas
            push();
            for (let star of stars) {
                push();
                translate(star.x, star.y, star.z);
                let twinkle = 50 + 30 * sin(millis() * 0.001 + star.x);
                fill(60, 20, twinkle);
                noStroke();
                sphere(star.radius);
                pop();
            }
            pop();
            
            // Calcular intensidade
            let latIntensity = min(1, abs(locationData.latitude) / 90);
            pulseIntensity = 0.5 + latIntensity * 0.5;
            
            // Globo 3D
            push();
            rotateY(globeRotation);
            globeRotation += 0.003;
            
            let globeRadius = min(width, height) * 0.18;
            
            // Linhas de longitude
            strokeWeight(1.5);
            for (let i = 0; i <= 24; i++) {
                let lon = map(i, 0, 24, -PI, PI);
                let x1 = cos(lon) * globeRadius;
                let z1 = sin(lon) * globeRadius;
                stroke(mainColorHue, 70, 80, 60);
                line(x1, -globeRadius, z1, x1, globeRadius, z1);
            }
            
            // Linhas de latitude
            for (let i = -5; i <= 5; i++) {
                let lat = map(i, -5, 5, -globeRadius, globeRadius);
                let r = sqrt(max(0, globeRadius * globeRadius - lat * lat));
                stroke(mainColorHue, 70, 80, 40);
                ellipse(0, lat, r * 2, 3);
            }
            
            // Círculo principal
            noFill();
            strokeWeight(2);
            stroke(mainColorHue, 80, 90, 80);
            sphere(globeRadius);
            
            // Ponto do usuário
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
                sphere(6);
                
                let pulseSize = 8 + sin(millis() * 0.008) * 3;
                noFill();
                stroke(0, 100, 100, 80);
                strokeWeight(1.5);
                sphere(pulseSize);
                pop();
            }
            
            pop();
            
            // Partículas
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
                circle(p.x - width/2, p.y - height/2, p.size);
            }
        }

        function windowResized() {
            resizeCanvas(windowWidth, windowHeight);
        }
