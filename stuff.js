let draggedElement = null;
let offsetX = 0;
let offsetY = 0;

function OpenWindow(id, triggerEl) {
    const winEl = document.getElementById(id);
    if (!winEl) return;

    if (!triggerEl) {
        triggerEl = Array.from(document.querySelectorAll('.window-button')).find(b => {
            const on = b.getAttribute('onclick') || '';
            return on.indexOf("'" + id + "'") !== -1 || on.indexOf('"' + id + '"') !== -1 || on.indexOf(id) !== -1;
        });
    }

    winEl.classList.add('active');
    bringToFront(winEl);

    if (triggerEl && typeof triggerEl.getBoundingClientRect === 'function') {
        const btnRect = triggerEl.getBoundingClientRect();

        const winRect = winEl.getBoundingClientRect();

        let left = btnRect.left + (btnRect.width / 2) - (winRect.width / 2);
    let top = btnRect.bottom + 8 - 50;

        left = Math.max(8, Math.min(left, window.innerWidth - winRect.width - 8));
        top = Math.max(8, Math.min(top, window.innerHeight - winRect.height - 8));

        winEl.style.left = left + 'px';
        winEl.style.top = top + 'px';
    }
}

function closeWindow(id) {
    document.getElementById(id).classList.remove('active');
}

function bringToFront(element) {
    const windows = document.querySelectorAll('.window');
    windows.forEach(w => w.style.zIndex = 1);
    element.style.zIndex = 1000;
}

function startDrag(e, id) {
    draggedElement = document.getElementById(id);
    const rect = draggedElement.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    bringToFront(draggedElement);
   
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
    if (draggedElement) {
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;
       
        newX = Math.max(0, Math.min(newX, window.innerWidth - draggedElement.offsetWidth));
        newY = Math.max(0, Math.min(newY, window.innerHeight - draggedElement.offsetHeight));
       
        draggedElement.style.left = newX + 'px';
        draggedElement.style.top = newY + 'px';
    }
}

function stopDrag() {
    draggedElement = null;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

document.querySelectorAll('.window').forEach(window => {
    window.addEventListener('mousedown', () => bringToFront(window));
});