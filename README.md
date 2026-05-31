# MyDashboards - Dashboards Criativos com p5.js

# Estrutura do Projeto

MyDashboards/
├── index.html              # Landing page principal
├── README.md               # Documentação
├── dashboard1/
│   └── index.html          # GeoPulse (Geolocalização + Globo 3D)
└── dashboard2/
│   └── index.html          # AI Chatbot (Chat com robô p5.js)

## 🌟 Visão Geral

Este projeto consiste em dois dashboards interativos desenvolvidos com a biblioteca p5.js, integrando APIs públicas com **CORS habilitado** para criar visualizações de dados dinâmicas e experiências criativas.

| Dashboard | Tipo | API | Funcionalidade Principal |
|-----------|------|-----|--------------------------|
| **GeoPulse** | Painel Informativo | ipapi.co | Geolocalização do usuário com globo 3D |
| **Car Gallery** | Painel Interativo | Unsplash + CORS Proxy | Imagens de carros por marca + Carro decorativo p5.js |

---

## 📡 APIs Utilizadas

### Dashboard 1 - GeoPulse (ipapi.co)

| Propriedade | Detalhe |
|-------------|---------|
| **Endpoint** | `https://ipapi.co/json/` |
| **Método** | GET |
| **CORS** | ✅ Habilitado |
| **Autenticação** | Nenhuma (gratuita) |
| **Dados retornados** | País, cidade, IP, latitude, longitude, fuso horário |

**Mapeamento criativo:**
- Latitude → Intensidade da pulsação do globo
- Coordenadas → Cor do globo e partículas
- Localização → Ponto destacado no globo 3D

### Dashboard 2 - Car Gallery (Unsplash + CORS Proxy)

| Propriedade | Detalhe |
|-------------|---------|
| **Endpoint** | `https://unsplash.com/napi/search/photos` (via CORS proxy) |
| **Método** | GET |
| **CORS** | ✅ Habilitado (via proxy gratuito) |
| **Autenticação** | Nenhuma (gratuita) |
| **Marcas disponíveis** | Audi, BMW, Ferrari, Lamborghini, Porsche, Mercedes, Tesla, Ford Mustang, Chevrolet Camaro, Toyota Supra |

**Características:**
- Busca imagens reais de carros da marca selecionada
- Fallback com imagens SVG quando a API falha
- Carro desportivo decorativo desenhado com primitivas p5.js (rect, ellipse, arc)

---

## 🎮 Funcionalidades Detalhadas

### Dashboard 1: GeoPulse

| Funcionalidade | Descrição |
|----------------|-----------|
| ✅ Geolocalização automática | Detecta país, cidade, IP e coordenadas do usuário |
| ✅ Globo 3D rotativo | Visualização esférica com linhas de latitude/longitude |
| ✅ Ponto do usuário | Marcador pulsante na localização exata |
| ✅ Partículas atmosféricas | Elementos visuais que reagem à latitude |
| ✅ Cores dinâmicas | Paleta baseada nas coordenadas geográficas |
| ✅ Estrelas cintilantes | Fundo estelar com animação suave |
| ✅ Design responsivo | Adapta-se a qualquer tamanho de ecrã |

### Dashboard 2: Car Gallery

| Funcionalidade | Descrição |
|----------------|-----------|
| ✅ 10+ marcas de carros | Audi, BMW, Ferrari, Lamborghini, Porsche, Mercedes, Tesla, Ford Mustang, Chevrolet Camaro, Toyota Supra |
| ✅ API de imagens reais | Busca imagens via Unsplash (CORS ativo) |
| ✅ Fallback SVG | Imagens de garantia quando a API falha |
| ✅ Carro decorativo p5.js | Desenhado com rect(), ellipse(), arc() no canto inferior do canvas |
| ✅ 7 filtros interativos | Pixelate, Glitch, Invert, Threshold, Emboss, Edge Detection, Reset |
| ✅ Distorção radial | Efeito de lente em tempo real |
| ✅ Saturação | Controle deslizante (0-200%) |
| ✅ Brilho | Controle deslizante (-100 a +100) |

---

## 🎛️ Filtros Disponíveis (Dashboard 2)

| Filtro | Efeito | Manipulação |
|--------|--------|-------------|
| **Pixelate** | Efeito de pixelização | Agrupamento de pixels em blocos |
| **Glitch** | Efeito glitch art | Deslocamento aleatório de pixels |
| **Inverter** | Negativo da imagem | Inversão de cores (255 - valor) |
| **Limiar (B&W)** | Preto e branco | Threshold baseado em luminância |
| **Relevo** | Efeito 3D/emboss | Diferença entre pixels vizinhos |
| **Detecção Bordas** | Realce de contornos | Gradiente entre pixels adjacentes |

---

### Acesso Online (GitHub Pages)
https://pedrobabau.github.io/MyDashboards/
