// script.js
document.getElementById('log-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const description = document.getElementById('description').value;
    const pdfFile = document.getElementById('pdf').files[0];
    
    const logList = document.getElementById('log-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${date} ${time} - ${description}`;
    
    logList.appendChild(listItem);
    
    // Enviar datos a Python
    const formData = new FormData();
    formData.append('date', date);
    formData.append('time', time);
    formData.append('description', description);
    formData.append('pdf', pdfFile);
    
    fetch('http://localhost:5000/save', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    
    this.reset();
});

document.getElementById('inventory-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const item = document.getElementById('item').value;
    const quantity = document.getElementById('quantity').value;
    
    const inventoryList = document.getElementById('inventory-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${item} - ${quantity}`;
    
    inventoryList.appendChild(listItem);
    
    // Enviar datos a Python
    fetch('http://localhost:5000/inventory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item, quantity })
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    
    this.reset();
});
