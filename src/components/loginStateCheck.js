import { useSelector } from "react-redux";

const LoginStateCheck = (fromCall) => {
  const selector = useSelector(state => state)
  // console.log(`${fromCall}ログインstateをチェックします`, selector.users);

  return selector.users;
}

export default LoginStateCheck;
