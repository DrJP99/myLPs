# myLPs

Web app to visualize my LP collection. It utilizes React, Node.js with an Express Server.

You can access my own site at [albums.jp-dixon.com](http://albums.jp-dixon.com), hosted at [Fly.io](http://fly.io). Note that it may take a few seconds to load initially as the server sleeps if there is no one using it.

To start the services on your `localhost`, clone the repository.

```bash
git clone https://github.com/DrJP99/myLPs
```

Open two terminals, one for the Nodejs server and another one for React. Install dependencies for Node

```bash
# Nodejs

cd myLPs
npm install
```

Install dependencies for React

```bash
# React

cd myLPs/client
npm install
```

Create a `.env` file in the root directory and create the following variables

```bash
# myLPs/.env

MONGODB_URL='<replace with your database uri>'
TEST_MONGODB_URI='<replace with your test database uri, it is used for development>'
PORT='<PORT for your Nodejs server, 3003 by default>'
HOSTNAME='<http://localhost or http://0.0.0.0>'
CLIENT_URL='http://localhost:3000'
SECRET='<your secret string, used to encode and decode tokens for the user>'
```

To run the services in development mode, run:

```bash
# myLPs/
npm run dev

# myLPs/client
npm start
```

Now go to `http://localhost:3000` on your browser and you should see the app running. You currently won't have any albums, artists or users in your app. We must first create an `admin` account to be able to add albums.

Go to the file `server/src/controllers/users.js` and comment or delete the following lines:

```javascript
// myLPs/server/src/controllers/users.js

usersRouter.post('/', async (req, res) => {
	const { username, password } = req.body;

	// Delete or comment from here
	const user = req.user;
	if (!user) {
		return res.status(401).json({
			error: 'token missing or invalid',
		});
	}
	// To here

	if (!password || password.length < 3) {
		return res.status(400).json({
			error: 'Password must be at least 3 characters long',
		});
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);
	const newUser = new User({
		username,
		passwordHash,
	});

	const savedUser = await newUser.save().catch((error) => {
		return res.status(400).json({
			error: error.message,
		});
	});
	res.status(200).json(savedUser);
});
```

This way, you may be able to add a user to the database.

Then, do a `POST` request to the Node server, `http://localhost:3003/api/users` by default, with a `json` including a username and password. You may do this using a tool like Postman or use curl:

```bash
# Create a user

curl --header "Content-Type: application/json" --request POST --data '{"username": "<replace with a username>", "password": "<replace with a password>"}' http://localhost:3003/api/users
```

Re-add or uncomment the lines from above. Now head to `http://localhost:3003/admin` and log-in using your credentials and you are done! You can add and edit albums and artists.
