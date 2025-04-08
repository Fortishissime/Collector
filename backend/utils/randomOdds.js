const randomOdds = () => {
    // On définit une plage de cotes réalistes
    const coteMin = 1.05;
    const coteMax = 15.0;5 
    
    // On génère une cote de base autour de 2.00
    const coteBase = Math.random() * (2.2 - 1.8) + 1.8;
    
    // On génère un facteur d'écart entre les équipes
    const ecart = Math.random() * (1.5 - 0.1) + 0.1;
    
    // On calcule les cotes pour chaque équipe
    let cote1 = Math.max(Math.min(coteBase - ecart, coteMax), coteMin);
    let cote2 = Math.max(Math.min(coteBase + ecart, coteMax), coteMin);
    
    // On mélange aléatoirement l'ordre des cotes
    if (Math.random() < 0.5) {
        [cote1, cote2] = [cote2, cote1];
    }
    
    return [cote1, cote2];
}

export default function updateMatchOdds(matches, matchesOdds) {
    // Convertir matchesOdds en un objet pour une recherche plus efficace
    const oddsMap = matchesOdds.reduce((acc, odds) => {
        const [id, values] = Object.entries(odds)[0];
        acc[id] = values;
        return acc;
    }, {});

    for (const match of matches) {
        const matchId = match.id;
        
        if (!oddsMap[matchId]) {
            // Si l'ID n'existe pas, générer de nouvelles cotes
            const newOdds = randomOdds(match.teams);
            oddsMap[matchId] = [newOdds[Object.keys(newOdds)[0]], newOdds[Object.keys(newOdds)[1]]];
        }
    }
    
    // Convertir l'objet oddsMap de retour en tableau
    return Object.entries(oddsMap).map(([id, values]) => ({ [id]: values }));
}