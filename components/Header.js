import Link from 'next/link';
import styled from 'styled-components';
import Cart from './Cart';
import Nav from './Nav';
import Search from './Search';
import SearchBaseballCards from './SearchBaseballCards';
import Router from 'next/router';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  background: darkBlue;
  transform: skew(-7deg);
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`;

export default function Header() {
  console.log(Router.router?.route);
  const currentPath =  Router.router?.route;
  // let searchbar;

  // if (currentPath === '/baseballcards') {
  //   searchbar = <SearchBaseballCards />
  // } 
  // else if (currentPath === '/products') {
  //   searchbar = <Search />
  // }
  // else {
  //   searchbar = null;
  // }

  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Gemini</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        {currentPath === '/products' && (
          <Search />
        )}
        {/* {currentPath === '/baseballcards' ? <SearchBaseballCards /> : <Search />} */}
        {currentPath === '/baseballcards' && (
          <SearchBaseballCards />
        )}
      </div>
      <Cart />
    </HeaderStyles>
  );
}
