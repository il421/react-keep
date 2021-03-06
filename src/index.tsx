import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configStore from "./store/configStore";

import { login, logout } from "./actions/auth";
import { handleSetNotes } from "./actions/notes";
import { handleSetTags } from "./actions/tags";

import "normalize.css/normalize.css";
import "./styles/base/_base.scss";
import "./styles/components/common/_modal.scss";
import "react-toastify/dist/ReactToastify.css";
import * as serviceWorker from "./serviceWorker";

import { firebase } from "./firebase/firebase";
import LoadingPage from "./components/login/LoadingPage";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faPalette } from "@fortawesome/free-solid-svg-icons/faPalette";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";
import { faBookmark } from "@fortawesome/free-solid-svg-icons/faBookmark";
import { faTags } from "@fortawesome/free-solid-svg-icons/faTags";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTh } from "@fortawesome/free-solid-svg-icons/faTh";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons/faCheckSquare";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons/faAlignLeft";
import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { faUsersCog } from "@fortawesome/free-solid-svg-icons/faUsersCog";
import { faArchive } from "@fortawesome/free-solid-svg-icons/faArchive";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { ImageItem, LoginAction, Note } from "./store/store.types";
import { PathNames } from "./routers/Routing";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons/faUserFriends";
import { User } from "firebase";
import { NoteType } from "./components/notes";
import { handleSetCollaborators } from "./actions/collaborators";

library.add(
  faBars,
  faUpload,
  faSignOutAlt,
  faTimes,
  faPalette,
  faMapMarkerAlt,
  faBookmark,
  faTags,
  faEdit,
  faCheckSquare,
  faAlignLeft,
  faImage,
  faArchive,
  faTh,
  faPlusCircle,
  faUsersCog,
  faArrowRight,
  faTrash,
  faShare,
  faUserFriends
);

const store = configStore();

const jsx = ( // Provider - Now we can use store everywhere
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("root"));
    hasRendered = true;
  }
};

const preloadNoteImages = async (notes: Note[]): Promise<void> => {
  const loadImage = (src: string) =>
    new Promise((resolve) => {
      const image = new Image();
      image.src = src;
      image.addEventListener("load", () => resolve());
      // resolve in the error case too, since it can be downloaded the image on the dashboard
      image.addEventListener("error", () => resolve());
    });

  const promises: Promise<any>[] = [];
  notes.forEach((n) => {
    if ((n.content as ImageItem).imageUrl) {
      promises.push(loadImage((n.content as ImageItem).imageUrl as string));
    }
  });
  await Promise.all(promises);
};

ReactDOM.render(<LoadingPage />, document.getElementById("root"));

// google authentication
firebase.auth().onAuthStateChanged(async (user: User | null) => {
  if (user) {
    store.dispatch<LoginAction>(
      login(user.uid, user.displayName, user.photoURL, user.email!)
    );
    await store.dispatch<any>(handleSetNotes());
    await store.dispatch<any>(handleSetTags());
    await store.dispatch<any>(handleSetCollaborators());

    const imageNotes = store
      .getState()
      .notes.filter((n) => n.type === NoteType.image);

    // preload notes images before rendering
    if (imageNotes.length) {
      await preloadNoteImages(imageNotes);
    }

    await renderApp();

    if (history.location.pathname === "/") {
      await history.push(PathNames.base);
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});

serviceWorker.unregister();
