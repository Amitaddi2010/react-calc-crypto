import { useEffect, useState } from 'react';
import Axios from 'axios';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';

function App() {

	// Initializing all the state variables
	const [info, setInfo] = useState([]);
	const [input, setInput] = useState(1);
	const [from, setFrom] = useState("usd");
	const [to, setTo] = useState("inr");
	const [options, setOptions] = useState([]);
	const [rate, setRate] = useState(1);

	// Calling the api whenever the dependency changes
	useEffect(() => {
		Axios.get(
			`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
		)
			.then((res) => {
				setInfo(res.data[from]);
			})
	}, [from]);

	// Calling the convert function whenever
	// a user switches the currency
	useEffect(() => {
		setOptions(Object.keys(info));
	}, [info])

	useEffect(()=>{
		setRate(info[to])
	},[info, to, from])

	// Function to switch between two currency
	function flip() {
		var temp = from;
		setFrom(to);
		setTo(temp);
	}


	return (
		<div className="App">
			<h1>Currency converter</h1>
			<div className='converter'>
				<input type="text" className='input' value={input} onChange={e => {
					setInput(e.target.value)
				}} />
				<select name="from" id="from" value={from} onChange={e => {
						setFrom(e.target.value)
					}}>
					{options.map(o => <option value={o}>{o}</option>)}
				</select>
				<HiSwitchHorizontal style={{ color:'#73777B',background: 'skyblue', borderRadius: '16px' }} onClick={flip} />
				<input type="text" className='output' value={input*rate} disabled />
				<select name="to" id="to" value={to} onChange={e => {
					setTo(e.target.value)
				}}>
					{options.map(o => <option value={o}>{o}</option>)}
				</select>
			</div>
		</div>
	);
}

export default App;
