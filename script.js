function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

fetch('./advent_calendars_data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('calendar-container');
        container.innerHTML = '';
        
        const openYear = getUrlParameter('year') || '2025'; 
        
        Object.keys(data.advent_calendars).forEach(yearKey => {
            const yearData = data.advent_calendars[yearKey];
            const year = yearKey.replace('year_', '');
            
            const details = document.createElement('details');
            details.open = year === openYear; // Open the year specified in URL parameter
            
            const summary = document.createElement('summary');
            summary.textContent = yearData.description;
            details.appendChild(summary);
            
            const assignmentPara = document.createElement('p');
            assignmentPara.innerHTML = yearData.assignment;
            details.appendChild(assignmentPara);
            
            const ul = document.createElement('ul');
            
            yearData.projects.forEach(project => {
                const li = document.createElement('li');
                
                const link = document.createElement('a');
                link.href = project.path;
                link.textContent = project.name;
                
                const description = document.createElement('p');
                description.textContent = project.description;
                
                li.appendChild(link);
                li.appendChild(description);
                ul.appendChild(li);
            });
            
            details.appendChild(ul);
            container.appendChild(details);
        });
    })
    .catch(error => {
        console.error('Error loading advent calendar data:', error);
        document.getElementById('calendar-container').innerHTML = '<p>Error loading advent calendar data.</p>';
    });