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
        p.background(emotionColor + "20"); // light trail
        p.translate(p.width / 2, p.height / 2);
        angle += motionSpeed;

        for (let i = 0; i < structure.points; i++) {
          p.push();
          p.rotate((360 / structure.points) * i + angle);
          p.translate(structure.radius, 0);

          let size = 20 + (formData.age || 20);
          let wobble = Math.sin(p.frameCount * flow.speed) * flow.amplitude;

          p.stroke(colors[i % colors.length]);
          p.strokeWeight(1 + (formData.age % 6));
          drawMBTIShape(p, formData.mbti, size + wobble);

          // Draw orbiting symbol
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

// MOTION FUNCTIONS

const getElementMotion = (element) => {
  switch (element) {
    case "Fire": return { speed: 0.5, amplitude: 10 };
    case "Water": return { speed: 0.2, amplitude: 20 };
    case "Earth": return { speed: 0.1, amplitude: 5 };
    case "Air": return { speed: 0.3, amplitude: 15 };
    case "Void": return { speed: 0.7, amplitude: 30 };
    default: return { speed: 0.2, amplitude: 10 };
  }
};

const getEmotionColor = (emotion) => {
  switch (emotion) {
    case "Peace": return "#D0F0F8";
    case "Sadness": return "#6A8CAF";
    case "Joy": return "#FFE57F";
    case "Anxiety": return "#E57373";
    case "Hope": return "#B2FF59";
    case "Anger": return "#FF6F00";
    default: return "#CCCCCC";
  }
};

const getMotionSpeed = (style) => {
  switch (style) {
    case "Flowy": return 0.5;
    case "Bouncy": return 2;
    case "Electric": return 4;
    case "Rigid": return 0.3;
    case "Chaotic": return 3;
    default: return 1;
  }
};

const getStructure = (motif) => {
  switch (motif) {
    case "Fractals": return { points: 12, radius: 150 };
    case "Minimalism": return { points: 3, radius: 100 };
    case "Chaotic": return { points: 20, radius: 180 };
    case "Sacred Geometry": return { points: 6, radius: 130 };
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
      p.beginShape();
      for (let a = 0; a < 360; a += 60) {
        let r = size;
        let x = r * Math.cos(a * (Math.PI / 180));
        let y = r * Math.sin(a * (Math.PI / 180));
        p.vertex(x, y);
      }
      p.endShape(p.CLOSE);
  }
};

export default DNAVisualizer;
