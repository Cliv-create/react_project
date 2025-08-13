import * as React from "react";
import {AuthContext} from "../context/AuthContext.tsx";

export const useAuth = () => React.useContext(AuthContext);