import { useContext } from "react";

import { AuthContext } from "../hoc";

export const useAuth = () => useContext(AuthContext);
