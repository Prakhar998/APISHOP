import { useNavigate } from "react-router-dom";
import Buttonstyles from "./styles";
const BaseButton = (props: { label: string; path: string }) => {
  const navigate = useNavigate();
  return (
    <Buttonstyles
      onClick={() => {
        navigate(props.path);
      }}
    >
      {props.label}
    </Buttonstyles>
  );
};

export default BaseButton;
