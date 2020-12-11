import React, { useState } from "react";
import { connect } from "react-redux";
import {
  AuthStoreState,
  Modal as ModalType,
  Store,
} from "../../store/store.types";
import { startLogout } from "../../actions/auth";
import { Search } from "./Search";
import { Controllers } from "./Controllers";
import {
  IconButton,
  UserPhoto,
  ContentContainer,
  LinkButton,
} from "../ui-components";
import "../../styles/components/header/_header.scss";
import "../../styles/components/header/_logout.scss";
import "../../styles/components/header/_user-box.scss";
import "../../styles/components/common/_visibility.scss";
import { ThunkDispatch } from "redux-thunk";
import Modal from "react-modal";
import { ConfirmDialog, NoteType } from "../notes";
import { toggleCurrentNote, toggle } from "../../actions/modals";

export interface HeaderProps {}

interface StateProps {
  auth: AuthStoreState;
}

interface DispatchProps {
  startLogout: () => void;
  toggleCurrentNote: (noteType: NoteType, isOpen: boolean, id?: string) => void;
  toggle: (modal: ModalType, isOpen: boolean) => void;
}

export type HeaderBaseProps = HeaderProps & DispatchProps & StateProps;

export const HeaderBase: React.FunctionComponent<HeaderBaseProps> = ({
  startLogout,
  auth,
  toggle,
  toggleCurrentNote,
}) => {
  const [isLoginOut, setIsLogout] = useState<boolean>(false);
  const handleOpenModal = (model: ModalType) => () => toggle(model, true);

  return (
    <header className="header" onClick={(evt) => evt.stopPropagation()}>
      <ContentContainer>
        <div className="header__content">
          <IconButton
            className="header__bar"
            icon="bars"
            size="2x"
            onButtonClick={handleOpenModal("sidebar")}
          />

          <h1 className="header__title">KEEP ME</h1>

          <Search wrapperClass="header__search" />

          <Controllers
            className="hide-for-mobile"
            openDialog={(type: NoteType) => toggleCurrentNote(type, true)}
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
                onClick={() => toggle("user", true)}
              />

              <IconButton
                className="user-box__icon"
                icon="users-cog"
                size="lg"
                onButtonClick={handleOpenModal("user")}
              />
            </>

            <IconButton
              className="user-box__logout"
              icon="sign-out-alt"
              size="lg"
              onButtonClick={() => setIsLogout(true)}
            />
          </div>
        </div>
      </ContentContainer>

      <Modal
        isOpen={isLoginOut}
        onRequestClose={() => setIsLogout(false)}
        className="user-box__logout logout"
        ariaHideApp={false}
      >
        <ConfirmDialog
          title="Do you want to logout?"
          handleConfirm={startLogout}
          closeDialog={() => setIsLogout(false)}
          className="logout__dialog"
          buttonsProps={{ confirmButtonText: "Logout" }}
        />
      </Modal>
    </header>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  startLogout: () => dispatch(startLogout()),
  toggle: (modal: ModalType, isOpen: boolean) =>
    dispatch(toggle(modal, isOpen)),
  toggleCurrentNote: (noteType: NoteType, isOpen: boolean, id?: string) =>
    dispatch(toggleCurrentNote(noteType, isOpen, id)),
});

const mapStateToProps = (state: Store): StateProps => {
  return {
    auth: state.auth,
  };
};

export const Header = connect<StateProps, DispatchProps, HeaderProps, Store>(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBase);
