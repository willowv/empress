import { GameScreen } from "./gameScreen";

export default function Home() {
  // TODO: user selects date
  const todayWithTime : Date = new Date();
  const day : number = todayWithTime.getUTCDate();
  const month : number = todayWithTime.getUTCMonth();
  const year : number = todayWithTime.getUTCFullYear();
  const todayWithoutTime : Date = new Date(year, month, day);
  return (
    <GameScreen
      date={todayWithoutTime} />
  );
}