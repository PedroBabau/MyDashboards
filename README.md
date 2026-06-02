# MyDashboards - Dashboards Criativos com p5.js

## 🌟 Visão Geral

Este projeto consiste em dois dashboards interativos desenvolvidos com a biblioteca p5.js, integrando APIs públicas com **CORS habilitado** para criar visualizações de dados dinâmicas e experiências criativas.

| Dashboard | Tipo | API | Funcionalidade Principal |
|-----------|------|-----|--------------------------|
| **GeoPulse** | Painel Informativo | ipapi.co | Geolocalização do usuário com globo 3D |
| **API Explorer** | Painel Interativo | JSONPlaceholder | Dados de utilizadores + Avatar interativo |

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

### Dashboard 2 - API Explorer (JSONPlaceholder)

| Propriedade | Detalhe |
|-------------|---------|
| **Endpoint** | `https://jsonplaceholder.typicode.com/users/{id}` |
| **Método** | GET |
| **CORS** | ✅ Habilitado |
| **Autenticação** | Nenhuma (gratuita) |
| **Dados retornados** | Nome, email, cidade, telefone, empresa |

**Interatividade oferecida:**
- Botão para carregar utilizador aleatório
- Slider para alterar a cor do avatar (matiz 0-360)
- Slider para alterar o tamanho do avatar (40-150px)
- Avatar desenhado com p5.js (círculo + inicial do nome)

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

### Dashboard 2: API Explorer

| Funcionalidade | Descrição |
|----------------|-----------|
| ✅ API gratuita | JSONPlaceholder - dados de utilizadores (CORS ativo) |
| ✅ Utilizador aleatório | Botão carrega um utilizador diferente (ID 1-10) |
| ✅ Exibição de dados | Mostra nome, email, cidade, telefone, empresa |
| ✅ Avatar interativo | Desenhado com p5.js (círculo + inicial) |
| ✅ Cor ajustável | Slider controla a matiz do avatar (0-360) |
| ✅ Tamanho ajustável | Slider controla o diâmetro do avatar (40-150px) |

---

## 🎛️ Interatividade do Dashboard 2

| Controlo | Efeito |
|----------|--------|
| **CARREGAR NOVO UTILIZADOR** | Busca um utilizador aleatório da API |
| **Slider Cor** | Altera a cor do avatar em tempo real |
| **Slider Tamanho** | Altera o tamanho do avatar em tempo real |

---

## 🚀 Como Executar

### Acesso Online (GitHub Pages)
https://pedrobabau.github.io/MyDashboards/
