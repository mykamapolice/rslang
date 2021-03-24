import React, { FC } from 'react';
import { Container } from 'react-bootstrap';

export const Layout: FC = ({ children }: any) => (
    <Container>{children}</Container>
);

export default Layout;
