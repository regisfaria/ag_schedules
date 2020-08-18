import styled, { css } from 'styled-components';
import { shade } from 'polished';

import Tooltip from '../Tooltip';

interface DateContainerProps {
  isErrored: boolean;
}

export const DateContainer = styled.div<DateContainerProps>`
  background: var(--white);
  border-radius: 10px;
  padding: 16px;
  margin-top: 20px;
  margin-bottom: 30px;
  width: 100%;

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
    font: 1em Poppins, sans-serifa;
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

  /* Below is disabled because I was incapable of setting the bg color for the time as well */
  /* .react-datepicker__day--selected {
    background: var(--green);
  }
  .react-datepicker__day:hover {
    background-color: ${shade(0.2, '#09644b')};
  }
  .react-datepicker__day:focus {
    background: var(--green);
  }
  .react-datepicker__day--today {
    background: var(--green);
  } */

  .react-datepicker__current-month {
    font-size: 1em;
  }
  .react-datepicker__navigation {
    top: 1em;
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
    width: inherit;

    &::placeholder {
      color: var(--input-placeholder);
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

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
