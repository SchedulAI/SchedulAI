import styled from 'styled-components';

export const HomeStyled = styled.div`
  position: relative;

  .main-section {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    position: relative;

    .title-div {
      width: 1090px;
      h1 {
        font-size: 4.21rem;
        text-align: center;
        color: #000000;
      }
    }

    .start-now-div {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;

      a {
        color: #0a0a15;
        cursor: pointer;
      }
    }

    .div-arrow-down {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      bottom: 60px;
      border-radius: 100%;
      height: 50px;
      width: 50px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      transition: all ease-in-out 0.4s;

      &:hover {
        background-color: #7d79e6;
      }
    }
  }

  .news-section {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    justify-content: center;

    .div-title {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 1rem;

      h2 {
        font-size: 3.16rem;
        color: #0a0a15;
      }

      h4 {
        font-size: 2.37rem;
        color: #0a0a15;
      }
    }

    p {
      color: #0a0a15;
      max-width: 35%;
    }
  }

  .about-section {
    height: 100vh;
    color: #0a0a15;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    .div-title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-self: center;
      width: 35%;
      text-align: left;
      gap: 1rem;
      padding: 2px;

      h2 {
        font-size: 3.16rem;
        color: #0a0a15;
        display: flex;
        flex-direction: row;

        > span {
          display: flex;
          align-items: center;
        }
      }

      h4 {
        font-size: 2.37rem;
        color: #0a0a15;
      }

      p > span {
        font-weight: 700;
      }
    }

    .div-about-list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-self: center;
      width: 35%;
      text-align: left;
      gap: 10px;
      padding: 2px;

      p {
        font-size: 1.2rem;
        font-weight: 700;
      }

      ul {
        list-style-type: circle;
        padding: 0;
      }
    }

    .div-about-end {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-self: center;
      width: 30%;
      text-align: left;
      gap: 10px;
      padding: 2px;
    }
  }
`;
