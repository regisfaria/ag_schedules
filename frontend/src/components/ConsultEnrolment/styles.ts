import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface DateContainerProps {
  isErrored: boolean;
}

interface SpecialistInfoProps {
  profileExists: boolean;
}

export const SpecialistInfo = styled.div<SpecialistInfoProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  width: 100%;
  max-width: 70rem;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    strong {
      font-size: 1.6rem;
    }

    p {
      font-size: 1.2rem;
      margin: 0.5rem 0 0.5rem 0;
    }

    span {
      font-size: 1.2rem;
      margin: 0.5rem 0 0.5rem 0;
    }
  }

  img {
    width: 13rem !important;
    height: 13rem !important;
    border-radius: 50%;
  }

  @media (min-width: 600px) {
    img {
      height: 15rem;
      border-radius: 50%;
    }

    div {
      strong {
        font-size: 2rem;
      }

      p {
        font-size: 1.6rem;
        margin: 1rem 0 1rem 0;
      }

      span {
        font-size: 1.6rem;
        margin: 0.5rem 0 1rem 0;
      }
    }
  }

  ${props =>
    !props.profileExists &&
    css`
      display: none;
    `}
`;

export const DateContainer = styled.div<DateContainerProps>`
  background: var(--white);
  border-radius: 10px;
  padding: 1.05rem;
  margin-top: 0.4rem;
  margin-bottom: 2rem;
  font-size: 1.2rem;

  width: 100%;
  max-width: 70rem;

  border: 2px solid var(--white);
  color: var(--input-placeholder);

  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--error-red);
    `}

  .react-datepicker {
    font: 1.2rem Poppins, sans-serifa;
    box-shadow: 0 1px 10px 2px var(--black);
    z-index: 10;
  }
  .react-datepicker__header {
    padding-top: 0.8em;
  }
  .react-datepicker-time__header {
    font-size: 1em;
  }
  .react-datepicker__day-name,
  .react-datepicker__day {
    width: 1.9em;
    line-height: 1.9em;
    margin: 0.5em;
    transition: background-color 0.2s;
  }

  .react-datepicker-wrapper {
    width: 90%;
  }

  .react-datepicker__current-month {
    font-size: 1em;
  }
  .react-datepicker__navigation {
    top: -0.9rem;
    line-height: 1.7em;
    border: 0.45em solid transparent;
  }
  .react-datepicker__navigation--previous {
    border-right-color: var(--black);
  }
  .react-datepicker__navigation--next {
    border-left-color: var(--black);
    margin-right: 2rem;
  }
  input {
    background: transparent;
    flex: 1;
    border: none;
    color: var(--black);
    width: 100%;

    &::placeholder {
      color: var(--input-placeholder);
      font-size: 1.4rem;
    }
  }

  svg {
    margin: 0 1.6rem 0 0.5rem;
  }

  @media (min-width: 1024px) {
    .react-datepicker {
      font: 1.6rem Poppins, sans-serifa;
      box-shadow: 0 1px 10px 2px var(--black);
      z-index: 10;
    }
    .react-datepicker__header {
      padding-top: 0.8em;
    }
    .react-datepicker-time__header {
      font-size: 1em;
    }
    .react-datepicker__day-name,
    .react-datepicker__day {
      width: 1.9em;
      line-height: 1.9em;
      margin: 0.5em;
      transition: background-color 0.2s;
    }

    .react-datepicker-wrapper {
      width: 90%;
    }

    .react-datepicker__current-month {
      font-size: 1em;
    }
    .react-datepicker__navigation {
      top: -0.9rem;
      line-height: 1.7em;
      border: 0.45em solid transparent;
    }
    .react-datepicker__navigation--previous {
      border-right-color: var(--black);
    }
    .react-datepicker__navigation--next {
      border-left-color: var(--black);
      margin-right: 2rem;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;

  svg {
    margin: 0;
  }

  span {
    background: var(--error-red);
    color: #fff;

    &::before {
      border-color: var(--error-red) transparent;
    }
  }
`;

export const Empty = styled.div`
  display: none;
`;
