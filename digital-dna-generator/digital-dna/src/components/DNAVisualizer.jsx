import React, { useRef, useEffect } from "react";
import p5 from "p5";

const DNAVisualizer = ({ formData }) => {
  const containerRef = useRef();

  useEffect(() => {
    let sketch = (p) => {
      let traits = formData.traits;
      let emotion = formData.emotion;
      let colorBase = getColorFromInterest(formData.interests);
      let bgColor = getBackgroundFromEmotion(emotion);

      p.setup = () => {
        p.createCanvas(600, 400);
        p.background(bgColor);
        p.noFill();
      };

      p.draw = () => {
        p.background(bgColor + "11"); // faint trail effect

        traits.forEach((trait, i) => {
          let x = p.width / 2 + Math.sin(p.frameCount * 0.01 * (i + 1)) * 150;
          let y = p.height / 2 + Math.cos(p.frameCount * 0.01 * (i + 1)) * 150;

          p.strokeWeight(2);
          p.stroke(colorBase[i % colorBase.length]);
          drawTraitShape(p, trait, x, y, i);
        });
      };
    };

    let canvas = new p5(sketch, containerRef.current);
    return () => {
      canvas.remove();
    };
  }, [formData]);

  return <div ref={containerRef}></div>;
};

function drawTraitShape(p, trait, x, y, index) {
  const size = 50 + index * 5;

  switch (trait) {
    case "Curious":
      p.ellipse(x, y, size, size);
      break;
    case "Empathetic":
      p.beginShape();
      for (let a = 0; a < p.TWO_PI; a += 0.3) {
        let r = size + 10 * p.sin(a * 5);
        let sx = x + r * p.cos(a);
        let sy = y + r * p.sin(a);
        p.vertex(sx, sy);
      }
      p.endShape(p.CLOSE);
      break;
    case "Analytical":
      p.rect(x - size / 2, y - size / 2, size, size);
      break;
    case "Adventurous":
      p.triangle(x, y - size, x - size, y + size, x + size, y + size);
      break;
    case "Creative":
      p.line(x - size, y - size, x + size, y + size);
      break;
    case "Grounded":
      p.rect(x, y, size / 2, size / 2);
      break;
    case "Ambitious":
      p.arc(x, y, size, size, 0, p.PI);
      break;
    default:
      p.point(x, y);
  }
}

function getColorFromInterest(interestText) {
  const text = interestText.toLowerCase();
  const colors = [];

  if (text.includes("nature")) colors.push("#4CAF50");
  if (text.includes("music")) colors.push("#FF4081");
  if (text.includes("tech")) colors.push("#00BCD4");
  if (text.includes("art")) colors.push("#FFC107");
  if (text.includes("space")) colors.push("#673AB7");
  if (text.includes("bars")) colors.push("#B01CFF");

  // fallback if no match
  if (colors.length === 0) {
    colors.push("#2196F3", "#E91E63", "#009688");
  }

  return colors;
}

function getBackgroundFromEmotion(emotion) {
  switch (emotion) {
    case "Calm":
      return "#D0F0F8";
    case "Energetic":
      return "#FFF176";
    case "Anxious":
      return "#E57373";
    case "Inspired":
      return "#CE93D8";
    case "Melancholic":
      return "#90A4AE";
    default:
      return "#FFFFFF";
  }
}

export default DNAVisualizer;
