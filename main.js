//создаём блок и всё внутри него
function initProject() {
    const cont = document.createElement('div');
    cont.id = 'container';
    document.body.append(cont);


    //создаём три колонки
    for (let i = 0; i < 3; i++) {
        const column = document.createElement('div');
        cont.append(column);
        column.classList.add('column');
        column.addEventListener('dragenter', eventHandler);

    }

    //создаём три карточки, которые будут перемещаться между колонками
    const firstColumn = document.querySelector('.column');
    for (let i = 0; i < 3; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        firstColumn.append(card);
        card.draggable = true;
        card.innerText = `Карточка №${i+1}`;
        card.addEventListener('dragstart', eventHandler);
        card.addEventListener('dragend', eventHandler);
        card.addEventListener('dragenter', eventHandler)
    }
}

//действия на перемещения карточек
let activeColumn = null;
let activeCard = null;
function eventHandler(event) {
    switch (event.type) {
        case 'dragstart':
            activeCard = event.currentTarget;
            activeColumn = activeCard.parentElement;
            event.currentTarget.classList.add('select');
            break;
        case 'dragend':
            event.currentTarget.classList.remove('select');
            if (activeColumn !== activeCard.parentElement) {
                activeColumn.append(event.currentTarget);
            }
            break;
        case 'dragenter':
            if (event.currentTarget.classList.contains('column')) {
                activeColumn = event.currentTarget;
            } else if (event.currentTarget.classList.contains('card')) {
                changeCards(activeCard, event.currentTarget); //меняем местами выбранную карточку и текущий элемент
            }
            break;
    }
}

function changeCards(active, other) {
    if (active.parentElement !== other.parentElement){
        return;
    }
    const arr = [...active.parentElement.children];
    const activeIndex = arr.findIndex(element => element === active);
    const otherIndex = arr.findIndex(element => element === other);
    
    if(activeIndex < otherIndex) {
        active.parentElement.insertBefore(other, active);
    } else if (activeIndex > otherIndex) {
        active.parentElement.insertBefore(active, other);
    }
}

//запускаем главную функцию только, когда вся страница загрузится
window.addEventListener('load', initProject)
