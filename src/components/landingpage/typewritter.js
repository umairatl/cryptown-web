import { useTypingText } from "./useTypingText";
import "../../components/landingpage/typewritteranimation.css"
export default function Typewritter() {
  const { word} = useTypingText(
    ["trustable", "reliable", "impeccable"],
    130,
    20
  );

  return (
    <div className="containerfour">
      <h1 id="typingheader">Our platform is {word}</h1>
    </div>
  );
}