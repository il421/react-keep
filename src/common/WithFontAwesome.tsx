import * as React from "react";
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
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons/faUserFriends";

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
export const WithFontAwesome: React.FunctionComponent = (
  ({ children }) => <>{children}</>
);
