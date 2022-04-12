import { useEffect } from 'react';

function ImportScript(url, onloadFunction, onErrorFunction) {
	useEffect(() => {
		const script = document.createElement('script');

		script.src = url;
		script.async = true;

		script.onload = onloadFunction;
		script.onerror = function (e) {
			script.parentNode.removeChild(script);
			onErrorFunction();
		};

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		}
	}, [url]);
};

export default ImportScript;