const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { client } = require('../db/connection');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      // Here we get user info from github
      const githubId = profile.id;
      const username = profile.username || 'github_user';
      const email = profile.emails ? profile.emails[0].value : '';

      // encrypted password
      const dummyPassword = 'dummy_password';
      const passwordHash = await bcrypt.hash(dummyPassword, 10);

      // Check if user exists
      let user = await client
        .db('gameSessionDB')
        .collection('users')
        .findOne({ githubId: githubId });

      if (!user) {
        // Creating a new user
        const newUser = {
          githubId: githubId,
          username: username,
          email: email,
          passwordHash: passwordHash,
          createdAt: new Date(),
          lastLogin: new Date(),
          role: 'user'
        };
        const result = await client.db('gameSessionDB').collection('users').insertOne(newUser);
        user = { _id: result.insertedId, ...newUser };
      } else {
        // Updating last login
        await client
          .db('gameSessionDB')
          .collection('users')
          .updateOne({ githubId: githubId }, { $set: { lastLogin: new Date() } });
      }

      // Here I pass user to passport
      done(null, user);
    }
  )
);

// Serialize - deserialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await client
    .db('gameSessionDB')
    .collection('users')
    .findOne({ _id: new ObjectId(id) });
  done(null, user);
});