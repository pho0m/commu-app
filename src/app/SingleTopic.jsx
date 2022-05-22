import { useParams } from "react-router-dom";

export default function SingleTopic() {
  let { id } = useParams();

  return <div>this is single topic :{id}</div>;
}
