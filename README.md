# MyDashboards - Dashboards Criativos com p5.js

**Curso:** Design de Interação / Multimédia | ISTEC  
**Disciplina:** Computação Orientada a Dados e Sistemas Interativos Web

---

## 🌟 Visão Geral

Este projeto consiste em dois dashboards interativos desenvolvidos com a biblioteca p5.js, integrando APIs públicas com **CORS habilitado** para criar visualizações de dados dinâmicas e experiências criativas.

| Dashboard | Tipo | API | Funcionalidade Principal |
|-----------|------|-----|--------------------------|
| **GeoPulse** | Painel Informativo | apiip.net | Geolocalização do usuário com globo 3D |
| **Anime Gallery** | Painel Interativo | Waifu.pics API | Galeria de imagens de anime com filtros em tempo real |

---

## 📡 APIs Utilizadas

### Dashboard 1 - GeoPulse (apiip.net)

| Propriedade | Detalhe |
|-------------|---------|
| **Endpoint** | `https://apiip.net/api/check?accessKey=free` |
| **Método** | GET |
| **CORS** | ✅ Habilitado |
| **Autenticação** | Nenhuma (gratuita) |
| **Dados retornados** | País, cidade, IP, latitude, longitude, fuso horário |

**Mapeamento criativo:**
- Latitude → Intensidade da pulsação do globo
- Coordenadas → Cor do globo e partículas
- Localização → Ponto destacado no globo 3D

### Dashboard 2 - Anime Gallery (Waifu.pics API)

| Propriedade | Detalhe |
|-------------|---------|
| **Endpoint** | `https://api.waifu.pics/sfw/{categoria}` |
| **Método** | GET |
| **CORS** | ✅ Habilitado |
| **Autenticação** | Nenhuma (gratuita) |
| **Categorias disponíveis** | 16+ (waifu, neko, shinobu, megumin, bully, cuddle, cry, hug, awoo, kiss, lick, pat, smug, highfive, nom, bite) |

**Interatividade oferecida:**
- Seleção de categoria por dropdown
- Busca de imagem aleatória
- 7 filtros de pós-processamento
- Controles de saturação, brilho e distorção radial

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

### Dashboard 2: Anime Gallery

| Funcionalidade | Descrição |
|----------------|-----------|
| ✅ 16+ categorias | Waifu, Neko, Hug, Kiss, etc. |
| ✅ Imagem aleatória | Busca API a cada clique |
| ✅ 7 filtros interativos | Pixelate, Glitch, Invert, Threshold, Emboss, Edge Detection, Reset |
| ✅ Distorção radial | Efeito de lente em tempo real |
| ✅ Saturação | Controle deslizante (0-200%) |
| ✅ Brilho | Controle deslizante (-100 a +100) |
| ✅ Manipulação de pixels | Acesso direto ao array pixels[] do p5.js |

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
