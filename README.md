# MyDashboards - Dashboards Criativos com p5.js

## 🌟 Visão Geral

Este projeto consiste em dois dashboards interativos desenvolvidos com a biblioteca p5.js, integrando APIs públicas para criar visualizações de dados dinâmicas e experiências criativas.

- **Dashboard 1 (Cosmic Pulse):** Painel informativo não-interativo que consome dados da NASA para criar uma visualização artística contínua do clima espacial.
- **Dashboard 2 (AI Canvas Lab):** Painel interativo que gera imagens via IA e permite pós-processamento com filtros em tempo real.

## 📡 APIs Utilizadas

### Dashboard 1 - NASA APIs
| API | Endpoint | Descrição |
|-----|----------|-----------|
| NASA APOD | `https://api.nasa.gov/planetary/apod` | Astronomy Picture of the Day - imagem e título |
| NASA DONKI | `https://api.nasa.gov/DONKI/SPWC` | Dados de vento solar e clima espacial |

**Dados mapeados:** Velocidade do vento solar, temperatura, densidade do plasma

### Dashboard 2 - Pollinations.ai
| API | Endpoint | Descrição |
|-----|----------|-----------|
| Pollinations.ai | `https://image.pollinations.ai/prompt/...` | Text-to-Image generation (gratuita, sem chave) |

## 🎮 Funcionalidades

### Dashboard 1: Cosmic Pulse
- ✅ Consumo de 2 endpoints distintos da NASA
- ✅ Mapeamento criativo: velocidade do vento solar → velocidade das partículas
- ✅ Temperatura → intensidade de cor e brilho
- ✅ Densidade → número de anéis orbitais
- ✅ Visualização contínua com estrelas, partículas e ondas de energia

### Dashboard 2: AI Canvas Lab
- ✅ Geração de imagens via IA com prompt personalizável
- ✅ 6 filtros interativos: Pixelate, Glitch, Invert, Threshold, Emboss, Edge Detection
- ✅ Controles em tempo real: Saturação, Brilho, Distorção Radial
- ✅ Interação com mouse: distorção local ao arrastar

## 🚀 Como Executar

### Acede online (GitHub Pages)
https://pedrobabau.github.io/MyDashboards/
### --------------------------- 
