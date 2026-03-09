import React from 'react';
// import ReactDOM from 'react-dom'; // For React 17
import { createRoot } from 'react-dom/client'; // For React 18
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/styles.scss';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { ThemeContextProvider } from './contexts/themeContext';
import { AuthContextProvider } from './contexts/authContext';
import './i18n';

const children = (
	<AuthContextProvider>
		<ThemeContextProvider>
			<Router>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</Router>
		</ThemeContextProvider>
	</AuthContextProvider>
);

const container = document.getElementById('root');
createRoot(container as Element).render(children); // For React 18
reportWebVitals();
