
function Counter(props) {
	return (<div className='main'>
		<h1 className='name'>{props.display}</h1>
		<div className='btn-div'>
			<button className='btn' onClick={props.dec}>Decrement</button>
			<button className='btn' onClick={props.inc}>Increment</button>
		</div>
	</div>);
}

export default Counter
