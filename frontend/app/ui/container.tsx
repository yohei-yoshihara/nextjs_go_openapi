import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Container(props: Props) {
  return <div className="m-3">{props.children}</div>;
}
