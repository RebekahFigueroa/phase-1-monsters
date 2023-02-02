const renderMonsterCards = () => {
	// get monsters container
	//fetch monster cards
	fetch("http://localhost:3000/monsters/?_limit=50&_page=3")
		.then((response) => response.json())
		.then((monsters) => {
			const monstersContainer = document.getElementById("monster-container");

			monsters.forEach((monster) => {
				const monsterContainer = document.createElement("div");
				const monsterName = document.createElement("h2");
				monsterName.innerHTML = monster.name;
				const monsterAge = document.createElement("h3");
				monsterAge.innerHTML = monster.age;
				const monsterDescription = document.createElement("p");
				monsterDescription.innerHTML = monster.description;

				monsterContainer.appendChild(monsterName);
				monsterContainer.appendChild(monsterAge);
				monsterContainer.appendChild(monsterDescription);
				monstersContainer.appendChild(monsterContainer);
			});
		});
};

const monsterForm = () => {
	const monsterCreationContainer = document.getElementById("create-monster");
	//create name input
	const nameForm = document.createElement("input");
	nameForm.setAttribute("type", "text");
	nameForm.setAttribute("placeholder", "name");
	//create age input
	const ageForm = document.createElement("input");
	ageForm.setAttribute("type", "text");
	ageForm.setAttribute("placeholder", "age");
	//create description input
	const descriptionForm = document.createElement("input");
	descriptionForm.setAttribute("type", "text");
	descriptionForm.setAttribute("placeholder", "description");
	//create button
	const buttonForForm = document.createElement("button");
	buttonForForm.innerHTML = "create";

	buttonForForm.addEventListener("click", () => {
		fetch(`http://localhost:3000/monsters`, {
			method: "POST",
			body: JSON.stringify({
				name: nameForm.value,
				age: ageForm.value,
				description: descriptionForm.value,
			}),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((response) => response.json())
			.then((json) => console.log(json));
		confirm("Monster was added!");
	});

	//append elements
	monsterCreationContainer.appendChild(nameForm);
	monsterCreationContainer.appendChild(ageForm);
	monsterCreationContainer.appendChild(descriptionForm);
	monsterCreationContainer.appendChild(buttonForForm);
};

document.addEventListener("DOMContentLoaded", () => {
	renderMonsterCards();
	monsterForm();
});
