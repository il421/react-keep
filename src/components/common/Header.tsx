import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { stringify } from "query-string";
import { AuthStoreState, Store } from "../../store/store.types";
import { QueryKeys } from "../../routers/Routing";
import { startLogout } from "../../actions/auth";
import Search from "./Search";
import { Controllers } from "./Controllers";
import { IconButton, UserPhoto, ContentContainer, LinkButton } from "../ui-components";
import "../../styles/components/header/_header.scss";
import "../../styles/components/header/_user-box.scss";
import "../../styles/components/common/_visibility.scss";

interface HeaderProps {
  startLogout: () => void;
  auth: AuthStoreState,
  showSidebar: (value: boolean) => void;
}

const Header: React.FunctionComponent<HeaderProps> = ({ startLogout, auth, showSidebar }) => {
  const history = useHistory();

  const onClickHandler = (key: keyof typeof QueryKeys) => {
    const query = stringify({
      [key]: "edit"
    });
    history.push(`${history.location.pathname }?${ query }`);
  };

  return (
    <header className="header" onClick={(evt) => evt.stopPropagation()}>
      <ContentContainer>
        <div className="header__content">
          <IconButton
            className="header__bar"
            icon="bars" size="2x"
            onClick={ () => showSidebar(true) }
          />

          <h1 className="header__title">Keep Me</h1>

          <Search wrapperClass="header__search" />

          <Controllers className="hide-for-mobile" />

          <div className="header__user-box user-box">
            {
              auth.name && auth.url && <UserPhoto className="user-box__photo" src={ auth.url } height={50}  width={50} />
            }
            <LinkButton
              text={ auth.name ?? "Update profile" }
              type="button"
              className="user-box__link"
              onClick={() => onClickHandler(QueryKeys.user)}
            />
            <IconButton
              className="user-box__logout"
              icon="sign-out-alt" size="lg"
              onClick={ startLogout }
            />
          </div>
        </div>
      </ContentContainer>
    </header>
  );
};


const mapDispatchToProps = (dispatch: Dispatch<any> ) => ({
  startLogout: () => dispatch(startLogout()),
});

const mapStateToProps = (state: Store) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
