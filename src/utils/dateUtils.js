export function getSeasonalTheme() {
  const now = new Date();
  const month = now.getMonth(); // 0-11
  const day = now.getDate(); // 1-31

  if ((month === 9 && day >= 1 && day <= 3)) {
    return 'national-day';
  }
  
  // Lunar New Year (Jan 1 - March 15)
  if ((month === 0 || month === 1 || (month === 2 && day <= 15))) {
    return 'lunar-new-year';
  }
  
  // // Summer (June - August)
  // if (month >= 5 && month <= 7) {
  //   return 'summer';
  // }
  
  // Mid-Autumn Festival (August)
  // Note: The exact date varies, but it's generally in August in lunar calendar
  if (month === 7) {
    return 'mid-autumn';
  }
  
  // Autumn (September - November)
  if (month >= 8 && month <= 10) {
    return 'autumn';
  }
  
  // Halloween (Oct 15 - Nov 5)
  if ((month === 9 && day >= 15) || (month === 10 && day <= 5)) {
    return 'halloween';
  }
  
  // Christmas (Dec 1 - Dec 31)
  if (month === 11) {
    return 'christmas';
  }

  const randomDefaultThemes = ['coding', 'cloud', 'anime'];
  if (month >= 5 && month <= 6) { // Summer (May - June)
    randomDefaultThemes.push('summer');
  }
  return randomDefaultThemes[Math.floor(Math.random() * randomDefaultThemes.length)];
}