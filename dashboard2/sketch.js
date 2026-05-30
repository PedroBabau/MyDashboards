let eyeX = 0, eyeY = 0;
        let expression = "normal"; // normal, happy, sad, thinking
        let blinkTimer = 0;
        let isTyping = false;
        
        function setup() {
            let canvas = createCanvas(300, 300);
            canvas.parent('robotCanvas');
            
            // Configurar eventos do chat
            let sendBtn = select('#sendBtn');
            let clearBtn = select('#clearBtn');
            let messageInput = select('#messageInput');
            
            sendBtn.mousePressed(sendMessage);
            clearBtn.mousePressed(clearChat);
            messageInput.elt.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
            
            // Iniciar animação dos olhos
            setInterval(() => {
                if (expression !== "thinking") {
                    eyeX = random(-5, 5);
                    eyeY = random(-5, 5);
                }
            }, 3000);
            
            // Piscar os olhos
            setInterval(() => {
                blinkTimer = 5;
            }, 4000);
        }
        
        function draw() {
            background(15, 15, 26);
            
            // Desenhar cabeça do robô
            push();
            translate(width/2, height/2 - 20);
            
            // Corpo
            fill(30, 41, 59);
            stroke(59, 130, 246);
            strokeWeight(2);
            rect(-60, 40, 120, 100, 15);
            
            // Cabeça
            fill(30, 41, 59);
            rect(-70, -60, 140, 120, 25);
            
            // Olhos
            blinkTimer--;
            let eyeSize = 25;
            let eyeOpen = blinkTimer <= 0;
            
            // Olho esquerdo
            fill(20, 30, 50);
            ellipse(-30, -25, eyeSize, eyeSize);
            fill(255);
            ellipse(-30 + eyeX, -25 + eyeY, 12, eyeOpen ? 12 : 2);
            fill(0);
            ellipse(-30 + eyeX, -25 + eyeY, 6, eyeOpen ? 6 : 2);
            
            // Olho direito
            fill(20, 30, 50);
            ellipse(30, -25, eyeSize, eyeSize);
            fill(255);
            ellipse(30 + eyeX, -25 + eyeY, 12, eyeOpen ? 12 : 2);
            fill(0);
            ellipse(30 + eyeX, -25 + eyeY, 6, eyeOpen ? 6 : 2);
            
            // Boca (expressão)
            stroke(59, 130, 246);
            strokeWeight(3);
            noFill();
            
            if (expression === "happy") {
                arc(0, 10, 50, 30, 0, PI);
            } else if (expression === "sad") {
                arc(0, 10, 50, 30, PI, TWO_PI);
            } else if (expression === "thinking") {
                // Boca em formato de onda
                for (let x = -25; x <= 25; x += 5) {
                    point(x, 10 + sin(x * 0.5 + millis() * 0.01) * 5);
                }
            } else {
                line(-25, 10, 25, 10);
            }
            
            // Antenas
            stroke(59, 130, 246);
            strokeWeight(3);
            line(-20, -60, -20, -85);
            line(20, -60, 20, -85);
            fill(59, 130, 246);
            noStroke();
            ellipse(-20, -90, 10, 10);
            ellipse(20, -90, 10, 10);
            
            // Luz da antena (pisca quando está pensando)
            if (isTyping || expression === "thinking") {
                fill(255, 200, 0);
                ellipse(-20, -90, 6, 6);
                ellipse(20, -90, 6, 6);
            } else {
                fill(59, 130, 246);
                ellipse(-20, -90, 6, 6);
                ellipse(20, -90, 6, 6);
            }
            
            // Detalhes do corpo
            fill(59, 130, 246, 100);
            rect(-40, 55, 80, 10, 5);
            rect(-30, 75, 60, 8, 4);
            
            pop();
        }
        
        async function sendMessage() {
            let input = select('#messageInput');
            let message = input.value().trim();
            
            if (message === "") return;
            
            // Mostrar mensagem do usuário
            addMessage(message, 'user');
            input.value('');
            
            // Indicar que o robô está pensando
            isTyping = true;
            expression = "thinking";
            showTypingIndicator();
            
            // Chamar API de chatbot gratuita (SimpleBot)
            try {
                let response = await fetch(`https://api.simplebot.xyz/api/v1/chat?message=${encodeURIComponent(message)}&botId=1`);
                let data = await response.json();
                
                if (data && data.response) {
                    addMessage(data.response, 'bot');
                } else {
                    addMessage("Desculpe, não consegui processar sua mensagem. Pode tentar novamente?", 'bot');
                }
            } catch (error) {
                console.error('Erro na API:', error);
                // Fallback para respostas inteligentes locais
                let localResponse = getLocalResponse(message);
                addMessage(localResponse, 'bot');
            }
            
            // Remover indicador de digitação
            removeTypingIndicator();
            isTyping = false;
            expression = "happy";
            setTimeout(() => {
                expression = "normal";
            }, 2000);
        }
        
        function getLocalResponse(message) {
            let msg = message.toLowerCase();
            
            if (msg.includes('olá') || msg.includes('oi') || msg.includes('hey')) {
                return "Olá! Como posso ajudar você hoje? 😊";
            } else if (msg.includes('como estás') || msg.includes('como vai')) {
                return "Estou funcionando perfeitamente! Obrigado por perguntar. E você? 🤖";
            } else if (msg.includes('programação') || msg.includes('código') || msg.includes('p5')) {
                return "Adoro programação! Este dashboard foi feito com p5.js. Quer saber mais sobre? 💻";
            } else if (msg.includes('obrigado') || msg.includes('valeu')) {
                return "De nada! Fico feliz em ajudar. 🎉";
            } else if (msg.includes('tempo') || msg.includes('clima')) {
                return "Não tenho acesso a dados meteorológicos agora, mas posso conversar sobre outros assuntos! 🌤️";
            } else if (msg.includes('nome')) {
                return "Sou o Assistente IA do seu dashboard! Fui criado com p5.js e API de chatbot. 🤖";
            } else if (msg.includes('ajuda') || msg.includes('socorro')) {
                return "Claro! Posso ajudar com informações, conversar ou apenas ouvir. O que você precisa? 🆘";
            } else if (msg.includes('tchau') || msg.includes('adeus') || msg.includes('até logo')) {
                return "Até logo! Foi um prazer conversar com você. Volte sempre! 👋";
            } else if (msg.includes('piada') || msg.includes('humor')) {
                return "Por que o programador foi ao médico? Porque ele tinha muitos 'bytes'! 😂";
            } else {
                return "Interessante! Conte-me mais sobre isso. Estou aqui para aprender e conversar com você. 🗣️";
            }
        }
        
        function addMessage(text, sender) {
            let messagesDiv = select('#chatMessages');
            
            let messageDiv = createDiv('');
            messageDiv.addClass('message');
            messageDiv.addClass(sender);
            
            let avatar = createDiv('');
            avatar.addClass('message-avatar');
            avatar.html(sender === 'user' ? '👤' : '🤖');
            
            let content = createDiv('');
            content.addClass('message-content');
            content.html(text);
            
            messageDiv.child(avatar);
            messageDiv.child(content);
            messagesDiv.child(messageDiv);
            
            // Scroll para o final
            messagesDiv.elt.scrollTop = messagesDiv.elt.scrollHeight;
        }
        
        function showTypingIndicator() {
            let messagesDiv = select('#chatMessages');
            
            // Remover indicador existente
            removeTypingIndicator();
            
            let typingDiv = createDiv('');
            typingDiv.id('typingIndicator');
            typingDiv.addClass('message');
            typingDiv.addClass('bot');
            
            let avatar = createDiv('');
            avatar.addClass('message-avatar');
            avatar.html('🤖');
            
            let indicator = createDiv('');
            indicator.addClass('typing-indicator');
            indicator.html('<span></span><span></span><span></span>');
            
            typingDiv.child(avatar);
            typingDiv.child(indicator);
            messagesDiv.child(typingDiv);
            messagesDiv.elt.scrollTop = messagesDiv.elt.scrollHeight;
        }
        
        function removeTypingIndicator() {
            let indicator = select('#typingIndicator');
            if (indicator) indicator.remove();
        }
        
        function clearChat() {
            let messagesDiv = select('#chatMessages');
            messagesDiv.html('');
            
            // Adicionar mensagem inicial
            addMessage("Olá! Eu sou o Assistente IA. Como posso ajudar você hoje?\n\nPergunte sobre tecnologia, programação, ou converse normalmente!", 'bot');
        }
