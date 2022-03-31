import { render, screen } from "@testing-library/react";
import "./Profile";

test('on initial render, logout button appears', () => {
    render(<Profile/>);
    screen.debug();
})