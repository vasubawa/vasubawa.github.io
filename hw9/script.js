const apiCache = {};
let team = [];
let currentPokemon = null;

const pokemonInput = document.getElementById('pokemonInput');
const submitBtn = document.getElementById('submitBtn');
const pokemonDetails = document.getElementById('pokemonDetails');
const pokemonImage = document.getElementById('pokemonImage');
const audioSource = document.getElementById('audioSource');
const moveSelects = [document.getElementById('move1'), document.getElementById('move2'), document.getElementById('move3'), document.getElementById('move4')];
const addToTeamBtn = document.getElementById('addToTeamBtn');
const teamSection = document.getElementById('teamSection');
const teamList = document.getElementById('teamList');

submitBtn.addEventListener('click', searchPokemon);
addToTeamBtn.addEventListener('click', addToTeam);

async function fetchPokemon(query) {
    const cacheKey = query.toLowerCase();
    if (apiCache[cacheKey]) return apiCache[cacheKey];
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${cacheKey}`);
    const data = await response.json();
    apiCache[cacheKey] = data;
    return data;
}

async function searchPokemon() {
    const query = pokemonInput.value.trim();
    
    pokemonDetails.classList.add('hidden');
    
    const data = await fetchPokemon(query);
    
    currentPokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        cry: data.cries?.latest || null,
        moves: data.moves
    };
    
    displayPokemon(currentPokemon);
}

function displayPokemon(pokemon) {
    pokemonImage.src = pokemon.image;
    pokemonImage.alt = pokemon.name;
    pokemonImage.onerror = () => pokemonImage.src = 'https://via.placeholder.com/300?text=No+Image';
    
    if (pokemon.cry) {
        audioSource.src = pokemon.cry;
        document.getElementById('pokemonAudio').load();
    }
    
    const moveNames = pokemon.moves
        .map(m => m.move.name)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort();
    
    moveSelects.forEach(select => populateMoveDropdown(select, moveNames));
    pokemonDetails.classList.remove('hidden');
}

function populateMoveDropdown(selectElement, moves) {
    selectElement.innerHTML = '<option value="">-- Select a move --</option>';
    moves.forEach(move => {
        const option = document.createElement('option');
        option.value = move;
        option.textContent = move.charAt(0).toUpperCase() + move.slice(1).replace('-', ' ');
        selectElement.appendChild(option);
    });
}

function addToTeam() {
    const selectedMoves = moveSelects.map(s => s.value).filter(m => m !== '');
    
    team.push({
        id: currentPokemon.id,
        name: currentPokemon.name,
        image: currentPokemon.image,
        cry: currentPokemon.cry,
        moves: selectedMoves
    });
    
    teamSection.classList.remove('hidden');
    displayTeam();
    pokemonInput.value = '';
    pokemonDetails.classList.add('hidden');
}

function displayTeam() {
    teamList.innerHTML = '';
    team.forEach(member => {
        const movesHTML = member.moves
            .map(m => `<span>${m.charAt(0).toUpperCase() + m.slice(1).replace('-', ' ')}</span>`)
            .join(' ');
        const card = document.createElement('div');
        card.innerHTML = `
            <div>
                <img src="${member.image}" alt="${member.name}">
                <div>
                    <h4>${member.name.charAt(0).toUpperCase() + member.name.slice(1)}</h4>
                    <div>${movesHTML}</div>
                </div>
            </div>
        `;
        teamList.appendChild(card);
    });
}
