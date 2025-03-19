import React, { useEffect, useState } from "react";
import birdup from "../../assets/assets_bird/Flappy_Bird/GameObjects/yellowbird-upflap.png";
import birmidf from "../../assets/assets_bird/Flappy_Bird/GameObjects/yellowbird-midflap.png";
import birddow from "../../assets/assets_bird/Flappy_Bird/GameObjects/yellowbird-downflap.png";

const Bird: React.FC = () => {
  const [birdY, setBirdY] = useState(300); // Posição inicial do pássaro
  const [velocity, setVelocity] = useState(0); // Velocidade inicial
  const gravity = 0.5; // Gravidade
  const jump = -8; // Força do pulo
  const [birdImg, setBirdImg] = useState(birmidf); // Sprite inicial
  const [isGameOver, setIsGameOver] = useState(false); // Controle de fim de jogo

  // Função para reiniciar o jogo
  const restartGame = () => {
    setBirdY(300); // Volta à posição inicial
    setVelocity(0); // Zera a velocidade
    setBirdImg(birmidf); // Volta à imagem inicial
    setIsGameOver(false); // Reinicia o estado do jogo
  };

  useEffect(() => {
    if (isGameOver) return; // Não permite interações quando o jogo acaba

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "w") {
        setVelocity(jump);
        setBirdImg(birdup); // Muda para a sprite de "subindo"
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGameOver]);

  useEffect(() => {
    if (isGameOver) return;

    const gameLoop = setInterval(() => {
      setVelocity((v) => v + gravity); // Aplica gravidade
      setBirdY((y) => y + velocity); // Atualiza posição do pássaro

      // Detecta se o pássaro saiu do limite inferior da tela (piso)
      if (birdY >= 570) { // Aqui 570 é o limite inferior da tela
        setIsGameOver(true);
        alert("Você perdeu! O jogo será reiniciado.");
        restartGame(); // Reinicia o jogo quando o jogador perde
        clearInterval(gameLoop); // Para o jogo após a perda
      }

      // Troca de sprite conforme a velocidade do pássaro
      if (velocity < -2) {
        setBirdImg(birdup); // Subindo
      } else if (velocity > 2) {
        setBirdImg(birddow); // Descendo
      } else {
        setBirdImg(birmidf); // Neutro
      }
    }, 30);

    return () => clearInterval(gameLoop);
  }, [velocity, birdY, isGameOver]);

  return (
    <img
      src={birdImg}
      alt="Pássaro"
      width={50}
      style={{
        position: "absolute",
        top: birdY,
        left: 100,
        transition: "top 0.1s linear",
      }}
    />
  );
};

export default Bird;
