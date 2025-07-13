import { render, screen } from "@testing-library/react"
import { NavigationBar } from "./NavigationBar"

describe('Navigation Bar', ()=>{
    const baseTestId = 'test-nav';
    const logo = "http://localhost:6007/talon-ui.webp";
    const links= [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  
]
    test('should render Navigation Bar', ()=>{
        render(
            <NavigationBar logo={logo} links = {links} testMetaData={{'data-testid': baseTestId}} />
        )
        expect(screen.getByTestId(`${baseTestId}-nav-bar`)).toBeInTheDocument();
    });

    test('should have navigation links', ()=>{
        render(
            <NavigationBar logo={logo} links = {links} testMetaData={{'data-testid': baseTestId}} />
        )
        links.forEach(item=>{
            expect(screen.getByTestId(`${baseTestId}-${item.label}`)).toBeInTheDocument();
        })
    })
})