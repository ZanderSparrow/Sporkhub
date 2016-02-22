const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;

const NavEntry = (props) => (
  <li>
    <Link to={`/${props.data}`}>{props.data}</Link>
  </li>
);

module.exports = NavEntry;