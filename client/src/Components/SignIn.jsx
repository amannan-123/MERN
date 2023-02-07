import AuthForm from './AuthForm';
import Navbar from './Navbar'

export default function SignIn() {

	return (

		<section className="flex flex-col h-screen">

			<Navbar />

			<AuthForm type="signin"></AuthForm>

		</section>
	)
}
