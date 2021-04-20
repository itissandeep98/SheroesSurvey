import Routing from './Components/Routing/Routing';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<div className="App">
				<Routing />
			</div>
		</BrowserRouter>
	);
}

export default App;
