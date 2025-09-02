import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import Products from './Products';
test('shows the list of products', async () => {
    render(_jsx(Products, {}));
    expect(screen.getByRole('heading')).toHaveTextContent('Products');
});
