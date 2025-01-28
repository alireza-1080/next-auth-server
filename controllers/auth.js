import 'dotenv/config';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import emailValidator from '../validators/emailValidator.js';
import passwordValidator from '../validators/passwordValidator.js';
import idvalidator from '../validators/idValidator.js';
import titleValiadtor from '../validators/titleValidator.js';
import nameValidator from '../validators/nameValidator.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
  try {
    //^ Get email and password from req.body
    let { name, email, password } = req.body;

    //^ Validate name
    name = nameValidator(name);

    //^ Convert the name to title case
    name = name.replace(/\b\w/g, (char) => char.toUpperCase());

    //^ Validate email
    email = emailValidator(email);

    //^ Validate password
    password = passwordValidator(password);

    //^ Hash password
    password = await bcrypt.hash(password, 12);

    //^ Create a new user
    let user = new User({ name, email, password });

    //^ Save the user to the database
    await user.save();

    //^ Get just the name and email and id of the user
    user = user.toJSON();
    user = (({ name, email, id }) => ({ name, email, id }))(user);

    //^ Generate token for the user
    const token = generateToken(user.id);

    //^ Set the token in the cookie for one hour
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    //^ Send the user as response
    return res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    return res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    //^ Get email and password from req.body
    let { email, password } = req.body;

    //^ Validate email
    email = emailValidator(email);

    //^ Validate password
    password = passwordValidator(password);

    //^ Find the user with the email
    let user = await User.findOne({ email });
    // .populate('todos');

    //^ If the user does not exist, throw an error
    if (!user) {
      throw new Error('Invalid email or password');
    }

    //^ Compare the password
    let isMatch = await bcrypt.compare(password, user.password);

    //^ If the password does not match, throw an error
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    //^ Get just the name and email and id and todos of the user
    user = user.toJSON();
    user = (({ name, email, id, todos }) => ({ name, email, id, todos }))(user);

    //^ Generate token for the user
    const token = generateToken(user.id);

    //^ Set the token in the cookie for one hour
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    //^ Send the user as response
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const verify = async (req, res) => {
  try {
    //^ Get the token from the request body if it exists
    let token = req.body.token;

    //^ If the token does not exist, get the token from the cookie
    if (!token) {
      token = req.cookies.token;
    }

    //^ If the token does not exist, throw an error
    if (!token) {
      throw new Error('Not authenticated');
    }

    //^ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //^ Find the user with the id
    let user = await User.findById(decoded.id).populate('todos', { title: 1, isCompleted: 1, id: 1 });

    //^ If the user does not exist, throw an error
    if (!user) {
      throw new Error('Not authenticated');
    }

    //^ Get just the name and email and id and todos of the user
    user = user.toJSON();
    user = (({ name, email, id, todos }) => ({ name, email, id, todos }))(user);

    //^ Send the user as response
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    //^ Clear the token in the cookie
    res.clearCookie('token');

    //^ Send a success message
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export { signup, login, verify, logout };
