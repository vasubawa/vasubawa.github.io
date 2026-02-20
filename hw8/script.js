document.addEventListener('DOMContentLoaded', () => {
    window.showFilter = showFilter;
    window.showAddNew = showAddNew;
    window.filterArticles = filterArticles;
    window.addNewArticle = addNewArticle;

    const filterForm = document.getElementById('filterContent');
    const newForm = document.getElementById('newContent');
    if (filterForm) filterForm.style.display = filterForm.style.display || 'block';
    if (newForm) newForm.style.display = newForm.style.display || 'none';
});

function showFilter() {
    const filterForm = document.getElementById('filterContent');
    const newForm = document.getElementById('newContent');
    if (!filterForm) return;

    filterForm.style.display = (filterForm.style.display === 'none' || getComputedStyle(filterForm).display === 'none') ? 'block' : 'none';
    if (newForm) newForm.style.display = 'none';
}

function showAddNew() {
    const filterForm = document.getElementById('filterContent');
    const newForm = document.getElementById('newContent');
    if (!newForm) return;

    newForm.style.display = (newForm.style.display === 'none' || getComputedStyle(newForm).display === 'none') ? 'flex' : 'none';
    if (filterForm) filterForm.style.display = 'none';
}

function filterArticles() {
    const showOpinion = document.getElementById('opinionCheckbox')?.checked;
    const showRecipe = document.getElementById('recipeCheckbox')?.checked;
    const showUpdate = document.getElementById('updateCheckbox')?.checked;

    const articles = document.querySelectorAll('#articleList article');
    articles.forEach(a => {
        if (a.classList.contains('opinion')) {
            a.style.display = showOpinion ? '' : 'none';
        } else if (a.classList.contains('recipe')) {
            a.style.display = showRecipe ? '' : 'none';
        } else if (a.classList.contains('update')) {
            a.style.display = showUpdate ? '' : 'none';
        }
    });
}

function addNewArticle() {
    const titleInput = document.getElementById('inputHeader');
    const textInput = document.getElementById('inputArticle');
    if (!titleInput || !textInput) return;

    const title = titleInput.value || 'Untitled';
    const text = textInput.value || '';

    let type = 'opinion';
    if (document.getElementById('recipeRadio')?.checked) type = 'recipe';
    else if (document.getElementById('lifeRadio')?.checked) type = 'update';

    const list = document.getElementById('articleList');
    if (!list) return;

    const article = document.createElement('article');
    article.className = type;

    const existing = list.querySelectorAll('article').length;
    article.id = 'a' + (existing + 1);

    const marker = document.createElement('span');
    marker.className = 'marker';
    marker.textContent = type.charAt(0).toUpperCase() + type.slice(1);

    const h2 = document.createElement('h2');
    h2.textContent = title;

    const p = document.createElement('p');
    p.textContent = text;

    const p2 = document.createElement('p');
    const a = document.createElement('a');
    a.href = 'moreDetails.html';
    a.textContent = 'Read more...';
    p2.appendChild(a);

    article.appendChild(marker);
    article.appendChild(h2);
    article.appendChild(p);
    article.appendChild(p2);

    list.appendChild(article);

    titleInput.value = '';
    textInput.value = '';
    const radios = document.getElementsByName('articleType');
    radios.forEach?.(r => r.checked = false);

    filterArticles();
}
