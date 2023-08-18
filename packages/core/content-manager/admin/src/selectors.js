import { createSelector } from 'reselect';

const selectAppDomain = () => (state) => {
    return state.admin_app;
};

export const selectAdminPermissions = createSelector(
    selectAppDomain(),
    (state) => state.permissions
);
