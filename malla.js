// Estructura básica con un ejemplo real
const ramos = [
  { id: "bioCelular", nombre: "Biología Celular", prerequisitos: [], semestre: 1 },
  { id: "bioMolecGen", nombre: "Biología Molecular y Genética", prerequisitos: ["bioCelular"], semestre: 2 },
  { id: "bioquimica", nombre: "Bioquímica General", prerequisitos: ["bioMolecGen"], semestre: 3 }
  // Continúa con el resto de tu malla...
];

const mallaContainer = document.getElementById("malla");

const estado = JSON.parse(localStorage.getItem("estadoMallaJo") || "{}");

ramos.forEach(ramo => {
  const div = document.createElement("div");
  div.className = "ramo";
  div.textContent = ramo.nombre;

  const completado = estado[ramo.id];
  const bloqueado = !ramo.prerequisitos.every(p => estado[p]);

  if (completado) div.classList.add("completed");
  else if (bloqueado) div.classList.add("locked");

  div.onclick = () => {
    if (div.classList.contains("locked")) return;

    estado[ramo.id] = !estado[ramo.id];
    localStorage.setItem("estadoMallaJo", JSON.stringify(estado));
    location.reload();
  };

  mallaContainer.appendChild(div);
});