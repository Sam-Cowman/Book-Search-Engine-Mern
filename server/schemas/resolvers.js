const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

// Define the resolvers for GraphQL queries and mutations
const resolvers = {
  Query: {
    // Resolver for the 'me' query, which returns the logged-in user's data
    me: async (parent, args, context) => {
      // Check if the user is authenticated
      if (context.user) {
        // Find the user by their ID, exclude the __v and password fields, and populate the savedBooks field
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedBooks');

        // Return the user data
        return userData;
      }

      // If the user is not authenticated, throw an authentication error
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    // Resolver for the 'login' mutation, which logs in a user and returns a token and user data
    login: async (parent, { email, password }) => {
      // Find the user by their email
      const user = await User.findOne({ email });

      // If the user is not found, throw an authentication error
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, throw an authentication error
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      // Sign a token for the user
      const token = signToken(user);

      return { token, user };
    },
    // Resolver for the 'addUser' mutation, which creates a new user and returns a token and user data
    addUser: async (parent, args) => {
      // Create a new user with the provided arguments
      const user = await User.create(args);

      // Sign a token for the new user
      const token = signToken(user);
      
      return { token, user };
    },
    // Resolver for the 'saveBook' mutation, which saves a book to the user's savedBooks field
    saveBook: async (parent, { bookData }, context) => {
      // Check if the user is authenticated
      if (context.user) {
        // Find the user by their ID and add the book to the savedBooks field
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true }
        ).populate('savedBooks');

        return updatedUser;
      }

      // If the user is not authenticated, throw an authentication error
      throw new AuthenticationError('You need to be logged in!');
    },
    // Resolver for the 'removeBook' mutation, which removes a book from the user's savedBooks field
    removeBook: async (parent, { bookId }, context) => {
      // Check if the user is authenticated
      if (context.user) {
        // Find the user by their ID and remove the book from the savedBooks field
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).populate('savedBooks');

        return updatedUser;
      }

      // If the user is not authenticated, throw an authentication error
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;