import AuthForm from './AuthForm';
import Navbar from './Navbar'

export default function SignUp() {

	return (

		<section className="flex flex-col h-screen">

			<Navbar />

			<AuthForm type="signup"></AuthForm>

		</section>
	)
}
