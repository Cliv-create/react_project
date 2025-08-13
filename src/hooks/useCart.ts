import * as React from "react";
import {CartContext} from "../context/CartContext.tsx";

export const useCart = () => React.useContext(CartContext);