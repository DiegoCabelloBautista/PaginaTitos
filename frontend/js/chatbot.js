document.addEventListener('DOMContentLoaded', function () {
    console.log("Chatbot initialized");

    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    let isOpen = false;

    // Toggle Chatbot
    chatbotToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        toggleChatbot();
        if (isOpen) userInput.focus();
    });

    chatbotClose.addEventListener('click', () => {
        isOpen = false;
        toggleChatbot();
    });

    function toggleChatbot() {
        if (isOpen) {
            chatbotWindow.classList.remove('hidden');
            chatbotToggle.innerHTML = '<i class="fas fa-times"></i>'; // Change icon to close
        } else {
            chatbotWindow.classList.add('hidden');
            chatbotToggle.innerHTML = '<i class="fas fa-comment-dots"></i>'; // Change back to chat icon
        }
    }

    // Function to add a message to the chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
        messageDiv.innerHTML = text;
        chatbotMessages.appendChild(messageDiv);

        // Auto-scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Initial Greeting
    setTimeout(() => {
        if (chatbotMessages.children.length === 0) {
            addMessage("¡Hola! 👋 Soy el asistente virtual de Legumbres Atalaya. ¿En qué puedo ayudarte hoy?", 'bot');
        }
    }, 500);

    // --- Message Handling Logic ---

    function getBotResponse(input) {
        // Normalize input
        const text = input.toLowerCase().trim();

        // 1. Greetings
        if (text.match(/^(hola|buenas|buenos|que tal|como estas|hey)/)) {
            return "¡Hola! Estoy aquí para ayudarte. ¿Tienes alguna pregunta sobre nuestros productos o servicios?";
        }

        // 2. Schedule / Hours
        if (text.includes('horario') || text.includes('hora') || text.includes('abierto') || text.includes('cerrado') || text.includes('cuando abres')) {
            return "Nuestro horario de atención es:<br><strong>Lunes a Viernes:</strong> 8:00 - 18:00<br><strong>Sábados:</strong> 9:00 - 13:00";
        }

        // 3. Contact
        if (text.includes('contacto') || text.includes('telefono') || text.includes('telf') || text.includes('email') || text.includes('correo') || text.includes('llamar')) {
            return "Puedes contactarnos al teléfono <strong>952 71 00 00</strong> o escribirnos a <a href='mailto:info@legumbresatalaya.com'>info@legumbresatalaya.com</a>.<br>También puedes usar nuestro <a href='contacto.html'>formulario de contacto</a>.";
        }

        // 4. Products General
        if (text.includes('producto') || text.includes('legumbre') || text.includes('catalogo') || text.includes('vende') || text.includes('lenteja') || text.includes('garbanzo') || text.includes('alubia')) {
            return "Ofrecemos una gran variedad de legumbres selectas como garbanzos, lentejas y alubias, además de aceites y aceitunas. Puedes ver nuestro catálogo completo <a href='productos.html'>haciendo clic aquí</a>.";
        }

        // 5. Location / Visiting
        if (text.includes('donde') || text.includes('ubicacion') || text.includes('direccion') || text.includes('sitio') || text.includes('lugar') || text.includes('ir alli') || text.includes('tienda fisica') || text.includes('visitar') || text.includes('pasarme')) {
            return "Estamos ubicados en <strong>Av del Olivar, 6, Villanueva de Algaidas, Málaga</strong>. ¡Estaremos encantados de recibirte en nuestra tienda!";
        }

        // 6. Pricing / Wholesale
        if (text.includes('precio') || text.includes('costo') || text.includes('cuanto vale') || text.includes('tarifa') || text.includes('mayorista')) {
            return "Para precios y tarifas al por mayor, por favor contáctanos directamente para ofrecerte un presupuesto personalizado según tu volumen de pedido.";
        }

        // 7. Shipping / Orders General
        if (text.includes('envio') || text.includes('pedir') || text.includes('pedido') || text.includes('comprar') || text.includes('tarda') || text.includes('transporte')) {
            // Specific check for shipping costs
            if (text.includes('cobrais') || text.includes('cuesta') || text.includes('gratis') || text.includes('gasto') || text.includes('precio')) {
                return "Los gastos de envío dependen del peso y destino. Para pedidos superiores a cierta cantidad, el envío puede ser gratuito. Contáctanos para más detalles.";
            }
            return "Realizamos envíos en 24/48 horas a toda la península con total garantía. Puedes hacer tu pedido por teléfono o email.";
        }

        // 8. Payment Methods
        if (text.includes('pago') || text.includes('pagar') || text.includes('tarjeta') || text.includes('efectivo') || text.includes('bizum')) {
            return "Aceptamos pagos por transferencia bancaria y en efectivo en nuestra tienda física. Para pedidos online, confirmamos el método al gestionar el pedido.";
        }

        // 9. Returns
        if (text.includes('devolucion') || text.includes('devolver') || text.includes('garantia') || text.includes('mal estado') || text.includes('roto')) {
            return "Garantizamos la máxima calidad. Si recibes algo en mal estado, contáctanos antes de 24h y te lo reponemos sin coste alguno.";
        }

        // 10. Thanks
        if (text.includes('gracias') || text.includes('agradecido') || text.includes('vale') || text.includes('ok') || text.includes('perfecto')) {
            return "¡De nada! Es un placer ayudarte. 😊";
        }

        // Default Fallback
        if (text.length < 3) return "Por favor, dime algo más para que pueda ayudarte.";

        return "Lo siento, no tengo respuesta para eso. Puedo informarte sobre: horarios, productos, precios, envíos, ubicación o devoluciones.";
    }

    function handleSend() {
        const text = userInput.value.trim();
        if (text === "") return;

        // Add user message
        addMessage(text, 'user');
        userInput.value = ""; // Clear input

        // Simulate thinking time
        setTimeout(() => {
            const typingIndicator = document.createElement('div');
            typingIndicator.id = "typing-indicator";
            typingIndicator.innerHTML = '<span style="font-style: italic; color: #888; font-size: 0.8rem;">Escribiendo...</span>';
            chatbotMessages.appendChild(typingIndicator);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            setTimeout(() => {
                const indicator = document.getElementById("typing-indicator");
                if (indicator) indicator.remove();

                const response = getBotResponse(text);
                addMessage(response, 'bot');
            }, 800); // 800ms delay for response
        }, 300); // 300ms delay to start typing
    }

    // Event Listeners for Input
    sendBtn.addEventListener('click', handleSend);

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    // Handle Quick Replies
    window.sendQuickReply = function (topic) {
        let userText = "";

        switch (topic) {
            case 'horario': userText = "Consultar Horario"; break;
            case 'contacto': userText = "Información de Contacto"; break;
            case 'productos': userText = "Ver Productos"; break;
            case 'envios': userText = "Envíos y Pedidos"; break;
            default: userText = topic;
        }

        addMessage(userText, 'user');

        setTimeout(() => {
            // Use topic for logic matching
            const response = getBotResponse(topic);

            const typingIndicator = document.createElement('div');
            typingIndicator.id = "typing-indicator";
            typingIndicator.innerHTML = '<span style="font-style: italic; color: #888; font-size: 0.8rem;">Escribiendo...</span>';
            chatbotMessages.appendChild(typingIndicator);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            setTimeout(() => {
                const indicator = document.getElementById("typing-indicator");
                if (indicator) indicator.remove();
                addMessage(response, 'bot');
            }, 800);
        }, 300);
    };
});
