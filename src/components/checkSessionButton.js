import { Button } from "@material-ui/core"
import React from "react"
import { useSelector } from "react-redux";

const CheckSessionButton = () => {
  const selector = useSelector(state => state)


  const check = () => {
    console.log(selector.users);
  }

  return (
    <Button onClick={check} color="primary" variant="contained">ログインstate確認</Button>
  )
}

export default CheckSessionButton;