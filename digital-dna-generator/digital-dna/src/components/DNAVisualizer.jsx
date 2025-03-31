import React, { useRef, useEffect } from "react";
import p5 from "p5";

const DNAVisualizer = ({ formData }) => {
  const containerRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let angle = 0;
      let symbols = formData.symbols || [];
      let colors = formData.colors || ["#ffffff", "#888888", "#000000"];
      let emotionColor = getEmotionColor(formData.emotion);
      let structure = getStructure(formData.motif);
      if (!structure || !structure.points) structure = { points: 8, radius: 120 };
      let motionSpeed = getMotionSpeed(formData.animationStyle);
      let flow = getElementMotion(formData.element);

      p.setup = () => {
        p.createCanvas(700, 500);
        p.angleMode(p.DEGREES);
        p.background(emotionColor);
        p.noFill();
        p.frameRate(60);
      };

      p.draw = () => {
        p.background(emotionColor + "20");
        p.translate(p.width / 2, p.height / 2);
        angle += motionSpeed;

        for (let i = 0; i < structure.points; i++) {
          p.push();
          p.rotate((360 / structure.points) * i + angle);
          p.translate(structure.radius, 0);

          let size = 20 + (formData.age || 20);
          let wobble = Math.sin(p.frameCount * flow.speed) * flow.amplitude;

          let color = colors[i % colors.length] || "#ffffff";
          p.stroke(color);
          p.strokeWeight(1 + (formData.age % 6));
          drawMBTIShape(p, formData.mbti || "INFP", size + wobble);

          if (symbols[i]) {
            p.fill(255);
            p.noStroke();
            p.textSize(20);
            p.text(symbols[i], 0, -size - 10);
          }

          p.pop();
        }
      };
    };

    let p5Instance = new p5(sketch, containerRef.current);
    return () => p5Instance.remove();
  }, [formData]);

  return <div ref={containerRef}></div>;
};

const getElementMotion = (element) => {
  switch ((element || "").toLowerCase()) {
    case "fire": return { speed: 0.5, amplitude: 10 };
    case "water": return { speed: 0.2, amplitude: 20 };
    case "earth": return { speed: 0.1, amplitude: 5 };
    case "air": return { speed: 0.3, amplitude: 15 };
    case "void": return { speed: 0.7, amplitude: 30 };
    default: return { speed: 0.2, amplitude: 10 };
  }
};

const getEmotionColor = (emotion) => {
  switch ((emotion || "").toLowerCase()) {
    case "peace": return "#D0F0F8";
    case "sadness": return "#6A8CAF";
    case "joy": return "#FFE57F";
    case "anxiety": return "#E57373";
    case "hope": return "#B2FF59";
    case "anger": return "#FF6F00";
    default: return "#CCCCCC";
  }
};

const getMotionSpeed = (style) => {
  switch ((style || "").toLowerCase()) {
    case "flowy": return 0.5;
    case "bouncy": return 2;
    case "electric": return 4;
    case "rigid": return 0.3;
    case "chaotic": return 3;
    default: return 1;
  }
};

const getStructure = (motif) => {
  switch ((motif || "").toLowerCase()) {
    case "fractals": return { points: 12, radius: 150 };
    case "minimalism": return { points: 3, radius: 100 };
    case "chaotic": return { points: 20, radius: 180 };
    case "sacred geometry": return { points: 6, radius: 130 };
    default: return { points: 8, radius: 120 };
  }
};

const drawMBTIShape = (p, type, size) => {
  switch (type) {
    case "INTJ":
    case "INFJ":
      p.ellipse(0, 0, size, size);
      break;
    case "ENTP":
    case "ENFP":
      p.rect(-size / 2, -size / 2, size, size);
      break;
    case "ISTP":
    case "ISFP":
      p.triangle(0, -size, -size, size, size, size);
      break;
    case "ESTJ":
    case "ESFJ":
      p.arc(0, 0, size, size, 0, 180);
      break;
    default:
      p.ellipse(0, 0, size * 0.8, size * 0.8);
      break;
  }
};

export default DNAVisualizer;
