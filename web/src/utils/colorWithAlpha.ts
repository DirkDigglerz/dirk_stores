import colorNames from 'color-name';

function colorWithAlpha(color: string, alpha: number): string {
  const lowerCasedColor = color.toLowerCase() as keyof typeof colorNames;
  
  if (colorNames[lowerCasedColor]) {
    const rgb = colorNames[lowerCasedColor];
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
  }
  
  // If color is in hex format (#RRGGBB)
  if (/^#([A-Fa-f0-9]{6})$/.test(color)) {
    const hex = color.slice(1);
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  // If color is in rgb format (rgb(r, g, b))
  if (/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/.test(color)) {
    const result = color.match(/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/);
    if (result) {
      return `rgba(${result[1]}, ${result[2]}, ${result[3]}, ${alpha})`;
    }
  }
  
  // Default to original color if format is not recognized
  return color;
}

export default colorWithAlpha;
