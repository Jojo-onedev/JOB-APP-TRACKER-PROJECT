function addInfo(event){
    event.preventDefault();

    //Value of input
    const company = document.getElementById('company').value;
    const position = document.getElementById('position').value;
    const date = document.getElementById('date').value;
    const statut = document.getElementById('statut').value;
    const note = document.getElementById('note').value;

    // value checking 

    if (company === '' || position === '' || date === '' || statut ==='Statut') {
        alert("Please fill all the fields");
        return;
    }

    //create new row in table
    const table = document.getElementById('mytable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // add new cell with inputs value
    newRow.insertCell(0).innerText = company;
    newRow.insertCell(1).innerText = position;
    newRow.insertCell(2).innerText = date;
    newRow.insertCell(3).innerText = statut;
    newRow.insertCell(4).innerText = note;

    //add new cell for action
    const actionsCell = newRow.insertCell(5);
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = function(){
        table.deleteRow(newRow.rowIndex -1);
        saveToLocalStorage(); // save after deleting
    }

    actionsCell.appendChild(deleteButton);

    //reset form
    document.querySelector('.my-form').reset()

    // save the data
    saveToLocalStorage();
}

function saveToLocalStorage() {
    const table = document.getElementById('mytable').getElementsByTagName('tbody')[0];
    localStorage.setItem('addInfo',table.innerHTML)
}

function getInfoFromLocalStorage(){
    const table = document.getElementById('mytable').getElementsByTagName('tbody')[0];
    const storedData = localStorage.getItem('addInfo');
    if(storedData){
        table.innerHTML = storedData;
        attachDeleteEvent();
    }else{
        table.innerHTML = " ";
    }
}

function attachDeleteEvent(){
    const table = document.getElementById('mytable').getElementsByTagName('tbody')[0];
    const deleteButtons = table.querySelectorAll('button');
    deleteButtons.forEach(button =>{
        button.onclick = function() {
            table.deleteRow(button.parentElement.parentElement.rowIndex -1);
            saveToLocalStorage(); // save after deleting
        };
    });
}

// load data from local storage on page loading
window.onload = getInfoFromLocalStorage;