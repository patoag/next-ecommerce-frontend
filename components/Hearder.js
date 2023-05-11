import styled from "styled-components";
import Link from "next/link";

const StyledHeader = styled.header`
    background-color: #222;
`;

const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
`;

export default function Header() {
    return (
        <StyledHeader>
            <Logo href="/"> Ecommerce </Logo>
            <nav>
                <Link href="/"> Home </Link>
                <Link href="/products"> Products </Link>
                <Link href="/categories"> Categories </Link>
                <Link href="/account"> Account </Link>
                <Link href="/cart"> Cart (0)</Link>
            </nav>
        </StyledHeader>
    )
}