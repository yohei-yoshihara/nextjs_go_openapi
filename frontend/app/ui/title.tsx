import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Title(props: Props) {
  return (
    <h1 className="text-3xl font-bold text-gray-300 mb-3">{props.children}</h1>
  );
}
