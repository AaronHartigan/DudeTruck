function foodOptions(truck) {
  let options = '';
  if (truck.vegan) {
    options += 'Vegan';
  }
  if (truck.vegetarian) {
    if (options.length > 0) {
      options += ' · ';
    }
    options += 'Vegetarian';
  }
  if (truck.glutenFree) {
    if (options.length > 0) {
      options += ' · ';
    }
    options += 'Gluten Free';
  }

  return options;
}

export default foodOptions;
