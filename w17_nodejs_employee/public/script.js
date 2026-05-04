fetch('/api/employees')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('employeeContainer');

        data.forEach(emp => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
            <img src="${emp.image}">
            <h3>${emp.name}</h3>
            <p><strong>${emp.designation}</strong></p>
            <p>Department: ${emp.department}</p>
            <p>Salary: ₹${emp.salary}</p>
        `;

            container.appendChild(card);
        });
    });