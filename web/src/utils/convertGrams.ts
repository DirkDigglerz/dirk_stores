const convertGramsToWeightSystem = (weightSystem: string, grams: number) => {
  if (weightSystem === 'LB') {
    // CONVER TTO ONE DECIMAL PLACE 
    return Math.round((grams / 453.592) * 10) / 10;
  }
  return grams / 1000;
  
};

export default convertGramsToWeightSystem;