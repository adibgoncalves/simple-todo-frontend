import styled from 'styled-components';

export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;

    height: 100vh;
    width: 100%;

    position: relative;
`

export const Filter = styled.div`
    background-color: #99bcc4;
    display: flex;
    align-items:center;
    justify-content: center;
    padding: 15px;
    color: #ffffff;
    border-radius: 5px;
    font-weight: 600;
    max-width: 170px;
    cursor: pointer;
    transition: .3s;

    &:hover {
        background-color: #08535d;
    }
`