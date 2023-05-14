import { addLeadingZeros } from '@Hooks/useTime';

function convertToSecondsAndMinutes(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return {
    minutes: Math.round(minutes) ?? 0,
    seconds: Math.round(seconds) ?? 0,
    text: `${Math.round(minutes || 0)}:${Math.round(seconds || 0)}`,
    track: `${Math.round(minutes)}:${addLeadingZeros(Math.round(seconds || 0))}`
  };
}
export default convertToSecondsAndMinutes;
