import React from 'react';
import './Propositos2025.css';

function Propositos2025() {
  const propositos = [
    "--------------<strong>JUEGOS</strong>--------------",
    "⭐Terminar <strong>*Metaphor: ReFantazio*</strong>",
    "⭐Platinar <strong>*The witcher 3*</strong>",
    "⭐Platinar <strong>*Cyberpunk 2077*</strong>",
    "⭐Platinar <strong>*Kingdom hearts BBS*</strong>",
    "⭐Platinar <strong>*Kingdom hearts 3*</strong>",
    "⭐Terminar la run <strong>no-hit</strong> de <strong>The Binding of Isaac</strong>.",
    "<br>",
    "--------------<strong>PROYECTOS</strong>--------------",
    "⭐Lanzar <strong>Duckievements</strong>",
    "⭐Platinar minimo <strong>15 juegos</strong>",
    "⭐Completar en el <strong>curso de ciberseguridad</strong> y comenzar un proyecto propio.",
    "⭐Completar en el <strong>curso de fullstack</strong> y comenzar un proyecto propio.",
    "⭐<strong>Aumentar el contenido</strong> sobre logros en Youtube y TikTok"

  ];

  return (
    <div className="propositos-container">
      <h1>🎯 Propósitos 2025</h1>
      <ul>
        {propositos.map((proposito, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: proposito }}></li>
        ))}
      </ul>
    </div>
  );
}

export default Propositos2025;
