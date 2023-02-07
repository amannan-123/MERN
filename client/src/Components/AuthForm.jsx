import React, { useState } from 'react'

export default function AuthForm({ type }) {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e) => {

		e.preventDefault();

		if (email.trim().length === 0 || password.trim().length === 0) {
			setError("Please enter all fields.");
			return;
		}

		if (type === "signup") {

			//check if email is valid
			const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (!emailRegex.test(email)) {
				setError("Please enter a valid email.");
				return;
			}

			//check if password is valid
			if (password.length < 8) {
				setError("Password must be at least 8 characters.");
				return;
			}
		}

		setError("");
	};

	return (

		<div className="centered-flex h-full p-5">

			<div className="max-w-[736px] container centered-flex lg:gap-5 h-full text-gray-800">

				<div className="flex-[0.5] centered-flex">
					<img
						className="w-[400px] h-[400px]"
						src="auth.svg"
					/>
				</div>

				<div className="flex-[0.5]">

					<form className='flex flex-col gap-4 p-5' onSubmit={handleSubmit}>

						<input
							type="text"
							maxLength={50}
							className="w-full px-3 py-2 text-gray-700 dark:text-white bg-white dark:bg-gray-800 border border-solid border-gray-300 rounded focus:border-blue-600 transition ease-in-out"
							placeholder="Email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<input
							type="password"
							maxLength={20}
							className="w-full px-3 py-2 text-gray-700 dark:text-white bg-white dark:bg-gray-800 border border-solid border-gray-300 rounded focus:border-blue-600 transition ease-in-out"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<button
							type="submit"
							className="w-full py-2 bg-blue-600 text-white font-medium leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:shadow-lg dark:shadow-gray-800 transition ease-in-out">
							{type === "signin" ? "Sign in" : "Sign up"}
						</button>

						{(error && <span className='text-red-500 text-center'>{error}</span>)}

					</form>

				</div>

			</div>

		</div>

	)
}
