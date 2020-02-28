import React from "react";
import {BeatLoader} from "react-spinners";
import "../../styles/ui-components/_login-button.scss";
import {Colors, JustifyContent} from "../../common/variables";
import {FlexBox} from "./FlexBox";

interface LoginButtonProps extends Partial<Pick<HTMLButtonElement, "disabled" | "className">>{
  loading: boolean;
  text: string;
}

export class LoginButton extends React.PureComponent<LoginButtonProps> {
  render() {
    return(
      <FlexBox justifyContent={JustifyContent.center}>
        {
          !this.props.loading ? (
            <button className={`login-button ${ this.props.className }`} type="submit" disabled={this.props.disabled}>{ this.props.text }</button>
          ) : (
            <BeatLoader size={ 10 } color={Colors.fresh} css={ "height: 42px" }/>
          )
        }
      </FlexBox>
    );
  }
}
