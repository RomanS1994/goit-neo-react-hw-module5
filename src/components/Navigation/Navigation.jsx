import css from './Navigation.module.css';

import clsx from 'clsx';

import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink
        to="/"
        className={({ isActive }) => {
          return clsx(css.link, isActive && css.active);
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => {
          return clsx(css.link, isActive && css.active);
        }}
      >
        Movies
      </NavLink>
    </nav>
  );
}
