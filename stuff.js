function openWindow(id) {
        const window = document.getElementById(id);
        window.classList.add('active');
        
    }

function closeWindow(id) {
    document.getElementById(id).classList.remove('active');

}

let draggedElement = null;
let offsetX = 0;
let offsetY = 0;

function startDrag(e,id) {
    draggedElement = document.getElementById(id);
    const rect = draggedElement.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener('mousemove',drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
    if (draggedElement){
        draggedElement.style.left = (e.clientX - offsetX) + "px";
        draggedElement.style.top = (e.clientY - offsetY) + "px";
    }
}

function stopDrag() {
    draggedElement = null;
    document.removeEventListener('mousemove',drag)
    document.removeEventListener('mouseup', stopDrag)
}