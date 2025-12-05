// =====================================
//  Anodized Aluminium Mod for Sandboxels
// =====================================

if (!elements.aluminum) {
    console.warn("Aluminum element not found! Make sure Sandboxels has 'aluminum' enabled.");
}

// Criar um elemento que substitui o alumínio original quando é anodizado
elements.anodized_aluminium = {
    name: "Anodized Aluminium",
    color: "#bbbbbb",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 2700,
    
    tick: function(pixel) {
        // Garante que existe o contador
        if (pixel.anodizeTime === undefined) {
            pixel.anodizeTime = 0;
        }

        // Só permite anodizar se o pixel for alumínio
        if (pixel.originalElement === undefined) {
            pixel.originalElement = "aluminum";
        }

        // Se perdeu identidade, reinicia
        if (pixel.originalElement !== "aluminum") return;

        // Se está recebendo choque, aumenta o tempo
        if (pixel.charge && pixel.charge > 0) {
            pixel.anodizeTime++;
        }

        // ------ CORES BASEADAS NO TEMPO ANODIZANDO ------
        if (pixel.anodizeTime > 0 && pixel.anodizeTime < 20) {
            pixel.color = "#9ec4ff"; // light blue
        }
        else if (pixel.anodizeTime >= 20 && pixel.anodizeTime < 40) {
            pixel.color = "#6fa5ff"; // deep blue
        }
        else if (pixel.anodizeTime >= 40 && pixel.anodizeTime < 70) {
            pixel.color = "#bb55ff"; // purple
        }
        else if (pixel.anodizeTime >= 70 && pixel.anodizeTime < 100) {
            pixel.color = "#ffaa33"; // orange
        }
        else if (pixel.anodizeTime >= 100) {
            pixel.color = "#ffdd00"; // gold
        }
    }
};


// =============================
//  Transformação do alumínio
// =============================

// Quando o pixel de "aluminum" receber choque, transforma em anodized_aluminium
// mas mantém a estrutura e posição original

elements.aluminum.tick = function(pixel) {

    // Se recebeu choque → começa anodização
    if (pixel.charge && pixel.charge > 0) {

        // Troca para elemento anodizado mantendo o timer
        changePixel(pixel, "anodized_aluminium");

    }
};
