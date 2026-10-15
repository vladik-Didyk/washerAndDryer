import { Fragment } from "react";

// Lines may break between words but never at a hyphen ("Side-by- / side").
export default function KeepWordsWhole({ text }) {
  return text.split(" ").map((word, index) => (
    <Fragment key={index}>
      {index > 0 && " "}
      <span className="whitespace-nowrap">{word}</span>
    </Fragment>
  ));
}
