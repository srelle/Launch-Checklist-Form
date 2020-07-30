window.addEventListener('load', function () {
	  let form = document.querySelector('form');
	
	  // fetch the destination planet
	  fetch('https://handlers.education.launchcode.org/static/planets.json').then(
	    function (response) {
	      response.json().then(function (data) {
	        let targets = document.getElementById('missionTarget');
	        let random = Math.round(Math.random() * data.length);
	        let target = data[random];
	        targets.innerHTML = `<h2>Mission Destination</h2>
	      <ol>
	         <li>Name: ${target.name}</li>
	         <li>Diameter: ${target.diameter}</li>
	         <li>Star: ${target.star}</li>
	         <li>Distance from Earth: ${target.distance}</li>
	         <li>Number of Moons: ${target.moons}</li>
	      </ol>
	      <img src="${target.image}">`;
	      });
	    }
	  );
	
	  form.addEventListener('submit', function (event) {
	
	    // create variables representing corresponding html elements
	    let pilotName = document.getElementById('pilotName').value;
	    let copilotName = document.getElementById('copilotName').value;
	    let fuelLevel = Number(document.getElementById('fuelLevel').value);
	    let cargoMass = Number(document.getElementById('cargoMass').value);
	    let faultyItems = document.getElementById('faultyItems');
	    let launchStatus = document.getElementById('launchStatus');
	    let fuelStatus = document.getElementById('fuelStatus');
	    let cargoStatus = document.getElementById('cargoStatus');
	    let pilotStatus = document.getElementById('pilotStatus');
	    let copilotStatus = document.getElementById('copilotStatus');
	
	    // Check whether all fields have been filled and that types are valid
	    if (
	      pilotName === '' ||
	      copilotName === '' ||
	      fuelLevel === '' ||
	      cargoMass === ''
	    ) {
	      alert('All fields are required!');
	      faultyItems.style.visibility = 'hidden';
	    } else if (
	      isNaN(fuelLevel) ||
	      isNaN(cargoMass) ||
	      !isNaN(pilotName) ||
	      !isNaN(copilotName)
	    ) {
	      alert('Make sure to enter valid information for each field');
	      faultyItems.style.visibility = 'hidden';
	    } else {
	      faultyItems.style.visibility = 'visible';
	      pilotStatus.innerHTML = `Pilot ${pilotName} is ready to launch`;
	      copilotStatus.innerHTML = `Co-pilot ${copilotName} is ready to launch`;
	
	      // shuttle only ready to launch if fuelLevel is over 10000 and cargoMass is under 10000
	      if (fuelLevel > 10000 && cargoMass < 10000) {
	        launchStatus.style.color = 'green';
	        launchStatus.innerHTML = 'Shuttle is ready for launch';
	      } else if (fuelLevel < 10000) {
	        faultyItems.style.visibility = 'visible';
	        fuelStatus.innerHTML = 'Fuel level too low for launch';
	        launchStatus.style.color = 'red';
	        launchStatus.innerHTML = 'Shuttle not ready for launch';
	      } else if (cargoMass > 10000) {
	        faultyItems.style.visibility = 'visible';
	        cargoStatus.innerHTML = 'Too much mass for the shuttle to take off';
	        launchStatus.style.color = 'red';
	        launchStatus.innerHTML = 'Shuttle not ready for launch';
	      }
	    }
	    event.preventDefault();
	  });
	});