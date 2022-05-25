import * as React from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons/faAlignLeft";
import { faArchive } from "@fortawesome/free-solid-svg-icons/faArchive";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faBookmark } from "@fortawesome/free-solid-svg-icons/faBookmark";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons/faCheckSquare";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";
import { faPalette } from "@fortawesome/free-solid-svg-icons/faPalette";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import { faTags } from "@fortawesome/free-solid-svg-icons/faTags";
import { faTh } from "@fortawesome/free-solid-svg-icons/faTh";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons/faUserFriends";
import { faUsersCog } from "@fortawesome/free-solid-svg-icons/faUsersCog";

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
export const WithFontAwesome: React.FunctionComponent = ({ children }) => (
  <>{children}</>
);
