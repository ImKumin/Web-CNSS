import { useEffect } from 'react';

function ImportScript(url) {
	useEffect(() => {
		const script = document.createElement('script');

		script.src = url;
		script.async = true;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		}
	}, [url]);
};

export default ImportScript;