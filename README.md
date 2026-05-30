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
| **AI Chatbot** | Painel Interativo | SimpleBot API + Fallback | Chat com robô desenhado em p5.js |

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

### Dashboard 2 - AI Chatbot (SimpleBot API + Fallback)

| Propriedade | Detalhe |
|-------------|---------|
| **Endpoint** | `https://api.simplebot.xyz/api/v1/chat` |
| **Método** | GET |
| **CORS** | ✅ Habilitado |
| **Autenticação** | Nenhuma (gratuita) |
| **Parâmetros** | `message` (texto do usuário), `botId=1` |

**Fallback local:** O chatbot possui um sistema de respostas inteligentes para quando a API não está disponível, cobrindo 15+ categorias de perguntas.

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

### Dashboard 2: AI Chatbot

| Funcionalidade | Descrição |
|----------------|-----------|
| ✅ Robô desenhado com p5.js | Cabeça, olhos, boca, corpo e antenas com primitivas gráficas |
| ✅ Expressões faciais | Feliz, triste, pensativo, normal (reagem ao contexto) |
| ✅ Olhos animados | Piscam e seguem o mouse |
| ✅ Chat em tempo real | Interface de conversa com avatares |
| ✅ API SimpleBot | Comunicação com API de chatbot gratuita |
| ✅ Fallback inteligente | 15+ respostas pré-definidas para quando a API falha |
| ✅ Indicador de digitação | Animação "pensando" enquanto o robô processa |
| ✅ Limpar conversa | Botão para resetar o histórico do chat |

---

## 🤖 Respostas do Chatbot (Fallback Local)

| Palavra-chave | Resposta |
|---------------|----------|
| olá, oi, hey | Saudação amigável |
| como estás, como vai | Resposta sobre estado do robô |
| programação, código, p5 | Informação sobre p5.js |
| obrigado, valeu | Agradecimento |
| nome | Apresentação do robô |
| ajuda, socorro | Oferecimento de ajuda |
| tempo, clima | Informação sobre limitação |
| tchau, adeus | Despedida |
| piada, humor | Piada de programador |
| *outros* | Resposta genérica encorajadora |

---

## 🎛️ Design do Robô (p5.js)

O robô é completamente desenhado com primitivas gráficas do p5.js:

```javascript
// Primitivas utilizadas:
rect()     // Corpo e cabeça
ellipse()  // Olhos e antenas
arc()      // Boca (expressões)
line()     // Antenas e detalhes

https://pedrobabau.github.io/MyDashboards/
