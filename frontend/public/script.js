function load(){

	console.log('The Client running');
	
	document.getElementById("uploadForm").addEventListener("submit", handleFormSubmit); 
	
	async function postFormData({ url, form }) {
		// const plainFormData = Object.fromEntries(formData.entries());
		const formData = new FormData(form);
	
		const fetchOptions = {
			method: "POST",
			headers: {
				// "Content-Type": "application/json",
				// Accept: "application/json",
			},
			body: formData
		};
	// console.log('plainFormData=',plainFormData);

	// ADATKÜLDÉS
		const response = await fetch(url, fetchOptions);
	
		if (!response.ok) {
			const errorMessage = await response.text();
			throw new Error(errorMessage);
		}
	
		return response.json();
	}
	async function handleFormSubmit(ev) {
		ev.preventDefault();
		const form = ev.currentTarget;
		const url = "/kuldes" //form.action;
		try {
			/*
			 * @see https://developer.mozilla.org/en-US/docs/Web/API/FormData
			 */
			// const formData = new FormData(form);
			// console.log('formData=',formData);
	
			const responseData = await postFormData({ url, form });
			console.log({ responseData });
	
		} catch (error) {
			console.error(error);
		}
		console.log('We blocked the file upload process');  
	
	};
	}
	window.addEventListener('load',load);