function openWindow(id) {
        const window = document.getElementById(id);
        window.classList.add('active');
        
    }

function closeWindow(id) {
    document.getElementById(id).classList.remove('active');
    
}