import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto 0;
  padding: 0 0 50px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: none;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 7px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: none;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #3b9eff;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      transition: 0.25s;

      &:hover {
        background: ${darken(0.025, '#3b9eff')};
      }
    }
  }

  > button {
    margin: 7px 0 0;
    height: 44px;
    width: 100%;
    background: #f64c75;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    transition: 0.25s;

    &:hover {
      background: ${darken(0.025, '#f64c75')};
    }
  }
`;
