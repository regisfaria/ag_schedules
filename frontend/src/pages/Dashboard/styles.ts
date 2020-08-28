import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  width: 100%;

  div {
    width: 100%;
    height: 100%;

    h1 {
      padding-top: 0.65rem;
      font-weight: 500px;
      color: var(--table-black);
      text-align: center;
    }
  }
`;

// export const CalendarSection = styled.div`
//   display: flex;
//   position: absolute;
//   width: 445px;
//   height: 380px;
//   right: 38px;
//   top: 96px;
//   border-radius: 20px;

//   background-color: var(--white);
//   box-shadow: 0 1px 1px 1px var(--divider);

//   .react-calendar {
//     max-width: 100%;
//     background: white;
//     line-height: 1.125em;
//     border-radius: 20px;

//     padding-left: 5px;
//     padding-right: 5px;
//   }
//   .react-calendar--doubleView {
//     width: 100%;
//   }
//   .react-calendar--doubleView .react-calendar__viewContainer {
//     display: flex;
//     margin: -0.5em;
//   }
//   .react-calendar--doubleView .react-calendar__viewContainer > * {
//     width: 50%;
//     margin: 0.5em;
//   }
//   .react-calendar button {
//     margin: 0;
//     border: 0;
//     outline: none;
//   }
//   .react-calendar button:enabled:hover {
//     cursor: pointer;
//   }
//   .react-calendar__navigation {
//     height: 44px;
//     margin-bottom: 1em;
//     border-bottom: 1px solid var(--divider);
//   }
//   .react-calendar__navigation button {
//     min-width: 44px;
//     background: none;
//   }
//   .react-calendar__navigation button:enabled:hover,
//   .react-calendar__navigation button:enabled:focus {
//     background-color: var(--accent-blue);
//   }
//   .react-calendar__navigation button[disabled] {
//     background-color: var(--icon-gray);
//   }
//   .react-calendar__month-view__weekdays {
//     text-align: center;
//     text-transform: uppercase;

//     font-weight: bold;
//     font-size: 0.75em;

//     abbr {
//       text-decoration: none;
//     }
//   }
//   .react-calendar__month-view__weekdays__weekday {
//     padding: 0.75em;
//   }
//   .react-calendar__month-view__weekNumbers {
//     font-weight: bold;
//   }
//   .react-calendar__month-view__weekNumbers .react-calendar__tile {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 0.75em;
//     padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
//   }
//   .react-calendar__month-view__days__day--weekend {
//     color: var(--red);
//   }
//   .react-calendar__month-view__days__day--neighboringMonth {
//     color: var(--gray);
//   }
//   .react-calendar__year-view .react-calendar__tile,
//   .react-calendar__decade-view .react-calendar__tile,
//   .react-calendar__century-view .react-calendar__tile {
//     padding: 1.5em 0.5em;
//   }
//   .react-calendar__tile {
//     max-width: 100%;
//     text-align: center;
//     padding: 0.75em 0.5em;
//     background: none;
//   }
//   .react-calendar__tile:disabled {
//     background-color: var(--white);
//   }
//   .react-calendar__tile:enabled:hover,
//   .react-calendar__tile:enabled:focus {
//     background-color: var(--accent-blue);
//     border-radius: 50%;
//   }
//   .react-calendar__tile--now {
//     background: var(--yellow);
//     border-radius: 50%;
//     filter: opacity(80%);
//   }
//   .react-calendar__tile--now:enabled:hover,
//   .react-calendar__tile--now:enabled:focus {
//     filter: brightness(80%);
//     background: var(--accent-blue);
//     border-radius: 50%;
//   }
//   .react-calendar__tile--hasActive {
//     background: var(--accent-blue);
//   }
//   .react-calendar__tile--hasActive:enabled:hover,
//   .react-calendar__tile--hasActive:enabled:focus {
//     background: var(--accent-blue);
//     border-radius: 50%;
//   }
//   .react-calendar__tile--active {
//     background: var(--accent-blue);
//     color: var(--white);
//     border-radius: 50%;
//   }
//   .react-calendar__tile--active:enabled:hover,
//   .react-calendar__tile--active:enabled:focus {
//     background: var(--accent-blue);
//     border-radius: 50%;
//   }
//   .react-calendar--selectRange .react-calendar__tile--hover {
//     background-color: var(--white);
//   }
// `;
