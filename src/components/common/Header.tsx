import { History } from "history";
import { stringify } from "query-string";
import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { startLogout } from "../../actions/auth";
import { QueryKeys, RouteActions } from "../../routers/Routing";
import { AuthStoreState, Store } from "../../store/store.types";
import "../../styles/components/common/_visibility.scss";
import "../../styles/components/header/_header.scss";
import "../../styles/components/header/_user-box.scss";
import {
  IconButton,
  UserPhoto,
  ContentContainer,
  LinkButton
} from "../ui-components";
import { Controllers } from "./Controllers";
import { Search } from "./Search";

export interface HeaderProps {
  showSidebar: (value: boolean) => void;
  history: History;
}

interface StateProps {
  auth: AuthStoreState;
}

interface DispatchProps {
  startLogout: () => void;
}

export type Props = HeaderProps & DispatchProps & StateProps;

export const HeaderBase: React.FunctionComponent<Props> = ({
  startLogout,
  auth,
  showSidebar,
  history
}) => {
  const onClickHandler = (key: QueryKeys) => {
    const query = stringify({
      [key]: RouteActions.edit
    });
    history.push(`${history.location.pathname}?${query}`);
  };

  return (
    <header className="header" onClick={evt => evt.stopPropagation()}>
      <ContentContainer>
        <div className="header__content">
          <IconButton
            className="header__bar"
            icon="bars"
            size="2x"
            onButtonClick={() => showSidebar(true)}
          />

          <h1 className="header__title">KEEP ME</h1>

          <Search wrapperClass="header__search" />

          <Controllers
            className="hide-for-mobile"
            openDialog={query =>
              history.push(`${history.location.pathname}?${query}`)
            }
          />

          <div className="header__user-box user-box">
            {auth.name && auth.url !== null && (
              <UserPhoto
                className="user-box__photo"
                src={auth.url}
                height={50}
                width={50}
              />
            )}

            {/* show one of components depending on screen */}
            <>
              <LinkButton
                text={auth.name ?? "Update profile"}
                type="button"
                className="user-box__link"
                onClick={() => onClickHandler(QueryKeys.user)}
              />

              <IconButton
                className="user-box__icon"
                icon="users-cog"
                size="lg"
                onButtonClick={() => onClickHandler(QueryKeys.user)}
              />
            </>

            <IconButton
              className="user-box__logout"
              icon="sign-out-alt"
              size="lg"
              onButtonClick={startLogout}
            />
          </div>
        </div>
      </ContentContainer>
    </header>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  startLogout: () => dispatch(startLogout())
});

const mapStateToProps = (state: Store): StateProps => {
  return {
    auth: state.auth
  };
};

export const Header = connect<StateProps, DispatchProps, HeaderProps, Store>(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBase);
