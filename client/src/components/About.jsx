const About = () => {
	return (
		<div>
			<h1 className="header-1">About</h1>
			<h3>Who am I?</h3>
			<p>
				I usually go by JP Dixon online and I am a software developer. I
				particularly like web design with React and Nodejs.
			</p>
			<h3>Why did I create this web app?</h3>
			<p>
				I wanted to start working on personal projects to have a
				portfolio to show when applying to new jobs as, though I have
				worked on many projects, I don't have many of them published
				anywhere besides a GitHub repository.
			</p>
			<p>
				This particular project was made to showcase my vinyl records
				collection, much of which has been gifted by friends and family.
				This way, they can take a look at my collection before deciding
				which to buy so as to not receive an album I already own.
			</p>
			<h3>Where is it hosted?</h3>
			<p>
				This website is currently being hosted at{' '}
				<a href="https://fly.io" target="_blank" rel="noreferrer">
					Fly.io
				</a>
				{', '}
				while the database is hosted at{' '}
				<a
					href="https://cloud.mongodb.com"
					target="_blank"
					rel="noreferrer"
				>
					mongodb.com
				</a>
			</p>
			<h3>Take a look at the code:</h3>
			<p>
				You can find the code in the GitHub repository by clicking{' '}
				<a
					href="https://github.com/DrJP99/myLPs"
					target="_blank"
					rel="noreferrer"
				>
					here
				</a>
				.
			</p>
			<h3>Technologies used:</h3>
			<p>
				This website was created using Reactjs, using 100% custom CSS
				with SCSS for the themes as well as with media queries for a
				better UX in mobile or smaller devices. I used Redux to keep an
				app-wide state (used to keep Albums and Artists to avoid
				unnecessary API calls as well as for the admin token). API calls
				are handled using Axios.
			</p>
			<p>
				For the backend server, I used Nodejs with an Express server,
				using RESTful principles for the API calls. Various Middleware
				was used to handle console logging, CORS and error handling. The
				database used was MongoDB.
			</p>
			<p>
				Deployment of this website is done with the use of GitHub
				Actions.
			</p>
			<h3>Contact</h3>
			<p>You can contact me by sending an email to jpgzz1999@gmail.com</p>
		</div>
	);
};

export default About;
