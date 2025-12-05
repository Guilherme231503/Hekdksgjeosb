// Electrolyte liquid
elements.electrolyte = {
    color: "#3fa7ff",
    behavior: behaviors.LIQUID,
    category: "liquids",
    name: "Electrolyte"
};

// Anodization stages by time
const anodizationStages = [
    {time: 5,  color: "#f5d26a", name: "gold"},
    {time: 12, color: "#ff3a3a", name: "red"},
    {time: 20, color: "#8d2bff", name: "purple"},
    {time: 35, color: "#2b4bff", name: "blue"},
    {time: 50, color: "#1a1a1a", name: "black"}
];

// Create the anodized aluminum elements
for (let stage of anodizationStages) {
    elements["aluminum_anodized_" + stage.name] = {
        color: stage.color,
        behavior: behaviors.SOLID,
        category: "Anodized Metals",
        name: "Anodized Aluminum (" + stage.name + ")",
        density: 2700
    };
}

// Add internal property to track anodizing time
if (!elements.aluminum.properties) {
    elements.aluminum.properties = {};
}
elements.aluminum.properties.anodizeTime = 0;

// Main anodizing system (time + shock + electrolyte)
elements.aluminum.tick = function(pixel) {

    // Check if touching electrolyte
    let touchingElectrolyte = false;
    for (let i = 0; i < adjacentCoords.length; i++) {
        let x = pixel.x + adjacentCoords[i][0];
        let y = pixel.y + adjacentCoords[i][1];
        if (!isEmpty(x,y)) {
            let other = pixelMap[x][y];
            if (other.element === "electrolyte") {
                touchingElectrolyte = true;
                break;
            }
        }
    }

    // Requires both electrolyte + charge (shock tool)
    if (touchingElectrolyte && pixel.charge > 0) {
        pixel.anodizeTime = (pixel.anodizeTime || 0) + 1;
    }

    // Update anodization stage based on accumulated time
    for (let stage of anodizationStages) {
        if (pixel.anodizeTime >= stage.time) {
            pixel.element = "aluminum_anodized_" + stage.name;
            pixel.color = stage.color;
        }
    }
};
