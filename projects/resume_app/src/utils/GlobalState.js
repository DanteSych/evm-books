import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    walletAddress: null,
    showResume: false,
    loadTx: false,
    isDataExist: false,
    isLogin: false,
});

export { setGlobalState, useGlobalState };