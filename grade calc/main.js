function createList() {
    let userInput = document.getElementById('user').value;
    let list_of_items = document.getElementById("list");

    list_of_items.innerHTML = '';

    

    for (let i = 0; i < userInput; i++) {
        let title = document.createElement("p");
        title.textContent = `Title ${i + 1}`;  
        title.className = "titlelist";

        let input = document.createElement("input");
        input.type = "text";
        input.className = "inputlist";

        /* input.addEventListener("blur", function() {
            if (titlesSet.has(input.value)) {
                alert("This title already exists.");
                input.value = ""; 
            } else {
                titlesSet.add(input.values); 
            }
        }); */

        let perc = document.createElement("p");
        perc.textContent = `Percentage ${i + 1}`;
        perc.className = "percentagelist";
        
        let perc_in = document.createElement("input");
        perc_in.className = "percentageinputlist";
        perc_in.type = "number";
        perc_in.min = "0";
        perc_in.max = "100";
        
        let degreetitle = document.createElement("p");
        degreetitle.textContent = `degree ${i + 1}`;
        degreetitle.className = "degreetitlelist";
        
        let degree = document.createElement("input");
        degree.className = "degreeinputlist";
        degree.type = "number";
        degree.min = "0";
        degree.max = "100";
        
        let container = document.createElement("div");
        container.className = "containerlist";

        let titlecontainer = document.createElement("div");
        titlecontainer.className = "titlecontainer";
        
        let numbercontainer = document.createElement("div");
        titlecontainer.className = "numbercontainer";

        let degreecontainer = document.createElement("div");
        degreecontainer.className = "degreecontainer";

        degreecontainer.appendChild(degreetitle);
        degreecontainer.appendChild(degree);

        titlecontainer.appendChild(title);
        titlecontainer.appendChild(input);

        numbercontainer.appendChild(perc);
        numbercontainer.appendChild(perc_in);

        container.appendChild(titlecontainer);
        container.appendChild(numbercontainer);
        container.appendChild(degreecontainer);

        list_of_items.appendChild(container);
    }
}
function submit1() {
    let titleInputs = document.querySelectorAll(".inputlist");
    let percentageInputs = document.querySelectorAll(".percentageinputlist");
    let degreeInputs = document.querySelectorAll(".degreeinputlist");
    let result = document.getElementById("result");
    
    
    let titleSet = new Set();
    for (let i = 0; i < titleInputs.length; i++) {
        let titleValue = titleInputs[i].value.trim();
        if (!titleValue) {
            alert(`Title ${i + 1} cannot be empty.`);
            return;
        }
        if (titleSet.has(titleValue)) {
            alert(`Duplicate title found: "${titleValue}".`);
            return;
        }
        titleSet.add(titleValue);
    }
    
    let total = 0;
    percentageInputs.forEach(input => {
        total += parseFloat(input.value) || 0;
    });

    if (total === 100) {
        if(true){
            displaygrade();
        }
    } else {
        alert("Percentages does not add up to 100%");
    }
}
function displaygrade() {
    let titleInputs = document.querySelectorAll(".inputlist");
    let percentageInputs = document.querySelectorAll(".percentageinputlist");
    let degreeInputs = document.querySelectorAll(".degreeinputlist");
    let result = document.getElementById("result");
    
    let degreesum = 0;
    let percentagesum = 0;
    
    titleInputs.forEach((input, index) => {
        degreesum += parseFloat(percentageInputs[index].value) * parseFloat(degreeInputs[index].value);
        percentagesum += parseFloat(percentageInputs[index].value);
    });

    let total_degree = degreesum / percentagesum;

    let gradeletter = '';
    if (total_degree >= 90) {
        gradeletter = 'A';
    } else if (total_degree >= 80) {
        gradeletter = 'B';
    } else if (total_degree >= 70) {
        gradeletter = 'C';
    } else if (total_degree >= 50) {
        gradeletter = 'D';
    } else {
        gradeletter = 'F';
    }

    result.textContent = `Total Degree: (${total_degree})   letter grade is (${gradeletter})`;
}