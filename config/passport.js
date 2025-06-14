const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { client } = require('../db/connection');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

passport.use(
  new GitHubStrategy(
    {
      // Getting the github app details in .env
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      // Get user data from GitHub
      const githubId = profile.id;
      const username = profile.username || 'github_user';
      const email = profile.emails ? profile.emails[0].value : '';

      // Dummy password for bcrypt (required by assignment)
      const dummyPassword = 'dummy_password';
      const passwordHash = await bcrypt.hash(dummyPassword, 10);

      // Check if user exists
      let user = await client
        .db('gameSessionDB')
        .collection('users')
        .findOne({ githubId: githubId });

      if (!user) {
        // Create new user
        const newUser = {
          githubId: githubId,
          username: username,
          email: email,
          passwordHash: passwordHash,
          createdAt: new Date(),
          lastLogin: new Date(),
          role: 'user'
        };
        // Saving user to my MongoDB
        const result = await client.db('gameSessionDB').collection('users').insertOne(newUser);
        user = { _id: result.insertedId, ...newUser };
      } else {
        // Update last login
        await client
          .db('gameSessionDB')
          .collection('users')
          .updateOne({ githubId: githubId }, { $set: { lastLogin: new Date() } });
      }

      // Pass user to Passport
      done(null, user);
    }
  )
);

// SAved user id to session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Loading user from session with the id
passport.deserializeUser(async (id, done) => {
  const user = await client
    .db('gameSessionDB')
    .collection('users')
    .findOne({ _id: new ObjectId(id) });
  done(null, user);
});
