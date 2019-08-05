import * as React from "react";
import { format } from "date-fns";
import "./TomatoList.scss";

interface ITomatoListProps {
  finishedTomatos: any;
}
class TomatoList extends React.Component<ITomatoListProps> {
  componentDidMount() {
    console.log(this.props.finishedTomatos);
  }

  get dates() {
    const { finishedTomatos } = this.props;
    const dates = Object.keys(finishedTomatos);
    return dates.sort((a, b) => Date.parse(b) - Date.parse(a));
  }

  TomatoItem(props: any) {
    return (
      <div className="TomatoItem">
        <span className="timeRange">
          {format(props.started_at, "H:mm")} - {format(props.ended_at, "H:mm")}
        </span>
        <span className="content">{props.description}</span>
      </div>
    );
  }

  public render() {
    const list = this.dates.map(d => {
      const tomatoes = this.props.finishedTomatos[d];
      return (
        <div key={d} className="dailyTomato">
          <div className="title">
            <span className="dateTime">{format(d, "YYYY年M月DD日")}</span>
            <span className="finishedCount">完成了{tomatoes.length}个番茄</span>
          </div>
          {tomatoes.map((t: any) => (
            <this.TomatoItem key={t.id} {...t} />
          ))}
        </div>
      );
    });
    return (
      <div className="tomatoList" id="tomatoList">
        {list}
      </div>
    );
  }
}
export default TomatoList;
